<script lang="ts">
  import { css } from "@/styles";
  import Plus from "phosphor-svelte/lib/Plus";
  import { createEventDispatcher } from "svelte";

  let isShow = false;
  let value = "";
  let inputEl: HTMLInputElement;
  export let haveNoTasks = false;


  const dispatch = createEventDispatcher();
  const btnClassName = `${css.button.blue} ${css.button.icon} justify-between  px-3! text(sm left blue-600!) bg-blue-200! w-full font-semibold focus:(ring-opacity-10) mb-16`;

  const handleCancel = () => {
    value = "";
    isShow = false;
  };

  const handleShow = () => {
    isShow = true;
  };

  const handleSubmit = () => {
    dispatch("submit", { title: value });
    handleCancel(); // close
  };

  $: isShow && inputEl && inputEl.focus()
</script>

{#if isShow}
  <form
    class="mb-5 bg-white shadow rounded-lg p-3"
    on:submit|preventDefault={handleSubmit}
    id="addTask"
  >
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      placeholder="Title..."
      class="block border-0 focus:(ring-0) text-sm w-full px-0"
      required
      bind:value
      bind:this={inputEl}
    />
    <button
      class="text(xs white) rounded-lg bg-green-600 py-1 px-3 inline-block"
      type="submit"
      formtarget="addTask"
    >
      Save
    </button>
    <button
      class="text(xs gray-500) rounded-lg bg-transparent py-1 px-3"
      type="button"
      on:click={handleCancel}
    >
      Cancel
    </button>
  </form>
{:else}
  <button type="button" class={btnClassName} on:click={handleShow}>
    <span>Add {haveNoTasks ? "new" : "another"} task</span>
    <Plus />
  </button>
{/if}
