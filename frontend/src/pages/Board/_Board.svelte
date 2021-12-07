<script lang="ts">
  import Container from "@/cmp/Container.svelte";
  import DotsThree from "phosphor-svelte/lib/DotsThree";
  import Plus from "phosphor-svelte/lib/Plus";
  import { css as style } from "@/styles";
  import Visibility from "@/cmp/Visibility.svelte";
  import NavbarBoard from "./_Navbar.svelte";
  import List from "@/cmp/List.svelte";
  import SidebarContent from "./Sidebar/_Content.svelte";
  import { meta } from "tinro";
  import { board } from "./store";
  import {
    AddMember,
    Dropdown,
    Modal,
    Sidebar,
    VisibilityButton,
  } from "@/cmp/Widget";
  import { getBoardDetails } from "@/api/boards";
  import { get } from "@/utils/request"
  import { getToken } from "@/store"

  const btnGrayClassName = `${style.button.gray} ${style.button.icon} py-2 px-3! font-medium text-sm`;

  const router = meta();

  type List = {
    id: string
  }

  const getBoardContents = async () => {
    try {
      const blk = await get(`/boards/${$router.params.id}/bulk`, getToken()) as List[];
      return blk;
    } catch (e) {
      console.log(e)
    }
  }

  const getBoard = async () => {
    try {
      const res = await getBoardDetails($router.params.id);
      board.set(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  };
</script>

{#await getBoard() then _}
  <NavbarBoard boardTitle={$board.title} />

  <Container wrapperClass="relative overflow-hidden">
    <div
      class="flex flex-wrap w-full items-center justify-between my-2 mt-1 sm:(my-4!)"
    >
      <div class="flex items-center">
        <div class="relative">
          <VisibilityButton
            class="mr-3"
            title="Visibility"
            id="btnChangeVisibility"
            isPublic={$board.isPublic}
          />
          <Dropdown
            target="btnChangeVisibility"
            placement="bottom-start"
            class="bg-white rounded-md shadow border w-64"
          >
            <Visibility />
          </Dropdown>
        </div>
        <div class="grid grid-flow-col auto-cols-max gap-3">
          {#each $board.members as m}
            <button
              class="{style.button.gray} p-0! h-9 w-9"
              title={m.userId.name}
            />
          {/each}
          <div class="relative">
            <button
              id="btnAddBoardMember"
              class="{style.button
                .blue} flex items-center justify-center p-0! h-9 w-9"
            >
              <Plus size="24px" weight="bold" />
            </button>
            <Dropdown
              target="btnAddBoardMember"
              placement="bottom-start"
              class="bg-white rounded-md shadow border w-64"
            >
              <AddMember />
            </Dropdown>
          </div>
        </div>
      </div>
      <button class={btnGrayClassName} id="btnShowMenu">
        <DotsThree size="24px" weight="bold" />
        <span class="ml-2">Show menu</span>
      </button>
    </div>

    <div
      class="bg-indigo-50 w-full flex-grow relative rounded-lg mb-3 overflow-auto p-3 md:p6 flex"
    >
      <div class="grid grid-flow-col auto-cols-max gap-8">
        {#await getBoardContents()}
          loading
        {:then lists}
          {#each lists as list (list.id)}
            <List {list} />
          {/each}
        {/await}
      </div>
    </div>
    <Sidebar target="btnShowMenu">
      <SidebarContent />
    </Sidebar>
  </Container>

  <Modal />
{/await}
