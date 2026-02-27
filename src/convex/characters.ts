import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { characterSchema } from './schema';

export const list = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthenticated');
		}

		return await ctx.db
			.query('characters')
			.withIndex('by_clerk_id', (q) => q.eq('clerk_id', identity.tokenIdentifier))
			.collect();
	}
});

export const add = mutation({
	args: characterSchema,
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthenticated');
		}

		const characterId = await ctx.db.insert('characters', {
			...args,
			clerk_id: identity.tokenIdentifier
		});

		return characterId;
	}
});

export const update = mutation({
	args: { ...characterSchema, id: v.id('characters') },
	handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthenticated');
    }

		const { id, ...characterPatch } = args;
		const character = await ctx.db.get(id);

		if (!character || character.clerk_id !== identity.tokenIdentifier) {
			throw new Error('Character not found');
		}

		await ctx.db.patch(id, characterPatch);

		return id;
	}
});
