<script lang="ts">
  import { closeModal, modalEscape } from "@/cmp/Widget/Modal.svelte";
  import X from "phosphor-svelte/lib/X";
  import { lists, selectedList } from "../store";
  import { css as styles } from "@/styles";
  import { getNotificationsContext } from "svelte-notifications";
  import { deleteList } from "@/api/list";
  import Spinner from "@/cmp/Spinner.svelte";

  const { addNotification } = getNotificationsContext();

  $: list = $selectedList;

  const emptySelectedList = () => {
    selectedList.set(null);
  };

  const closeThisModal = () => {
    emptySelectedList();
    closeModal();
  };

  let isSubmitting = false;

  const handleDeleteList = async () => {
    try {
      isSubmitting = true;
      await deleteList(list.id);

      $lists = $lists.filter((l) => l.id !== list.id);

      closeThisModal();
    } catch (e) {
      console.log(e);
      addNotification({
        position: "bottom-left",
        text: `Delete list failed! ${e.message}`,
        removeAfter: 3000,
        type: "danger",
      });
    } finally {
      isSubmitting = false;
    }
  };
</script>

<div
  class="relative p-4 text-gray-700"
  use:modalEscape
  on:modalclose={emptySelectedList}
>
  {#if list}
    <h3 class="text-lg font-bold">Delete list</h3>

    <button class="absolute top-5 right-5" on:click={closeThisModal}>
      <X weight="bold" />
    </button>

    <div class="mt-4 text-sm">
      <p>
        Are you sure want to delete this list permanently?
        <b>You can't undo this action</b>.
      </p>

      {#if list.tasks.length}
        <li class="list-disc">
          <b>{list.tasks.length} tasks</b> will be deleted!
        </li>
      {/if}
    </div>

    <div class="flex items-center justify-end mt-8">
      <button
        on:click={closeThisModal}
        class="py-2 px-3 bg-transparent font-medium text-gray-500 focus:(ring outline-none) rounded-md text-sm disabled:cursor-not-allowed"
        type="button"
        disabled={isSubmitting}
      >
        Cancel
      </button>

      <button
        on:click={handleDeleteList}
        class="{styles.button.red} ml-1 py-2 px-3 text-sm flex items-center"
        type="button"
        disabled={isSubmitting}
      >
        {#if isSubmitting}
          <Spinner class="mr-1" size="14" />
        {/if}
        Delete
      </button>
    </div>
  {/if}
</div>
