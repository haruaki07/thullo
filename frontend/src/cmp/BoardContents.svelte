<script>
  import List from "./List.svelte";
  import ListAdd from "./ListAdd.svelte";
  import { lists } from "@/pages/Board/store";
</script>

{#each $lists as list (list.id)}
  <List {list} />
{/each}

<ListAdd haveNoList={!$lists.length} />
