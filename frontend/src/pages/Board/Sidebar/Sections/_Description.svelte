<script lang="ts">
  import { Section } from "@/cmp/Widget";
  import { token } from "@/store";
  import { put } from "@/utils/request";
  import FileText from "phosphor-svelte/lib/FileText";
  import PencilLine from "phosphor-svelte/lib/PencilLine";
  import { meta } from "tinro";
  import { board, currentUserAdmin } from "../../store";
  import type { Board } from "@/api/types";

  export let description = "";
  let edited = "";

  let isEdit = false;

  const close = () => (isEdit = false);
  const open = () => {
    isEdit = true;
    edited = description;
  };

  const router = meta();

  type IEditDescription = { description: string };

  const updateDescription = async () => {
    try {
      const data = await put<IEditDescription, Board>(
        `boards/${$router.params.id}`,
        { description: edited },
        $token
      );
      $board.description = data.description;
      edited = "";
      close();
    } catch (e) {
      console.log(e);
    }
  };
</script>

<Section title="Description">
  <svelte:fragment slot="icon">
    <FileText weight="fill" />
  </svelte:fragment>
  {#if !isEdit}
    <div class="-mt-2">
      {@html description}
    </div>
    {#if $currentUserAdmin}
      <button
        class="text(xs gray-400) flex items-center mt-0.5"
        on:click={open}
        type="button"
      >
        <PencilLine />
        <span class="ml-1">Edit</span>
      </button>
    {/if}
  {:else}
    <form on:submit|preventDefault={updateDescription} id="editDescription">
      <textarea class="rounded-md border w-full p-1.5" bind:value={edited} />
      <button
        class="text(xs white) rounded-lg bg-green-600 py-1 px-3 inline-block"
        type="submit"
        formtarget="editDescription"
      >
        Save
      </button>
      <button
        class="text(xs gray-500) rounded-lg bg-transparent py-1 px-3"
        type="button"
        on:click={close}
      >
        Cancel
      </button>
    </form>
  {/if}
</Section>
