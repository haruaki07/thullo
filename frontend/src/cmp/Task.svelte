<script lang="ts">
  import Chat from "phosphor-svelte/lib/Chat";
  import Clip from "phosphor-svelte/lib/Paperclip";
  import {
    modalDialogClass,
    modalContent,
    modalOpen,
  } from "./Widget/Modal.svelte";
  import ModalEditTask from "@/pages/Board/Modal/_ModalEditTask.svelte";
  import { selectedTask } from "@/pages/Board/store";
  import type { Task } from "@/api/types";

  export let task: Task;

  const openEditTaskModal = () => {
    selectedTask.set(task);
    modalOpen.set(true);
    modalContent.set(ModalEditTask);
    modalDialogClass.set("md:max-w-3xl mt-0!");
  };
</script>

<div class="rounded-lg bg-white shadow p-3 focus:outline-none text-left">
  <div on:click={openEditTaskModal} class="cursor-pointer">
    {#if task.cover}
      <div
        class="rounded-lg bg-gray-300 w-full h-24 mb-2"
        style="background-image: url('{task.cover}')"
      />
    {/if}
    <h4 class="font-medium text-lg mb-1">
      <slot name="title">{task.title}</slot>
    </h4>
  </div>
  {#if task.labels}
    <div class="-ml-1">
      {#each task.labels as label}
        <span
          class="inline-block rounded-lg text-xs font-medium py-0.5 px-2 ml-1 bg-{label}-100 text-{label}-500"
        >
          {label}
        </span>
      {/each}
    </div>
  {/if}
  <div class="flex items-center justify-between mt-2">
    <div class="grid grid-flow-col auto-cols-max gap-1">
      {#each task.members as m (m.id)}
        <div
          class="bg-gray-200 h-8 w-8 rounded-lg"
          style="background-image: {m.avatar ? `url(${m.avatar})` : 'none'}"
          title={m.name}
        />
      {/each}
    </div>
    <div class="flex items-center text-sm text-gray-500">
      <div>
        <span class="inline-block">
          <Chat weight="fill" mirrored />
        </span>
        2
      </div>
      <div class="ml-2">
        <span class="inline-block rotate-90">
          <Clip weight="fill" />
        </span>
        2
      </div>
    </div>
  </div>
</div>
