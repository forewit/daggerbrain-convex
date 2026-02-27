<script lang="ts">
  import { ClerkProvider } from "svelte-clerk";
  import { setupConvex, useConvexClient } from "convex-svelte";
  import { PUBLIC_CONVEX_URL } from "$env/static/public";

  // Props
  const { data, children } = $props();

  // Convex
  setupConvex(PUBLIC_CONVEX_URL);
  const convexClient = useConvexClient();
  convexClient.setAuth(async () => data.token);
</script>

<ClerkProvider>
	{@render children()}
</ClerkProvider>
