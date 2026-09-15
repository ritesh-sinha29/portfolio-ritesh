import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Contact and AI chatbot inquiries
  messages: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    message: v.string(),
    source: v.string(), // "ai-agent" | "contact-page" | "widget"
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  // Real-time project likes / upvotes
  projectLikes: defineTable({
    projectId: v.string(), // e.g. "wekraft", "clarioo", "looma", "aria", "pan-sales", "vocalx"
    likes: v.number(),
  }).index("by_project_id", ["projectId"]),

  // Public interactive guestbook / visitor wall
  guestbook: defineTable({
    name: v.string(),
    message: v.string(),
    avatar: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),
});
