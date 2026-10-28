"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Wrench } from "lucide-react";
import BlogDetailClient from "@/components/BlogDetailClient";

export default function NotFound() {
  const [blogSlug, setBlogSlug] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      // Check if user is navigating to a dynamic blog post path like /blog/my-slug
      if (pathname.startsWith("/blog/") && pathname !== "/blog" && pathname !== "/blog/") {
        const slug = pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
        if (slug) {
          setBlogSlug(slug);
        }
      }
      setChecked(true);
    }
  }, []);

  if (!checked) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-4 font-sans">
        <div className="w-10 h-10 border-4 border-[#1F1B14] border-t-[#C5A059] rounded-full animate-spin mx-auto" />
        <p className="text-xs font-medium text-[#1F1B14]">Loading page...</p>
      </div>
    );
  }

  // If this is a dynamic blog post URL, render the dynamic blog client component!
  if (blogSlug) {
    return <BlogDetailClient slug={blogSlug} />;
  }

  // Standard 404 Page for other non-existent routes
  return (
    <div className="py-24 max-w-2xl mx-auto px-4 text-center space-y-6">
      <div className="w-16 h-16 bg-[#1F1B14] text-[#C5A059] flex items-center justify-center mx-auto shadow-md">
        <Wrench className="w-8 h-8" />
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B14]">
        404 — Page Not Found
      </h1>

      <p className="text-sm text-[#6E6B65] leading-relaxed max-w-md mx-auto">
        The page you are looking for doesn't exist or has been moved. You can return to our homepage or browse our machine engineering services.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1F1B14] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest hover:bg-[#2C2316] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#FAF8F5] border border-[#E6D7BC] text-[#1F1B14] text-xs font-semibold uppercase tracking-widest hover:bg-[#E6D7BC] transition-colors"
        >
          <BookOpen className="w-4 h-4 text-[#C5A059]" />
          <span>Technical Journal</span>
        </Link>
      </div>
    </div>
  );
}
