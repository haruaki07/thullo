<script lang="ts">
  import type { Board } from "@/api/types";
  import { Section } from "@/cmp/Widget";
  import Users from "phosphor-svelte/lib/Users";
  import { tw } from "twind";

  export let members: Board["members"] = [];

  let isAdmin = true;

  const btnRemoveClassName = tw(
    `border-red-500 border py-0.5 ml-auto px-1 rounded-md text-red-500 focus:(ring ring-red-200 outline-none) text-xs`
  );
</script>

<Section title="Teams">
  <svelte:fragment slot="icon">
    <Users weight="fill" />
  </svelte:fragment>
  <div>
    {#each members as member}
      <div class="flex items-center mb-2">
        <div
          class="rounded-lg w-9 h-9 flex-shrink-0"
          style="background-image: url({member.avatar});"
        />
        <span class="ml-2 text(sm gray-800) font-semibold flex-grow truncate"
          >{member.name}</span
        >
        {#if member.isAdmin}
          <span class="ml-auto text(xs gray-500) font-semibold"> Admin </span>
        {:else if isAdmin && !member.isAdmin}
          <button type="button" class={btnRemoveClassName}> Remove </button>
        {/if}
      </div>
    {/each}
  </div>
</Section>
