import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BlogPost } from "@/data/content";

export default function BlogCard({ post }: { post: BlogPost }) {
  const heroImage = post.heroImage || "/garage_photos/blog-cover-journal.jpg";
  const category = post.category || "Technical Guide";
  const publishedAt = post.publishedAt || "Recently";
  const readTime = post.readTime || "3 min read";
  const title = post.title || "Untitled Article";
  const excerpt = post.excerpt || "";
  const authorName = post.author?.name || "RoadCrafters Master Technician";
  const authorAvatar = post.author?.avatar || "/logo-19th.png";

  return (
    <article className="bg-white border border-[#E6D7BC] group hover:border-[#C5A059] transition-all flex flex-col justify-between overflow-hidden shadow-sm">
      <div>
        <div className="relative h-52 w-full overflow-hidden bg-stone-200">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-[#1F1B14] text-[#FAF8F5] text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1">
            {category}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center text-xs text-[#6E6B65] space-x-3 mb-3">
            <span>{publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C5A059]" />
              {readTime}
            </span>
          </div>

          <h3 className="font-serif text-xl font-semibold text-[#1F1B14] group-hover:text-[#C5A059] transition-colors leading-snug mb-3">
            {title}
          </h3>

          <p className="text-sm text-[#6E6B65] leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0 border-t border-[#E6D7BC]/50 flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-2">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-[#1F1E1B] font-medium">{authorName}</span>
        </div>
        <Link
          href={`/blog?slug=${post.slug}`}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#1F1B14] group-hover:text-[#C5A059] transition-colors"
        >
          Read Article
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
