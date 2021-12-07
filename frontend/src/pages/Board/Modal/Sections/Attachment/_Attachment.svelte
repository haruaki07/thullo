<script lang="ts">
  import Section from "@/cmp/Widget/Section";
  import FileText from "phosphor-svelte/lib/FileText";
  import Plus from "phosphor-svelte/lib/Plus";
  import { tw } from "twind";

  const btnActionClassName = (color: string) =>
    tw`border-${color}-500 border py-0.5 ml-auto px-1.5 rounded-md text-${color}-500 focus:(ring ring-${color}-200 outline-none) text-xs inline-block`;
</script>

<Section title="Attachment">
  <svelte:fragment slot="icon">
    <FileText weight="fill" />
  </svelte:fragment>
  <div class="-mt-2">
    <div class="flex items-center mb-2">
      <div
        class="rounded-md bg-gray-200 w-16 h-16 flex-shrink-0 group overflow-hidden"
      >
        <div
          class="bg(black opacity-20) invisible text(xs white) font-medium group-hover:visible flex items-center justify-center h-full w-full"
        >
          1 MB
        </div>
      </div>
      <div class="flex-grow truncate ml-2">
        <span class="text(sm gray-500) leading-none">
          {new Date().toUTCString()}
        </span>
        <p class="text(sm gray-700) font-semibold leading-none">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          facere.
        </p>
        <button class={btnActionClassName("gray")} type="button">
          Download
        </button>
        <button class={btnActionClassName("red")} type="button">
          Delete
        </button>
      </div>
    </div>
  </div>
  <button class="text(xs gray-400) flex items-center" type="button">
    <Plus />
    <span class="ml-1">Add attachment</span>
  </button>
</Section>
