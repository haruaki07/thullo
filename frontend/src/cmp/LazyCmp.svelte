<script lang="ts">
  export let component: any;
  export let loadingContent = "Loading...";
</script>

{#await component.then ? component : component()}
  <div class="text-center">
    {#if typeof loadingContent === "string"}
      {loadingContent}
    {:else}
      <svelte:component this={loadingContent} />
    {/if}
  </div>
{:then Cmp}
  <svelte:component this={Cmp.default} />
{/await}
