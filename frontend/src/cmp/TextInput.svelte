<script lang="ts">
  import { onMount } from "svelte";

  import { css as style } from "@/styles";
  import { css } from "twind/css";
  import { tw } from "twind";

  export let value: string | number = "";
  export let type = "text";
  export let error = "";
  export let withIcon = false;
  let className = "";
  export { className as class };
  let inputEl: HTMLInputElement;

  function handleInput(
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) {
    if (e.target instanceof HTMLInputElement) {
      switch (type) {
        case "number":
        case "range":
          value = +e.target.value;
          break;
        default:
          value = e.target.value;
          break;
      }
    }
  }

  onMount(() => {
    inputEl.type = type;
  });
</script>

<div class="relative w-full mb-4">
  <input
    bind:this={inputEl}
    bind:value
    class="{withIcon && style.input.icon} {style.input
      .DEFAULT} {className} w-full"
    class:border-red-500={error}
    {...$$restProps}
    on:change={(e) => type === "range" && handleInput(e)}
    on:input={(e) => type !== "file" && handleInput(e)}
  />
  {#if error}
    <span class="text-sm text-red-500 font-medium">{error}</span>
  {/if}
  <div class="absolute {tw(css({ top: '11px', left: '9px' }))} text-gray-700">
    <slot name="icon" />
  </div>
</div>
