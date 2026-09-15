import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get recent guestbook entries
 */
export const getEntries = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 30;
    return await ctx.db
      .query("guestbook")
      .withIndex("by_created_at")
      .order("desc")
      .take(limit);
  },
});

/**
 * Add a new guestbook entry
 */
export const addEntry = mutation({
  args: {
    name: v.string(),
    message: v.string(),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("guestbook", {
      name: args.name.slice(0, 50),
      message: args.message.slice(0, 300),
      ...(args.avatar ? { avatar: args.avatar } : {}),
      createdAt: Date.now(),
    });
    return { success: true, id };
  },
});
