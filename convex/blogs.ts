import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all blog posts (admin view)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogs").order("desc").collect();
  },
});

// List only published blog posts (public view)
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("blogs")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .collect();
  },
});

// Get single blog post by slug (public view)
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const clean = (args.slug || "").replace(/^\/blog\//, "").replace(/^\/+/, "");
    
    // 1. Try clean slug exact match
    let post = await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", clean))
      .first();

    // 2. Try with /blog/ prefix match
    if (!post) {
      post = await ctx.db
        .query("blogs")
        .withIndex("by_slug", (q) => q.eq("slug", `/blog/${clean}`))
        .first();
    }

    // 3. Fallback: match any blog slug case-insensitively
    if (!post) {
      const all = await ctx.db.query("blogs").collect();
      post = all.find((b) => {
        const s = (b.slug || "").replace(/^\/blog\//, "").replace(/^\/+/, "").toLowerCase();
        return s === clean.toLowerCase();
      }) || null;
    }

    return post;
  },
});

// Get single blog post by ID (admin edit view)
export const getById = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create new blog post
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageStorageId: v.optional(v.id("_storage")),
    coverImageUrl: v.optional(v.string()),
    author: v.string(),
    published: v.boolean(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    keywords: v.optional(v.string()),
    ogImageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let coverUrl = args.coverImageUrl;
    if (args.coverImageStorageId) {
      coverUrl = (await ctx.storage.getUrl(args.coverImageStorageId)) ?? undefined;
    }

    const id = await ctx.db.insert("blogs", {
      title: args.title,
      slug: args.slug,
      excerpt: args.excerpt,
      content: args.content,
      coverImageStorageId: args.coverImageStorageId,
      coverImageUrl: coverUrl,
      author: args.author || "RoadCrafters Master Technician",
      published: args.published,
      publishedAt: Date.now(),
      metaTitle: args.metaTitle,
      metaDescription: args.metaDescription,
      keywords: args.keywords,
      ogImageUrl: args.ogImageUrl || coverUrl,
    });
    return id;
  },
});

// Update existing blog post
export const update = mutation({
  args: {
    id: v.id("blogs"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageStorageId: v.optional(v.id("_storage")),
    coverImageUrl: v.optional(v.string()),
    author: v.string(),
    published: v.boolean(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    keywords: v.optional(v.string()),
    ogImageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let coverUrl = args.coverImageUrl;
    if (args.coverImageStorageId) {
      coverUrl = (await ctx.storage.getUrl(args.coverImageStorageId)) ?? undefined;
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      slug: args.slug,
      excerpt: args.excerpt,
      content: args.content,
      coverImageStorageId: args.coverImageStorageId,
      coverImageUrl: coverUrl,
      author: args.author,
      published: args.published,
      metaTitle: args.metaTitle,
      metaDescription: args.metaDescription,
      keywords: args.keywords,
      ogImageUrl: args.ogImageUrl || coverUrl,
    });
  },
});

// Toggle publish status
export const togglePublish = mutation({
  args: { id: v.id("blogs"), published: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { published: args.published });
  },
});

// Delete blog post
export const remove = mutation({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (post?.coverImageStorageId) {
      await ctx.storage.delete(post.coverImageStorageId);
    }
    await ctx.db.delete(args.id);
  },
});
