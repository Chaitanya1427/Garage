import React from "react";
import { BLOG_POSTS } from "@/data/content";
import BlogDetailClient from "@/components/BlogDetailClient";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug.replace(/^\/blog\//, "").replace(/^\/+/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cleanSlug = slug.replace(/^\/blog\//, "").replace(/^\/+/, "");
  const post = BLOG_POSTS.find((p) => p.slug.replace(/^\/blog\//, "").replace(/^\/+/, "") === cleanSlug);

  if (!post) {
    return {
      title: "Machine Technical Guide | RoadCrafters Garage",
      description: "Read technical articles on machine maintenance, OBD diagnostics, and synthetic engine oil.",
    };
  }

  return {
    title: `${post.title} | RoadCrafters Garage Journal`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
