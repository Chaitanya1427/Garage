import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "roadcrafters2026";

// Verify admin passcode and create session token
export const login = mutation({
  args: { passcode: v.string() },
  handler: async (ctx, args) => {
    if (args.passcode !== ADMIN_PASSCODE) {
      return { success: false, message: "Invalid passcode" };
    }

    const token = `rc_admin_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    await ctx.db.insert("adminSessions", {
      token,
      expiresAt,
      createdAt: Date.now(),
    });

    return { success: true, token, expiresAt };
  },
});

// Validate admin session token
export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    if (!args.token) return false;
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session) return false;
    if (session.expiresAt < Date.now()) return false;
    return true;
  },
});
