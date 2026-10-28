"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import { BLOG_POSTS } from "@/data/content";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function LatestArticlesSection() {
  const convexBlogs = useQuery(api.blogs.listPublished);

  // Map Convex posts
  const dynamicConvexPosts = (convexBlogs || []).map((post: any) => {
    const cleanSlug = (post.slug || "").replace(/^\/blog\//, "").replace(/^\/+/, "");
    return {
      id: post._id,
      slug: cleanSlug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.keywords?.split(",")[0]?.trim() || "Technical Guide",
      publishedAt: new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      readTime: `${Math.max(3, Math.ceil((post.content || "").length / 500))} min read`,
      heroImage: post.coverImageUrl || "/garage_photos/blog-cover-journal.jpg",
      author: {
        name: post.author || "RoadCrafters Master Technician",
        role: "Technical Advisor",
        avatar: "/logo-19th.png",
      },
      content: post.content,
    };
  });

  const convexSlugs = new Set(dynamicConvexPosts.map((p) => p.slug));
  const fallbackPosts = BLOG_POSTS.filter((p) => !convexSlugs.has(p.slug));
  const displayArticles = [...dynamicConvexPosts, ...fallbackPosts].slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="TECHNICAL JOURNAL & GUIDES"
        title="Rider Maintenance & Diagnostic Articles."
        subtitle="Insights from our lead technicians and diagnostic engineers on synthetic oils, OBD telemetry, chain synchronization, and suspension care."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayArticles.map((post: any) => (
          <BlogCard key={post.id || post.slug} post={post as any} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#1F1B14] hover:text-[#C5A059] border-b border-[#1F1B14] pb-1 transition-colors"
        >
          <span>Explore All Machine Technical Guides</span>
          <ArrowRight className="w-4 h-4 ml-2 text-[#C5A059]" />
        </Link>
      </div>
    </section>
  );
}
