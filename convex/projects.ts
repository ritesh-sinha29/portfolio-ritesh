import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get all project likes
 */
export const getLikes = query({
  args: {},
  handler: async (ctx) => {
    const records = await ctx.db.query("projectLikes").collect();
    const likesMap: Record<string, number> = {};
    for (const record of records) {
      likesMap[record.projectId] = record.likes;
    }
    return likesMap;
  },
});

/**
 * Increment likes for a specific project
 */
export const likeProject = mutation({
  args: {
    projectId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projectLikes")
      .withIndex("by_project_id", (q) => q.eq("projectId", args.projectId))
      .first();

    if (existing) {
      const newLikes = existing.likes + 1;
      await ctx.db.patch(existing._id, { likes: newLikes });
      return newLikes;
    } else {
      await ctx.db.insert("projectLikes", {
        projectId: args.projectId,
        likes: 1,
      });
      return 1;
    }
  },
});
