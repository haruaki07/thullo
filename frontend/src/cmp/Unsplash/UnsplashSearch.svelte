<script lang="ts">
  import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
  import Gallery from "./Gallery.svelte";
  import SearchInput from "@/cmp/Widget/SearchInput";
</script>

<div class="p-3">
  <h2 class="text-gray-700 font-medium text-lg">Photo search</h2>
  <p class="text-gray-500 text-sm mb-2 mt-1">Search Unsplash for photos</p>
  <SearchInput class="mb-3" withIcon>
    <svelte:fragment slot="btn">
      <MagnifyingGlass size="14px" />
    </svelte:fragment>
  </SearchInput>
  <Gallery />
  <div class="flex w-full items-center justify-between mt-2">
    <button class="focus:outline-none">Prev</button>
    <button class="focus:outline-none">Next</button>
  </div>
</div>
