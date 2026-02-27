import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const userSchema = {
	name: v.string(),
};

export const characterSchema = {
	name: v.string(),
	hope: v.number()
};

export default defineSchema({
	users: defineTable({
        clerk_id: v.string(),
        ...userSchema,
    }).index('by_clerk_id', ['clerk_id']),
	characters: defineTable({
		clerk_id: v.string(),
		...characterSchema
	}).index('by_clerk_id', ['clerk_id']),
});
