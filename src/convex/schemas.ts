import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  characters: defineTable({
    user: v.id('users'),
    name: v.string(),
  }).index("by_user", ['user']),
});