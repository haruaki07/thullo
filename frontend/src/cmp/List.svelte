<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import ListTitle from "./ListTitle.svelte";
  import Task from "./Task.svelte";
  import TaskAdd from "./TaskAdd.svelte";
  import { dndzone, TRIGGERS } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { meta } from "tinro";
  import * as apiTask from "@/api/tasks";
  import type { ListDndEvent } from "@/types";
  import type { ListWithTasks, Task as ITask } from "@/api/types";

  export let list: ListWithTasks;

  let tasks = list.tasks;
  let movedTaskIdx: number = null;

  $: MovedTo = {
    Top: 0,
    Bottom: tasks.length - 1,
  };

  function ondrag(e: ListDndEvent) {
    if (movedTaskIdx === null) {
      movedTaskIdx = tasks.findIndex((t) => t.id === e.detail.info.id);
    }
    tasks = e.detail.items;
  }

  async function ondrop(e: ListDndEvent, listId: string) {
    const newTasksOrder = e.detail.items;

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
          case MovedTo.Top:
            const after = newTasksOrder[newPosIdx + 1];

            // check if list empty or not
            if (after) {
              data.order = after.order / 2;
            } else {
              data.order = 4096;
            }

            break;
          case MovedTo.Bottom:
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

        await apiTask.updateTask(id, data);
      }
    }

    tasks = newTasksOrder;
    movedTaskIdx = null;
  }

  const router = meta();

  const addTask = async (e: Event & { detail: { task: ITask } }) => {
    tasks = [...tasks, e.detail.task];
  };

  setContext("list", writable(list));

  $: if (tasks?.length) list.tasks = tasks;
</script>

<div class="w-64">
  <ListTitle />
  {#if !tasks.length}
    <TaskAdd on:add={addTask} haveNoTasks={!tasks.length} />
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
    <TaskAdd on:add={addTask} haveNoTasks={!tasks.length} />
  {/if}
</div>
