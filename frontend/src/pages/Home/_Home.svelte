<script lang="ts">
  import Navbar from "@/cmp/Widget/Navbar";
  import { css as style } from "@/styles";
  import Plus from "phosphor-svelte/lib/Plus";
  import Container from "@/cmp/Container.svelte";
  import ModalAddBoard from "./_ModalAddBoard.svelte";
  import Modal, {
    modalDialogClass,
    modalContent,
    modalOpen,
  } from "@/cmp/Widget/Modal.svelte";
  import SearchInput from "@/cmp/Widget/SearchInput";
  import { onMount } from "svelte";
  import { boards } from "@/store";
  import { getBoards } from "@/api/boards";

  const btnAddClassName = `${style.button.blue} ${style.button.icon} text-sm px-2`;
  const openModal = () => {
    modalOpen.set(true);
    modalContent.set(ModalAddBoard);
    modalDialogClass.set("sm:max-w-md");
  };

  onMount(async () => {
    try {
      const res = await getBoards();
      boards.set(res);
    } catch (e) {
      console.log(e);
    }
  });
</script>

<Navbar>
  <div slot="right" class="mr-10 w-72 hidden sm:block">
    <SearchInput inputClass="py-1.5!" />
  </div>
</Navbar>

<Container>
  <div
    class="flex flex-wrap w-full items-center justify-between my-2 mt-1 sm:(my-4!)"
  >
    <h2 class="font-medium text-gray-800 text-lg uppercase">My Boards</h2>
    <button on:click={openModal} type="button" class={btnAddClassName}>
      <Plus />
      <span class="ml-1">Add Board</span>
    </button>
  </div>

  <div
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 mb-3"
  >
    {#each $boards as b}
      <a class="w-full rounded-lg shadow p-2 bg-white" href="/b/{b.id}">
        {#if b.cover}
          <div class="rounded-lg bg-gray-200 w-full h-28" />
        {/if}
        <h4 class="text-sm md:text-base font-medium text-gray-600 my-2">
          {b.title}
        </h4>
        <div class="flex flex-wrap">
          {#each b.members as m}
            <div class="w-10 h-10 bg-blue-300 rounded-lg mr-1" title={m.name} />
          {/each}
        </div>
      </a>
    {:else}
      No result
    {/each}
  </div>
</Container>

<Modal />
