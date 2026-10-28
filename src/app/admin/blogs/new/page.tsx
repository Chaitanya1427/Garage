"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Eye, Code, Search, Sparkles } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export default function NewBlogPostPage() {
  const router = useRouter();
  const createBlogMutation = useMutation(api.blogs.create);
  const generateUploadUrlMutation = useMutation(api.files.generateUploadUrl);

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    author: "RoadCrafters Master Technician",
    content: "",
    published: true,
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setForm({
      ...form,
      title: val,
      slug: form.slug === "" || form.slug === generatedSlug.slice(0, -1) ? generatedSlug : form.slug,
      metaTitle: form.metaTitle === "" ? `${val} | RoadCrafters Garage` : form.metaTitle,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let coverImageStorageId: any = undefined;
    let coverImageUrl: string | undefined = undefined;

    // Upload selected image file directly to Convex Storage bucket
    if (selectedFile) {
      try {
        const postUrl = await generateUploadUrlMutation();
        const uploadResult = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": selectedFile.type || "image/png" },
          body: selectedFile,
        });

        if (uploadResult.ok) {
          const { storageId } = await uploadResult.json();
          coverImageStorageId = storageId;
        }
      } catch (err) {
        console.warn("Failed to upload image file to Convex storage bucket:", err);
      }

      // Fallback: If cloud storage upload failed and file is < 500KB, fallback to base64
      if (!coverImageStorageId && selectedFile.size < 500 * 1024) {
        try {
          coverImageUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(selectedFile);
          });
        } catch (e) {}
      }
    }

    const cleanSlug = (form.slug || "article-" + Date.now())
      .replace(/^\/blog\//, "")
      .replace(/^\/+/, "")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/(^-|-$)/g, "");

    try {
      await createBlogMutation({
        title: form.title,
        slug: cleanSlug,
        excerpt: form.excerpt,
        content: form.content,
        author: form.author || "RoadCrafters Master Technician",
        published: form.published,
        coverImageStorageId: coverImageStorageId || undefined,
        coverImageUrl: coverImageUrl || undefined,
        metaTitle: form.metaTitle || form.title,
        metaDescription: form.metaDescription || form.excerpt,
        keywords: form.keywords,
      });

      // Clear local backup if present
      try {
        const saved = JSON.parse(localStorage.getItem("rc_local_blogs") || "[]");
        const filtered = saved.filter((b: any) => b.slug !== cleanSlug);
        localStorage.setItem("rc_local_blogs", JSON.stringify(filtered));
      } catch (e) {}

      router.push("/admin/blogs");
    } catch (err) {
      console.error("Failed to save blog post to Convex:", err);
      alert("Error saving blog post to database. If an image is selected, please make sure it is a valid image file.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-xs font-semibold text-stone-600 hover:text-[#17352D] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-6 py-2.5 bg-[#17352D] hover:bg-[#23443A] text-white text-xs font-semibold uppercase tracking-widest transition-all flex items-center space-x-2 shadow-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-[#A96F43]" />
          <span>{submitting ? "Publishing..." : "Publish Article"}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Article Information */}
        <div className="bg-white p-6 border border-[#E2DDD5] space-y-6 shadow-sm">
          <h2 className="font-serif text-xl font-medium text-[#17352D] border-b border-[#E2DDD5] pb-3">
            Article Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                Article Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Synthetic Engine Oil & OBD Diagnostics Guide"
                value={form.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm text-[#202522] focus:outline-none focus:border-[#A96F43]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                URL Slug *
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-stone-100 border border-r-0 border-[#E2DDD5] text-xs text-stone-500 font-mono">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  placeholder="synthetic-engine-oil-guide"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm font-mono text-[#202522] focus:outline-none focus:border-[#A96F43]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm text-[#202522] focus:outline-none focus:border-[#A96F43]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                Cover Image Upload
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[#17352D] file:text-white hover:file:bg-[#23443A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
              Short Excerpt / Summary *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Brief 1-2 sentence summary of the article..."
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm text-[#202522] focus:outline-none focus:border-[#A96F43]"
            />
          </div>
        </div>

        {/* Content Editor & Live Preview */}
        <div className="bg-white border border-[#E2DDD5] shadow-sm">
          <div className="bg-[#17352D] px-6 py-3 flex items-center justify-between text-white">
            <h2 className="font-serif text-lg font-medium">Article Body Content</h2>
            <div className="flex items-center space-x-1 bg-[#1C3E35] p-1 border border-[#2B463D]">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                  activeTab === "write" ? "bg-[#A96F43] text-white" : "text-stone-300 hover:text-white"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Write (Markdown)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                  activeTab === "preview" ? "bg-[#A96F43] text-white" : "text-stone-300 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "write" ? (
              <textarea
                rows={14}
                required
                placeholder="Write your article in Markdown... Use # for headings, **bold** for emphasis, and bullet points."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 font-mono text-sm text-[#17352D] border border-[#E2DDD5] focus:outline-none focus:border-[#A96F43]"
              />
            ) : (
              <div className="prose max-w-none p-4 bg-stone-50 border border-[#E2DDD5] min-h-[300px] text-sm text-[#202522]">
                <h1 className="font-serif text-2xl font-bold text-[#17352D] mb-4">
                  {form.title || "Article Title Preview"}
                </h1>
                <p className="text-stone-500 text-xs italic mb-4">
                  By {form.author} • {new Date().toLocaleDateString()}
                </p>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {form.content || "Content preview will appear here as you type..."}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* On-Page SEO Section */}
        <div className="bg-white p-6 border border-[#E2DDD5] space-y-6 shadow-sm">
          <div className="flex items-center space-x-2 text-[#17352D] border-b border-[#E2DDD5] pb-3">
            <Search className="w-5 h-5 text-[#A96F43]" />
            <h2 className="font-serif text-xl font-medium">Article On-Page SEO</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                placeholder="Custom meta title for Google..."
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm text-[#202522] focus:outline-none focus:border-[#A96F43]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                placeholder="Custom search snippet description (150-160 chars recommended)..."
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm text-[#202522] focus:outline-none focus:border-[#A96F43]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#17352D] mb-1">
                Focus Keywords
              </label>
              <input
                type="text"
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                placeholder="e.g. machine engine oil, obd diagnostic, porvorim garage"
                className="w-full px-4 py-2.5 bg-white border border-[#E2DDD5] text-sm text-[#202522] focus:outline-none focus:border-[#A96F43]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
