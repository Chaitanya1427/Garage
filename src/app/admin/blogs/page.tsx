"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Search, CheckCircle, Clock } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { BLOG_POSTS } from "@/data/content";

export default function AdminBlogsPage() {
  const convexBlogs = useQuery(api.blogs.listAll);
  const deleteMutation = useMutation(api.blogs.remove);
  const togglePublishMutation = useMutation(api.blogs.togglePublish);

  const [searchTerm, setSearchTerm] = useState("");

  const createBlogMutation = useMutation(api.blogs.create);
  const [localArticles, setLocalArticles] = useState<any[]>([]);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("rc_local_blogs");
      if (saved) {
        const parsed = JSON.parse(saved);
        setLocalArticles(parsed);

        // Automatically sync unsaved local browser posts up to Convex database
        if (parsed.length > 0) {
          (async () => {
            for (const item of parsed) {
              const cleanSlug = (item.slug || "").replace(/^\/blog\//, "").replace(/^\/+/, "");
              try {
                await createBlogMutation({
                  title: item.title,
                  slug: cleanSlug,
                  excerpt: item.excerpt || item.title || "",
                  content: item.content || "",
                  author: item.author || "RoadCrafters Master Technician",
                  published: item.published ?? true,
                  coverImageUrl: item.coverImageUrl,
                  metaTitle: item.metaTitle || item.title,
                  metaDescription: item.metaDescription || item.excerpt,
                  keywords: item.keywords,
                });
              } catch (e) {}
            }
            localStorage.removeItem("rc_local_blogs");
            setLocalArticles([]);
          })();
        }
      }
    } catch (e) {}
  }, [createBlogMutation]);

  // Combine Convex articles, local articles, and fallback defaults (deduplicated by slug)
  const serverOrLocal = [...localArticles, ...(convexBlogs || [])];
  const existingSlugs = new Set(serverOrLocal.map((b: any) => (b.slug || "").replace(/^\/blog\//, "").replace(/^\/+/, "")));
  
  const defaultArticles = BLOG_POSTS.filter((b: any) => {
    const cleanS = (b.slug || "").replace(/^\/blog\//, "").replace(/^\/+/, "");
    return !existingSlugs.has(cleanS);
  }).map((b: any, idx: number) => ({
    _id: `default_${idx}` as any,
    title: b.title,
    slug: (b.slug || "").replace(/^\/blog\//, "").replace(/^\/+/, ""),
    excerpt: b.excerpt,
    author: b.author?.name || "RoadCrafters Master Technician",
    published: true,
    publishedAt: Date.parse(b.publishedAt) || Date.now(),
    isDefault: true,
  }));

  const allArticles = [...serverOrLocal, ...defaultArticles];

  const filteredArticles = allArticles.filter((article: any) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: any) => {
    if (typeof id === "string" && id.startsWith("default_")) {
      alert("Default sample articles are read-only. Create a new article to manage dynamic posts!");
      return;
    }

    if (confirm("Are you sure you want to delete this blog post?")) {
      // Instantly remove from local state & localStorage if local post
      if (typeof id === "string" && id.startsWith("local_")) {
        const updatedLocal = localArticles.filter((a) => a._id !== id);
        setLocalArticles(updatedLocal);
        localStorage.setItem("rc_local_blogs", JSON.stringify(updatedLocal));
        return;
      }

      // Try server delete, with local UI removal fallback
      try {
        await deleteMutation({ id });
      } catch (err) {
        console.warn("Server delete failed, updating UI locally:", err);
      }
      setLocalArticles((prev) => prev.filter((a) => a._id !== id));
    }
  };

  const handleTogglePublish = async (id: any, currentStatus: boolean) => {
    if (typeof id === "string" && id.startsWith("default_")) {
      alert("Default sample articles are read-only. Create a new article to manage dynamic posts!");
      return;
    }

    if (typeof id === "string" && id.startsWith("local_")) {
      const updatedLocal = localArticles.map((a) =>
        a._id === id ? { ...a, published: !currentStatus } : a
      );
      setLocalArticles(updatedLocal);
      localStorage.setItem("rc_local_blogs", JSON.stringify(updatedLocal));
      return;
    }

    try {
      await togglePublishMutation({ id, published: !currentStatus });
    } catch (err) {
      console.warn("Failed to toggle publish status on server:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D1C5] pb-6">
        <div>
          <h1 className="font-serif text-3xl font-medium text-[#17352D]">
            Blog & Technical Articles
          </h1>
          <p className="text-xs text-[#6E706B] mt-1">
            Create, edit, publish, and delete machine technical guides and garage news.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="px-4 py-2.5 bg-[#17352D] hover:bg-[#23443A] text-white text-xs font-semibold uppercase tracking-widest transition-all flex items-center space-x-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#A96F43]" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 border border-[#E2DDD5] flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-[#E2DDD5] text-xs text-[#17352D] focus:outline-none focus:border-[#A96F43]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E2DDD5] shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#17352D] text-white uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4 font-semibold">Article Title</th>
              <th className="py-3 px-4 font-semibold">URL Slug</th>
              <th className="py-3 px-4 font-semibold">Author</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Publish Date</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2DDD5]">
            {filteredArticles.map((article: any) => {
              const displaySlug = (article.slug || "").replace(/^\/blog\//, "").replace(/^\/+/, "");
              return (
                <tr key={article._id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-[#17352D] max-w-xs truncate">
                    {article.title}
                  </td>
                  <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px]">
                    /blog/{displaySlug}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {article.author}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(article._id, article.published)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        article.published
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {article.published ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link
                      href={`/blog?slug=${displaySlug}`}
                      target="_blank"
                      className="inline-p-1 text-stone-500 hover:text-[#17352D] transition-colors"
                      title="View Live"
                    >
                      <Eye className="w-4 h-4 inline" />
                    </Link>
                    <Link
                      href={`/admin/blogs/edit?id=${article._id}`}
                      className="inline-p-1 text-stone-500 hover:text-[#A96F43] transition-colors"
                      title="Edit Post"
                    >
                      <Edit className="w-4 h-4 inline" />
                    </Link>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="inline-p-1 text-stone-400 hover:text-red-600 transition-colors"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
      </div>
    </div>
  );
}
