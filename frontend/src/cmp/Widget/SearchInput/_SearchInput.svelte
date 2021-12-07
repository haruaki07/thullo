<script lang="ts">
  import { css } from "@/styles";

  export let value = "";
  let className = "";
  export { className as class };
  export let inputClass = "";
  export let btnClass = "";
  export let withIcon = false;
  export let placeholder = "Keywords..";

  $: btnClassName = !withIcon ? "py-1.5 top-3-px text-xs" : "top-1";
  $: inputClassName = !withIcon ? "py-1.5! pr-17!" : "pr-12!";
</script>

<div class="relative {className}">
  <input
    type="text"
    bind:value
    class="rounded-md shadow w-full p-2 text-sm border-transparent {inputClass} {inputClassName}"
    {placeholder}
  />
  <button
    type="button"
    class="{`${css.button.blue} ${css.button.icon} ${btnClass}`} absolute px-3! right-1 {btnClassName}"
  >
    <slot name="btn">Search</slot>
  </button>
</div>
