import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Save an inquiry from the AI Chatbot or Contact form
 */
export const send = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.string(),
    message: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("messages", {
      ...(args.name ? { name: args.name } : {}),
      email: args.email,
      message: args.message,
      source: args.source || "ai-agent",
      createdAt: Date.now(),
    });
    return { success: true, id };
  },
});

/**
 * Retrieve recent inquiries
 */
export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    return await ctx.db
      .query("messages")
      .withIndex("by_created_at")
      .order("desc")
      .take(limit);
  },
});
