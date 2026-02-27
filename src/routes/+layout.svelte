<script lang="ts">
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex, useConvexClient } from 'convex-svelte';
	import { ClerkProvider, useClerkContext } from 'svelte-clerk';

	const { children } = $props();
	setupConvex(PUBLIC_CONVEX_URL);

	const convexClient = useConvexClient();
	const clerk = useClerkContext();

	$effect(() => {
		if (!clerk.isLoaded) {
			return;
		}

		convexClient.setAuth(async () => {
			return (await clerk.session?.getToken({ template: 'convex' })) ?? null;
		});
	});
</script>

<ClerkProvider>
	{@render children()}
</ClerkProvider>
