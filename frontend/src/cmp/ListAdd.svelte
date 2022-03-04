<script lang="ts">
  import { css } from "@/styles";
  import Plus from "phosphor-svelte/lib/Plus";
  import { board, lists } from "@/pages/Board/store";
  import { addList } from "@/api/list";
  import type { ListWithTasks } from "@/api/types";
  import { getNotificationsContext } from "svelte-notifications";
  import Spinner from "./Spinner.svelte";

  let isShow = false;
  let value = "";
  let inputEl: HTMLInputElement;
  export let haveNoList = false;

  const btnClassName = `${css.button.blue} ${css.button.icon} justify-between  px-3! text(sm left blue-600!) bg-blue-200! w-full font-semibold focus:(ring-opacity-10) mb-16`;

  const { addNotification } = getNotificationsContext();

  const handleCancel = () => {
    value = "";
    isShow = false;
  };

  const handleShow = () => {
    isShow = true;
  };

  let isSubmitting = false;

  const handleSubmit = async () => {
    try {
      isSubmitting = true;
      const list = (await addList({
        boardId: $board.id,
        title: value,
      })) as ListWithTasks;

      list.tasks = [];
      $lists = [...$lists, list];

      handleCancel(); // close
    } catch (e) {
      console.log(e);
      addNotification({
        position: "bottom-left",
        text: `Add list failed! ${e.message}`,
        removeAfter: 3000,
        type: "danger",
      });
    } finally {
      isSubmitting = false;
    }
  };

  $: isShow && inputEl && inputEl.focus();
</script>

<div class="w-64 children:w-full">
  {#if isShow}
    <form
      class="mb-5 bg-white shadow rounded-lg p-3"
      on:submit|preventDefault={handleSubmit}
      id="addList"
    >
      <!-- svelte-ignore a11y-autofocus -->
      <input
        type="text"
        placeholder="List title..."
        class="block border-0 focus:(ring-0) text-sm w-full px-0"
        required
        bind:value
        bind:this={inputEl}
      />
      <button
        class="text(xs white) rounded-lg bg-green-600 py-1 px-3 inline-block disabled:(bg-green-400 cursor-not-allowed)"
        type="submit"
        formtarget="addList"
        disabled={isSubmitting}
      >
        {#if isSubmitting}
          <Spinner size="10" class="inline-block mr-1 mb-1" />
        {/if}
        Save
      </button>
      <button
        class="text(xs gray-500) rounded-lg bg-transparent py-1 px-3 disabled:cursor-not-allowed"
        type="button"
        disabled={isSubmitting}
        on:click={handleCancel}
      >
        Cancel
      </button>
    </form>
  {:else}
    <button type="button" class={btnClassName} on:click={handleShow}>
      <span>
        {haveNoList ? "Add new list" : "Add another list"}
      </span>
      <Plus />
    </button>
  {/if}
</div>
