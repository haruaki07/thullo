<script lang="ts">
  import Section from "@/cmp/Widget/Section";
  import Gear from "phosphor-svelte/lib/Gear";
  import { css } from "@/styles";
  import Image from "phosphor-svelte/lib/ImageSquare";
  import Tag from "phosphor-svelte/lib/TagSimple";
  import Plus from "phosphor-svelte/lib/Plus";
  import Trash from "phosphor-svelte/lib/TrashSimple";
  import { tw } from "twind";

  const btnActionClassName = tw`${css.button.gray} ${css.button.icon} pl-3 font-medium w-full text-sm mb-2`;
</script>

<Section title="Actions">
  <svelte:fragment slot="icon">
    <Gear weight="fill" />
  </svelte:fragment>
  <button type="button" class={btnActionClassName} title="Change cover">
    <Image weight="fill" />
    <span class="ml-2">Cover</span>
  </button>
  <button type="button" class={btnActionClassName} title="Add labels">
    <Tag weight="fill" />
    <span class="ml-2">Labels</span>
  </button>
  <button type="button" class={btnActionClassName} title="Add members">
    <Plus weight="fill" />
    <span class="ml-2">Members</span>
  </button>
  <button
    type="button"
    class="border-red-500 border py-2 px-8 pl-3 rounded-md text-red-500 focus:(ring ring-red-200 outline-none) flex items-center text-sm w-full"
    title="Add members"
  >
    <Trash weight="fill" />
    <span class="ml-2">Delete</span>
  </button>
</Section>
