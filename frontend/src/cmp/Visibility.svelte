<script lang="ts">
  import { css } from "@/styles";
  import Globe from "phosphor-svelte/lib/GlobeHemisphereWest";
  import Lock from "phosphor-svelte/lib/Lock";

  type Value = "private" | "public";

  export let value: Value = "private";

  $: buttonStyle = (v: Value) =>
    `${css.button.gray} px-3! font-medium w-full text-left ${
      v !== value ? "bg-white! hover:bg-gray-200!" : ""
    }`;
</script>

<div class="p-3">
  <h2 class="text-gray-700 font-medium text-lg">Visibility</h2>
  <p class="text-gray-500 text-sm mb-2 mt-1">Choose who can see this board</p>
  <div class="grid grid-rows-2 gap-2">
    <button
      type="button"
      class={buttonStyle("public")}
      on:click={() => (value = "public")}
    >
      <div class=" {css.button.icon} ">
        <Globe weight="fill" />
        <span class="ml-2 text-sm">Public</span>
      </div>
      <p class="text-xs font-normal mt-1">
        Anyone on the internet can see this.
      </p>
    </button>

    <button
      type="button"
      class={buttonStyle("private")}
      on:click={() => (value = "private")}
    >
      <div class=" {css.button.icon} ">
        <Lock weight="fill" />
        <span class="ml-2 text-sm">Private</span>
      </div>
      <p class="text-xs font-normal mt-1">Only board member can see this.</p>
    </button>
  </div>
</div>
