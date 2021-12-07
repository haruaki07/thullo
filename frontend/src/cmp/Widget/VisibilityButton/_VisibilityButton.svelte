<script lang="ts">
  import Lock from "phosphor-svelte/lib/Lock";
  import Globe from "phosphor-svelte/lib/GlobeHemisphereWest";
  import { css } from "@/styles";
  import { tw } from "twind";

  export let isPublic: boolean;
  let customClass = "";
  export { customClass as class };

  $: className = tw(
    `${css.button.gray} ${css.button.icon} py-2 px-3! font-medium text-sm ${customClass}`
  );
</script>

<button type="button" {...$$restProps} class={className}>
  {#if isPublic}
    <Globe weight="fill" />
  {:else}
    <Lock weight="fill" />
  {/if}
  <span class="ml-2">{isPublic ? "Public" : "Private"}</span>
</button>
