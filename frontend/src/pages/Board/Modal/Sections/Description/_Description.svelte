<script lang="ts">
  import Section from "@/cmp/Widget/Section";
  import FileText from "phosphor-svelte/lib/FileText";
  import PencilLine from "phosphor-svelte/lib/PencilLine";
  import { currentUserAdmin  } from "../../../store";

  export let value = "";

  let isEdit = false;
$:console.log($currentUserAdmin)
  const close = () => (isEdit = false);
  const save = () => {
    close();
  };
</script>

<Section title="Description">
  <svelte:fragment slot="icon">
    <FileText weight="fill" />
  </svelte:fragment>
  {#if !isEdit}
    <div class="-mt-2">
      {@html value}
    </div>

    {#if $currentUserAdmin}
    <button
      class="text(xs gray-400) flex items-center mt-0.5"
      on:click={() => (isEdit = true)}
      type="button"
    >
      <PencilLine />
      <span class="ml-1">Edit description</span>
    </button>
    {/if}
  {:else}
    <form on:submit|preventDefault id="editDescription">
      <textarea class="rounded-md border w-full p-1.5" bind:value />
      <button
        class="text(xs white) rounded-lg bg-green-600 py-1 px-3 inline-block"
        type="submit"
        formtarget="editDescription"
        on:click={save}
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
