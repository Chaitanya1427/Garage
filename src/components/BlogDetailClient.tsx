"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, ArrowLeft, Share2, Check, MessageSquare, BookOpen, ShieldCheck, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/content";
import BlogCard from "@/components/BlogCard";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function BlogDetailClient({ slug }: { slug: string }) {
  const cleanSlug = slug.replace(/^\/blog\//, "").replace(/^\/+/, "");

  // Query Convex database for the article
  const convexPost = useQuery(api.blogs.getBySlug, { slug: cleanSlug });
  const convexPostAlt = useQuery(api.blogs.getBySlug, { slug: `/blog/${cleanSlug}` });

  const activeConvexPost = convexPost || convexPostAlt;

  // Fallback to static sample articles if Convex post is not found
  const staticPost = BLOG_POSTS.find(
    (p) => p.slug.replace(/^\/blog\//, "").replace(/^\/+/, "") === cleanSlug
  );

  const [copied, setCopied] = useState(false);

  // Determine current post data source
  const post = activeConvexPost
    ? {
        id: activeConvexPost._id,
        title: activeConvexPost.title,
        slug: cleanSlug,
        excerpt: activeConvexPost.excerpt,
        category: activeConvexPost.keywords?.split(",")[0]?.trim() || "Technical Guide",
        publishedAt: new Date(activeConvexPost.publishedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        readTime: `${Math.max(3, Math.ceil((activeConvexPost.content || "").length / 500))} min read`,
        heroImage: activeConvexPost.coverImageUrl || "/garage_photos/blog-cover-journal.jpg",
        author: {
          name: activeConvexPost.author || "RoadCrafters Master Technician",
          role: "Lead Diagnostic Engineer",
          avatar: "/logo-19th.png",
        },
        content: activeConvexPost.content,
      }
    : staticPost;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Loading state while Convex query executes
  if (convexPost === undefined && !staticPost) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-4 font-sans">
        <div className="w-12 h-12 border-4 border-[#1F1B14] border-t-[#C5A059] rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium text-[#1F1B14]">
          Loading article from RoadCrafters database...
        </p>
      </div>
    );
  }

  // Not Found State
  if (!post) {
    return (
      <div className="py-24 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-[#1F1B14] text-[#C5A059] flex items-center justify-center mx-auto shadow-md">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1F1B14]">
          Article Not Found
        </h1>
        <p className="text-sm text-[#6E6B65] leading-relaxed">
          The technical article you requested (<code className="text-[#C5A059] font-mono">/blog/{cleanSlug}</code>) could not be located in our published archive.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1F1B14] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest hover:bg-[#2C2316] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
          <span>Back to All Articles</span>
        </Link>
      </div>
    );
  }

  // Prepare content paragraphs/sections
  const contentRaw = post.content || "";
  const contentParagraphs = Array.isArray(contentRaw)
    ? contentRaw
    : contentRaw.split("\n\n").filter((p: string) => p.trim() !== "");

  // Related posts (excluding current slug)
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug.replace(/^\/blog\//, "").replace(/^\/+/, "") !== cleanSlug
  ).slice(0, 2);

  return (
    <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Navigation Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#6E6B65] font-medium">
        <Link href="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#C5A059]" />
        <Link href="/blog" className="hover:text-[#C5A059] transition-colors">Technical Journal</Link>
        <ChevronRight className="w-3 h-3 text-[#C5A059]" />
        <span className="text-[#1F1B14] font-semibold truncate max-w-[200px] sm:max-w-none">
          {post.title}
        </span>
      </nav>

      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex items-center space-x-3">
          <span className="text-[10px] uppercase font-semibold tracking-widest text-[#FAF8F5] bg-[#1F1B14] px-3 py-1 inline-block border border-[#C5A059]">
            {post.category}
          </span>
          <span className="text-xs text-[#6E6B65] flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            Verified Technical Article
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1B14] leading-[1.18]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-base sm:text-lg text-[#6E6B65] leading-relaxed border-l-2 border-[#C5A059] pl-4 italic">
            {post.excerpt}
          </p>
        )}

        {/* Author Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#E6D7BC] py-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar || "/logo-19th.png"}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#C5A059]"
            />
            <div>
              <p className="text-xs font-semibold text-[#1F1B14]">
                {post.author.name}
              </p>
              <p className="text-[10px] text-[#6E6B65]">
                {post.author.role || "Technical Advisor"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-[#6E6B65]">
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              {post.readTime}
            </span>
          </div>

          {/* Social Share Bar */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-white border border-[#E6D7BC] text-xs font-semibold text-[#1F1B14] flex items-center gap-1.5 transition-colors"
              title="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="text-[#C5A059]">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Share</span>
                </>
              )}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Share on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Cover Image */}
      <div className="border border-[#E6D7BC] bg-white p-2 shadow-sm">
        <img
          src={post.heroImage}
          alt={post.title}
          className="w-full h-[320px] sm:h-[450px] object-cover"
        />
      </div>

      {/* Markdown Body Content Renderer */}
      <div className="prose max-w-none text-[#1F1B14] space-y-6 text-base leading-relaxed font-sans border-b border-[#E6D7BC] pb-12">
        {contentParagraphs.length === 0 ? (
          <p className="text-[#1F1B14] text-base leading-relaxed italic border-l-2 border-[#C5A059] pl-4 bg-[#FAF8F5] py-3">
            {post.excerpt || "This technical article was published with overview details. Check back for full garage diagnostic notes."}
          </p>
        ) : (
          contentParagraphs.map((paragraph: string, idx: number) => {
            const trimmed = paragraph.trim();

            if (trimmed.startsWith("# ")) {
              return (
                <h1 key={idx} className="font-serif text-3xl font-bold text-[#1F1B14] pt-6 mb-3 border-b border-[#E6D7BC] pb-2">
                  {trimmed.slice(2)}
                </h1>
              );
            }
            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={idx} className="font-serif text-2xl font-bold text-[#1F1B14] pt-5 mb-2">
                  {trimmed.slice(3)}
                </h2>
              );
            }
            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={idx} className="font-serif text-xl font-semibold text-[#1F1B14] pt-4 mb-2">
                  {trimmed.slice(4)}
                </h3>
              );
            }
            if (trimmed.startsWith("> ")) {
              return (
                <blockquote key={idx} className="border-l-4 border-[#C5A059] pl-4 py-3 italic text-stone-700 bg-[#FAF8F5] my-4 text-sm sm:text-base">
                  {trimmed.slice(2)}
                </blockquote>
              );
            }
            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
              const listItems = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
              return (
                <ul key={idx} className="space-y-2 my-4 pl-4">
                  {listItems.map((item, i) => (
                    <li key={i} className="flex items-start text-sm sm:text-base text-[#1F1B14]">
                      <span className="w-2 h-2 rounded-full bg-[#C5A059] mt-2 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={idx} className="text-[#1F1B14] leading-relaxed text-base">
                {trimmed}
              </p>
            );
          })
        )}
      </div>

      {/* Garage Booking Banner */}
      <div className="bg-[#1F1B14] text-[#FAF8F5] p-8 border border-[#2C2316] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-semibold">
            Need Expert Diagnostics for Your Bike?
          </h3>
          <p className="text-xs text-[#E6D7BC]">
            Book a service bay at RoadCrafters Garage in Porvorim, Goa. Full OBD scan, synthetic oil flush, and 32-point inspection.
          </p>
        </div>
        <Link
          href="/book"
          className="px-6 py-3 bg-[#C5A059] hover:bg-[#B38E47] text-[#1F1B14] font-semibold text-xs uppercase tracking-widest whitespace-nowrap transition-colors"
        >
          Book Appointment →
        </Link>
      </div>

      {/* Related Technical Guides */}
      {relatedPosts.length > 0 && (
        <section className="pt-8 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#1F1B14] border-b border-[#E6D7BC] pb-3">
            Related Technical Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((r) => (
              <BlogCard key={r.id} post={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
