<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import ListTitle from "./ListTitle.svelte";
  import Task from "./Task.svelte";
  import TaskAdd from "./TaskAdd.svelte";
  import { dndzone, TRIGGERS } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import type { Task as ITask } from "@/api/types";
  import { token } from "@/store";
  import { post, put } from "@/utils/request";
  import { meta } from "tinro";

  export let list: any;

  let tasks = [];

  function ondrag(e: any) {
    tasks = e.detail.items;
  }

  async function ondrop(e: any, listId: string) {
    if (e.detail.info.trigger === TRIGGERS.DROPPED_INTO_ZONE) {
      if (tasks.find((v) => v.id === e.detail.info.id).listId !== listId) {
        const id = e.detail.info.id;
        const data = {
          listId,
        };
        await put<typeof data, ITask>(`tasks/${id}`, data, $token);
      }
    }
    tasks = e.detail.items;
  }

  const router = meta();

  const getTasks = async () => {
    try {
      tasks = list.tasks as ITask[];
    } catch (e) {
      console.log(e);
    }
  };

  const addTask = async (e) => {
    try {
      const data = {
        boardId: $router.params.id,
        listId: list.id,
        title: e.detail.title,
        order: 4096,
      };
      const res = await post<typeof data, ITask & { id: string }>(
        "tasks",
        data,
        $token
      );
      res.id = res._id;
      delete res._id;
      tasks = [...tasks, res];
    } catch (e) {
      console.log(e);
    }
  };

  setContext("list", writable(list));
</script>

{#await getTasks() then _}
  <div class="w-64">
    <ListTitle />
    {#if !tasks.length}
      <TaskAdd on:submit={addTask} />
    {/if}
    <!-- TASKS LIST -->
    <div
      class="flex flex-col w-full space-y-5 pb-5 outline-none!"
      class:h-full={!tasks.length}
      use:dndzone={{
        items: tasks,
        flipDurationMs: 300,
      }}
      on:consider={ondrag}
      on:finalize={async (e) => await ondrop(e, list.id)}
    >
      {#each tasks as task (task.id)}
        <div animate:flip={{ duration: 300 }}>
          <Task {task} />
        </div>
      {/each}
    </div>
    {#if tasks.length}
      <TaskAdd on:submit={addTask} />
    {/if}
  </div>
{/await}
