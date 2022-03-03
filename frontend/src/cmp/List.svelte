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
  let movedTaskIdx: number = null;

  function ondrag(e: any) {
    if (movedTaskIdx === null) {
      movedTaskIdx = tasks.findIndex((t) => t.id === e.detail.info.id);
    }
    tasks = e.detail.items;
  }

  async function ondrop(e: any, listId: string) {
    const newTasksOrder = e.detail.items as any[];

    if (e.detail.info.trigger === TRIGGERS.DROPPED_INTO_ZONE) {
      const id = e.detail.info.id;
      const newPosIdx = newTasksOrder.findIndex((t) => t.id === id);

      const isDifferentList =
        tasks.find((v) => v.id === e.detail.info.id).listId !== listId;
      const isSameIdxDifferentList =
        newPosIdx === movedTaskIdx && isDifferentList;
      const isDifferentIdxAndList =
        newPosIdx !== movedTaskIdx && !isDifferentList;

      if (isDifferentList || isSameIdxDifferentList || isDifferentIdxAndList) {
        const data = {
          listId,
        } as { listId: string; order: number };

        switch (newPosIdx) {
          case 0: // top
            const after = newTasksOrder[newPosIdx + 1];

            // check if list empty or not
            if (after) {
              data.order = after.order / 2;
            } else {
              data.order = 4096;
            }

            break;
          case tasks.length - 1: // bottom
            data.order = newTasksOrder[newTasksOrder.length - 1].order + 1024;
            break;
          default:
            // middle
            const el = {
              before: newTasksOrder[newPosIdx - 1].order,
              after: newTasksOrder[newPosIdx + 1].order,
            };

            data.order = (el.before + el.after) / 2;
            break;
        }

        await put<typeof data, ITask>(`tasks/${id}`, data, $token);
      }
    }

    tasks = newTasksOrder;
    movedTaskIdx = null;
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
      const lastTask = tasks[tasks.length - 1];

      const data = {
        boardId: $router.params.id,
        listId: list.id,
        title: e.detail.title,
        order: lastTask ? lastTask.order + 1024 : 4096,
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
      <TaskAdd on:submit={addTask} haveNoTasks={!tasks.length} />
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
      <TaskAdd on:submit={addTask} haveNoTasks={!tasks.length} />
    {/if}
  </div>
{/await}
