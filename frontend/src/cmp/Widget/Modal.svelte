<script context="module" lang="ts">
  import { writable } from "svelte/store";

  export const modalContent = writable<any>(null);
  export const modalContentProps = writable<any>({});
  export const modalOpen = writable(false);
  export const modalDialogClass = writable("");

  export function closeModal() {
    modalOpen.set(false);
    modalDialogClass.set("");
    modalContent.set(null);
    modalContentProps.set({});
  }

  export function modalEscape(_node: HTMLElement) {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        modalContent.set(null);
        modalOpen.set(false);
      }
    };

    document.addEventListener("keydown", handleEscape, false);

    return {
      destroy() {
        document.removeEventListener("keydown", handleEscape, false);
      },
    };
  }
</script>

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { css } from "twind/css";
  import { tw } from "twind";
  import { onDestroy } from "svelte";

  const modalStyle = `${tw(
    css({
      overscrollBehaviorY: "contain",
      scrollbarWidth: "none",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: 0,
      },
    })
  )} fixed inset-0 flex items-start justify-center p-3 z-50 bg-black bg-opacity-25`;

  onDestroy(() => {
    $modalOpen && closeModal();
  });
</script>

{#if $modalOpen}
  <div class={modalStyle}>
    <div
      class="absolute inset-0"
      transition:fade={{ duration: 150 }}
      on:click={closeModal}
    />
    <div
      class="bg-white w-full shadow relative z-10 rounded-md {$modalDialogClass} mt-12"
      transition:fly={{ y: -50, duration: 150 }}
    >
      <svelte:component this={$modalContent} {...$modalContentProps} />
    </div>
  </div>
{/if}
