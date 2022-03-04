<script lang="ts">
  import { addTask } from "@/api/tasks";
  import type { ListWithTasks } from "@/api/types";
  import { css } from "@/styles";
  import Plus from "phosphor-svelte/lib/Plus";
  import { createEventDispatcher, getContext } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import type { Writable } from "svelte/store";
  import { meta } from "tinro";
  import Spinner from "./Spinner.svelte";

  let isShow = false;
  let value = "";
  let inputEl: HTMLInputElement;
  export let haveNoTasks = false;

  const router = meta();
  const list = getContext("list") as Writable<ListWithTasks>;
  const { addNotification } = getNotificationsContext();

  const dispatch = createEventDispatcher();
  const btnClassName = `${css.button.blue} ${css.button.icon} justify-between  px-3! text(sm left blue-600!) bg-blue-200! w-full font-semibold focus:(ring-opacity-10) mb-16`;

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
      const lastTask = $list.tasks[$list.tasks.length - 1];

      const data = {
        boardId: $router.params.id,
        listId: $list.id,
        title: value,
        order: lastTask ? lastTask.order + 1024 : 4096,
      };
      const newTask = await addTask(data);

      $list.tasks = [...$list.tasks, newTask];

      handleCancel(); // close
      dispatch("add", { task: newTask });
    } catch (e) {
      console.log(e);
      addNotification({
        position: "bottom-left",
        text: `Add task failed! ${e.message}`,
        removeAfter: 3000,
        type: "danger",
      });
    } finally {
      isSubmitting = false;
    }
  };

  $: isShow && inputEl && inputEl.focus();
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
      class="text(xs white) rounded-lg bg-green-600 py-1 px-3 inline-block disabled:(bg-green-400 cursor-not-allowed)"
      type="submit"
      formtarget="addTask"
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
      on:click={handleCancel}
      disabled={isSubmitting}
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
