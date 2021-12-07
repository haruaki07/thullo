<script lang="ts">
  import Navbar from "@/cmp/Widget/Navbar";
  import Apps from "@/cmp/Widget/Icons/Apps.svelte";
  import SearchInput from "@/cmp/Widget/SearchInput";
  import { css } from "@/styles";

  const btnHomeClassName = `${css.button.gray} ${css.button.icon} py-2 px-3! text-xs font-medium ml-3`;

  export let boardTitle = "";
</script>

<Navbar>
  <svelte:fragment slot="center">
    <div class="items-center ml-12 hidden lg:flex">
      <h2 class="text-lg font-semibold pr-3 border-r border-gray-200">
        {boardTitle}
      </h2>
      <a href="/" class={btnHomeClassName}>
        <Apps />
        <span class="ml-2">All board</span>
      </a>
    </div>
  </svelte:fragment>

  <div slot="right" class="mr-10 w-72 hidden sm:block">
    <SearchInput inputClass="py-1.5!" />
  </div>
</Navbar>
