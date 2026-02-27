<script lang="ts">
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';
	import { ClerkProvider } from 'svelte-clerk';

	const { children } = $props();
	setupConvex(PUBLIC_CONVEX_URL);
</script>

<ClerkProvider>
	{@render children()}
</ClerkProvider>
