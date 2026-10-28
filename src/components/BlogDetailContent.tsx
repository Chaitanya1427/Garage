"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { BLOG_POSTS } from "@/data/content";
import BlogCard from "@/components/BlogCard";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function BlogDetailContent({ slug }: { slug: string }) {
  const convexPost = useQuery(api.blogs.getBySlug, { slug: slug || "" });
  const [localPost, setLocalPost] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rc_local_blogs");
      if (saved) {
        const blogs = JSON.parse(saved);
        const found = blogs.find((b: any) => b.slug === slug);
        if (found) setLocalPost(found);
      }
    } catch (e) {}
  }, [slug]);

  const defaultPost = BLOG_POSTS.find((p) => p.slug === slug);

  const post = localPost || (convexPost ? {
    id: convexPost._id,
    slug: convexPost.slug,
    title: convexPost.title,
    excerpt: convexPost.excerpt,
    category: "Technical Guide",
    publishedAt: new Date(convexPost.publishedAt).toLocaleDateString(),
    readTime: `${Math.max(3, Math.ceil(convexPost.content.length / 500))} min read`,
    heroImage: convexPost.coverImageUrl || "/garage_photos/blog-cover-journal.jpg",
    author: {
      name: convexPost.author || "RoadCrafters Master Technician",
      role: "Technical Advisor",
      avatar: "/logo-19th.png",
    },
    content: convexPost.content,
  } : defaultPost);

  if (!post) {
    return (
      <div className="py-20 text-center text-[#6E6B65] font-mono text-sm">
        Article not found. <Link href="/blog" className="underline text-[#1F1B14]">Back to Guides</Link>
      </div>
    );
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== slug);

  const contentParagraphs = Array.isArray(post.content)
    ? post.content
    : [post.content];

  return (
    <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumb */}
      <div className="text-xs text-[#6E6B65] flex items-center space-x-2">
        <Link href="/" className="hover:text-[#C5A059]">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[#C5A059]">Guides</Link>
        <span>/</span>
        <span className="text-[#1F1B14] font-medium">{post.category || "Technical Guide"}</span>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C5A059] bg-[#1F1B14] px-2.5 py-1 inline-block">
          {post.category || "Technical Guide"}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1F1B14] leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 text-xs text-[#6E6B65] pt-2 border-y border-[#E6D7BC] py-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#1F1B14] text-[#FAF8F5] flex items-center justify-center text-xs font-bold border border-[#C5A059]">
              {typeof post.author === "string" ? post.author.charAt(0) : post.author?.name?.charAt(0) || "R"}
            </div>
            <span className="font-semibold text-[#1F1B14]">
              {typeof post.author === "string" ? post.author : post.author?.name}
            </span>
          </div>
          <span>•</span>
          <span>{post.publishedAt || "Recently"}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            {post.readTime || "5 min read"}
          </span>
        </div>
      </header>

      {/* Hero image */}
      {post.heroImage || post.coverImageUrl ? (
        <div className="border border-[#E6D7BC] bg-white p-2">
          <img
            src={post.heroImage || post.coverImageUrl}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
      ) : null}

      {/* Content paragraphs */}
      <div className="prose max-w-none text-[#1F1B14] space-y-4 text-base leading-relaxed font-sans">
        {contentParagraphs.map((paragraph: string, idx: number) => {
          if (paragraph.startsWith("# ")) {
            return <h1 key={idx} className="font-serif text-3xl font-bold text-[#1F1B14] mt-8 mb-3">{paragraph.slice(2)}</h1>;
          }
          if (paragraph.startsWith("## ")) {
            return <h2 key={idx} className="font-serif text-2xl font-semibold text-[#1F1B14] mt-6 mb-3">{paragraph.slice(3)}</h2>;
          }
          if (paragraph.startsWith("### ")) {
            return <h3 key={idx} className="font-serif text-xl font-semibold text-[#1F1B14] mt-4 mb-2">{paragraph.slice(4)}</h3>;
          }
          if (paragraph.startsWith("> ")) {
            return <blockquote key={idx} className="border-l-4 border-[#C5A059] pl-4 py-2 italic text-[#6E6B65] bg-[#FAF8F5] my-4">{paragraph.slice(2)}</blockquote>;
          }
          if (paragraph.startsWith("- ")) {
            return <li key={idx} className="ml-6 list-disc text-[#1F1B14] font-sans my-1">{paragraph.slice(2)}</li>;
          }
          return <p key={idx} className="text-[#1F1B14] leading-relaxed text-base">{paragraph}</p>;
        })}
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="pt-12 border-t border-[#E6D7BC] space-y-6">
          <h3 className="font-serif text-2xl font-semibold text-[#1F1B14]">
            Related Technical Guides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((r) => (
              <BlogCard key={r.id} post={r} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
