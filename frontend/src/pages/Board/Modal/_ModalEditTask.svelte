<script lang="ts">
  import X from "phosphor-svelte/lib/X";
  import { closeModal, modalEscape } from "@/cmp/Widget/Modal.svelte";
  import { css } from "@/styles";
  import Actions from "./Sections/Actions";
  import Attachment from "./Sections/Attachment";
  import Comments from "./Sections/Comments";
  import Description from "./Sections/Description";
  import { selectedTask } from "../store";

  const closeThisModal = () => {
    selectedTask.set(null);
    closeModal();
  };

  $: task = $selectedTask;
</script>

<div class="relative p-4" use:modalEscape>
  {#if task}
    <button
      type="button"
      class="{css.button.blue} absolute top-2 right-2 p-1!"
      on:click={closeThisModal}
    >
      <X weight="bold" />
    </button>
    <div class="bg-gray-300 w-full rounded-md h-32 mb-3" />
    <div class="flex flex-col md:flex-row md:space-x-4">
      <div class="md:w-2/3 w-full">
        <h2 class="font-medium text(lg gray-800)">{task.title}</h2>
        <p class="text(sm gray-800)">
          in list <b>Backlog😠</b>
        </p>
        <Description value={task.description} />
        <Attachment />
        <Comments />
      </div>
      <div class="md:w-1/3 w-full">
        <Actions />
      </div>
    </div>
  {/if}
</div>
