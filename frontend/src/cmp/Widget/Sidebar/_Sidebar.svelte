<script lang="ts">
  import { onMount } from "svelte";
  import { clickOutside } from "../Dropdown/dropdown";
  import { fly } from "svelte/transition";
  import { sidebarShow as isShow, closeSidebar, openSidebar } from "./sidebar";

  export let target: string;

  let wrapper: HTMLElement;
  let targetEl: HTMLElement;

  let className = "";
  export { className as class };

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof Element) if (wrapper && $isShow) closeSidebar();
  };

  onMount(() => {
    targetEl = document.getElementById(target)!;

    targetEl.addEventListener("click", openSidebar);

    return () => {
      targetEl.removeEventListener("click", openSidebar);
      closeSidebar()
    };
  });
</script>

{#if $isShow}
  <div
    class="bg-white w-full sm:w-2/6 absolute right-0 top-0 bottom-0 shadow-lg {className}"
    bind:this={wrapper}
    use:clickOutside={{ target: targetEl }}
    on:clickoutside={handleClickOutside}
    transition:fly={{ x: 150, duration: 150 }}
  >
    <slot />
  </div>
{/if}
