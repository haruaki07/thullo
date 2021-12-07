<script lang="ts">
  import { Section } from "@/cmp/Widget";
  import UserCircle from "phosphor-svelte/lib/UserCircle";

  export let name: string;
  export let createdAt: string;
</script>

<Section title="Made By">
  <svelte:fragment slot="icon">
    <UserCircle weight="fill" />
  </svelte:fragment>
  <div class="flex items-center">
    <div class="bg-gray-300 h-9 w-9 rounded-lg inline" />
    <div class="font-semibold ml-2">
      <p class="text(gray-600 sm) leading-none">{name}</p>
      <span class="text(gray-300 xs)">
        {new Date(createdAt).toDateString()}
      </span>
    </div>
  </div>
</Section>
