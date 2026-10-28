import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get SEO meta settings by page path
export const getByPath = query({
  args: { pagePath: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pageSeo")
      .withIndex("by_page_path", (q) => q.eq("pagePath", args.pagePath))
      .first();
  },
});

// List all configured page SEO metadata
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pageSeo").collect();
  },
});

// Upsert page SEO metadata
export const upsertPageSeo = mutation({
  args: {
    pagePath: v.string(),
    metaTitle: v.string(),
    metaDescription: v.string(),
    keywords: v.optional(v.string()),
    ogImageUrl: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("pageSeo")
      .withIndex("by_page_path", (q) => q.eq("pagePath", args.pagePath))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        metaTitle: args.metaTitle,
        metaDescription: args.metaDescription,
        keywords: args.keywords,
        ogImageUrl: args.ogImageUrl,
        canonicalUrl: args.canonicalUrl,
        updatedAt: Date.now(),
      });
      return existing._id;
    } else {
      return await ctx.db.insert("pageSeo", {
        pagePath: args.pagePath,
        metaTitle: args.metaTitle,
        metaDescription: args.metaDescription,
        keywords: args.keywords,
        ogImageUrl: args.ogImageUrl,
        canonicalUrl: args.canonicalUrl,
        updatedAt: Date.now(),
      });
    }
  },
});
