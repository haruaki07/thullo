<script lang="ts">
  import type { Board } from "@/api/types";
  import { Section } from "@/cmp/Widget";
  import UserCircle from "phosphor-svelte/lib/UserCircle";

  export let user: Board["members"][0];
  export let createdAt: string;
</script>

<Section title="Made By">
  <svelte:fragment slot="icon">
    <UserCircle weight="fill" />
  </svelte:fragment>
  <div class="flex items-center">
    <div
      class="h-9 w-9 rounded-lg inline"
      style="background-image: url({user.avatar});"
    />
    <div class="font-semibold ml-2 leading-none">
      <p class="text(gray-600 sm)">{user.name}</p>
      <span class="text(gray-300 xs)">
        on {new Date(createdAt).toDateString()}
      </span>
    </div>
  </div>
</Section>
