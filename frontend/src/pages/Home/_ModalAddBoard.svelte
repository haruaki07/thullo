<script lang="ts">
  import TextInput from "@/cmp/TextInput.svelte";
  import Lock from "phosphor-svelte/lib/Lock";
  import Image from "phosphor-svelte/lib/ImageSquare";

  import { css } from "@/styles";
  import UnsplashSearch from "@/cmp/Unsplash/UnsplashSearch.svelte";
  import { closeModal, modalEscape } from "@/cmp/Widget/Modal.svelte";
  import Visibility from "@/cmp/Visibility.svelte";
  import Dropdown from "@/cmp/Widget/Dropdown/_Dropdown.svelte";
  import { tw } from "twind";

  const btnCancelClassName = tw(
    "px-4 bg-transparent font-medium text-gray-500 w-1/2 md:w-auto mr-1 focus:(ring outline-none) rounded-md"
  );
</script>

<form on:submit|preventDefault class="relative p-4" use:modalEscape>
  <div class="bg-gray-300 w-full rounded-md h-24" />
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="my-3 block">
    <TextInput placeholder="Board title" required />
  </label>

  <div class="my-3 grid grid-cols-2 gap-3">
    <div class="relative w-full">
      <button
        id="unsplashDropdown"
        type="button"
        class="{css.button.gray} {css.button.icon} pl-4 font-medium w-full"
        title="Cover"
      >
        <Image weight="fill" />
        <span class="ml-1">Cover</span>
      </button>

      <Dropdown
        target="unsplashDropdown"
        placement="bottom-start"
        class="bg-white rounded-md shadow border w-64"
      >
        <UnsplashSearch />
      </Dropdown>
    </div>

    <div class="relative w-full">
      <button
        id="visibilityDropdown"
        type="button"
        class="{css.button.gray} {css.button.icon} pl-4 font-medium w-full"
        title="Visibility"
      >
        <Lock weight="fill" />
        <span class="ml-1">Private</span>
      </button>

      <Dropdown
        target="visibilityDropdown"
        placement="bottom-end"
        class="bg-white rounded-md shadow border w-64"
      >
        <Visibility />
      </Dropdown>
    </div>
  </div>

  <div class="w-full flex justify-end">
    <button type="button" class={btnCancelClassName} on:click={closeModal}>
      Cancel
    </button>
    <button type="submit" class="{css.button.blue} w-1/2 md:w-auto ml-1">
      Save
    </button>
  </div>
</form>
