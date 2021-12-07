<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { createPopper } from "@popperjs/core";
  import type { Placement, Instance, Modifier } from "@popperjs/core";
  import { clickOutside } from "./dropdown";
  import { fade } from "svelte/transition";

  let className = "";
  export { className as class };
  export let isOpen = false;
  export let placement: Placement = "bottom";
  export let offset = [0, 5];
  export let target: string;
  export let trigger: "hover" | "focus" | "click" = "click";

  let targetEl: HTMLElement;
  let popoverEl: HTMLElement;
  let popperInstance: Instance | undefined;
  let popperPlacement = placement;
  const dispatch = createEventDispatcher();

  const checkPopperPlacement: Modifier<any, any> = {
    name: "checkPopperPlacement",
    enabled: true,
    phase: "main",
    fn({ state }) {
      popperPlacement = state.placement;
    },
  };

  $: {
    if (isOpen && popoverEl) {
      // @ts-ignore
      popperInstance = createPopper(targetEl, popoverEl, {
        placement,
        modifiers: [
          checkPopperPlacement,
          {
            name: "offset",
            options: { offset },
          },
        ],
      });
    } else if (popperInstance) {
      popperInstance.destroy();
      popperInstance = undefined;
    }
  }

  const open = () => {
    isOpen = true;
    dispatch("open");
  };
  const close = () => {
    isOpen = false;
    dispatch("close");
  };
  const toggle = () => (isOpen = !isOpen);
  const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof Element) if (targetEl && isOpen) close();
  };

  onMount(() => {
    targetEl = document.getElementById(target)!;

    switch (trigger) {
      case "hover":
        targetEl.addEventListener("mouseover", open);
        targetEl.addEventListener("mouseleave", close);
        break;
      case "focus":
        targetEl.addEventListener("focus", open);
        targetEl.addEventListener("blur", close);
        break;
      default:
        targetEl.addEventListener("click", toggle);
        break;
    }

    return () => {
      switch (trigger) {
        case "hover":
          targetEl.removeEventListener("mouseover", open);
          targetEl.removeEventListener("mouseleave", close);
          break;
        case "focus":
          targetEl.removeEventListener("focus", open);
          targetEl.removeEventListener("blur", close);
          break;
        default:
          targetEl.removeEventListener("click", toggle);
          break;
      }
    };
  });

  $: if (!target)
    throw new Error("property 'target' is required! <Dropdown />");
</script>

{#if isOpen}
  <div
    bind:this={popoverEl}
    {...$$restProps}
    use:clickOutside={{ target: targetEl }}
    on:clickoutside={handleClickOutside}
    class="relative {className} z-20"
    in:fade={{ duration: 150 }}
  >
    <slot />
  </div>
{/if}
