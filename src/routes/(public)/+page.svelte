<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '@convex/_generated/api.js';
	import { useClerkContext } from 'svelte-clerk';

	const clerk = useClerkContext();
	const query = useQuery(api.characters.list, () => (clerk.auth.userId ? {} : 'skip'));
</script>

{#if query.isLoading}
	Loading...
{:else if query.error}
	failed to load: {query.error.toString()}
{:else if query.data}
	<ul>
		{#each query.data as character}
			<li>
				<span>{character.name}</span>
			</li>
		{/each}
	</ul>
{:else}
	No characters yet.
{/if}