<script lang="ts">
  import X from "phosphor-svelte/lib/X";
  import { closeSidebar } from "@/cmp/Widget/Sidebar/sidebar";
  import Description from "./Sections/_Description.svelte";
  import MadeBy from "./Sections/_MadeBy.svelte";
  import Teams from "./Sections/_Teams.svelte";
  import { board } from "../store";

  $: authorName = $board.members.find((m) => m.isAdmin === true).userId.name;
</script>

<div class="p-4">
  <div class="border-b flex items-center justify-between pb-1">
    <p class="font-semibold">Menu</p>
    <button type="button" on:click={closeSidebar}>
      <X />
    </button>
  </div>
  <MadeBy createdAt={$board.createdAt} name={authorName} />
  <Description description={$board.description} />
  <Teams members={$board.members} />
</div>
