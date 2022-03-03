<script>
	import { requireAuth } from "@/utils/auth";
	import { onMount } from "svelte";
	import Spinner from "@/cmp/Spinner.svelte";

	let loading = true;

	onMount(async () => {
		await requireAuth();

		loading = false;
	});
</script>

{#if loading}
	<div
		class="fixed z-50 inset(x-0 y-0) bg-white flex items-center justify-center"
	>
		<Spinner size="2.5rem" color="currentColor" class="text-blue-500!" />
	</div>
{:else}
	<slot />
{/if}
