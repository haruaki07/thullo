<script lang="ts">
  import { renameList } from "@/api/list";
  import type { ListWithTasks } from "@/api/types";
  import DotsThree from "phosphor-svelte/lib/DotsThree";
  import { getContext } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import TextInput from "./TextInput.svelte";
  import {
    Dropdown,
    DropdownDivider,
    DropdownLink,
    DropdownMenu,
  } from "./Widget";
  import type { Writable } from "svelte/store";
  import {
    modalContent,
    modalDialogClass,
    modalOpen,
  } from "./Widget/Modal.svelte";
  import ModalDeleteList from "@/pages/Board/Modal/_ModalDeleteList.svelte";
  import { selectedList } from "@/pages/Board/store";

  const list = getContext("list") as Writable<ListWithTasks>;

  const { addNotification } = getNotificationsContext();

  let dropdownIsOpen: boolean;
  let isSubmitting = false;
  let isRenaming = false;
  let listTitle: string = $list.title;

  const handleRename = async () => {
    try {
      isSubmitting = true;
      const updatedList = await renameList($list.id, {
        title: listTitle,
      });

      list.set(Object.assign($list, updatedList));
    } catch (e) {
      console.log(e);
      addNotification({
        type: "danger",
        position: "bottom-left",
        text: `Rename failed! ${e.message}`,
        removeAfter: 3000,
      });
    } finally {
      isSubmitting = false;
      isRenaming = false;
      dropdownIsOpen = false;
    }
  };

  const openDeleteListModal = () => {
    dropdownIsOpen = false;
    selectedList.set($list);
    modalOpen.set(true);
    modalContent.set(ModalDeleteList);
    modalDialogClass.set("sm:max-w-md");
  };
</script>

<div class="flex items-center justify-between font-semibold mb-3">
  <span class="truncate">{$list.title}</span>
  <div class="relative">
    <button
      type="button"
      title="Menu"
      class="text-gray-500"
      id="btnMenuList{$list.id}"
    >
      <DotsThree size="24px" weight="bold" />
    </button>
    <Dropdown
      target="btnMenuList{$list.id}"
      placement="bottom-end"
      class="bg-white rounded-md shadow border w-52"
      bind:isOpen={dropdownIsOpen}
      on:close={() => {
        isRenaming = false;
      }}
    >
      <DropdownMenu>
        {#if isRenaming}
          <form on:submit|preventDefault={handleRename} class="w-full">
            <TextInput
              autofocus
              bind:value={listTitle}
              required
              class="p-1 text-sm"
              placeholder="Rename list..."
            />
            <div class="-mt-2">
              <button
                type="submit"
                class="text(xs white) rounded-lg bg-green-600 py-1 px-3 inline-block disabled:(bg-green-300 cursor-not-allowed)"
                disabled={isSubmitting}
              >
                Save
              </button>

              <button
                type="button"
                on:click={() => (isRenaming = false)}
                class="text(xs gray-500) rounded-lg bg-transparent py-1 px-3 disabled:(cursor-not-allowed)"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        {:else}
          <DropdownLink let:className>
            <button
              type="button"
              class={className}
              on:click={() => (isRenaming = true)}
            >
              Rename
            </button>
          </DropdownLink>
          <DropdownDivider />
          <DropdownLink let:className>
            <button
              type="button"
              class="{className} text-red-600"
              on:click={openDeleteListModal}
            >
              Delete
            </button>
          </DropdownLink>
        {/if}
      </DropdownMenu>
    </Dropdown>
  </div>
</div>
