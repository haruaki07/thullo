<script lang="ts">
  import { tw } from "twind";

  import { css } from "@/styles";

  const btnSendClassName = tw`${css.button.blue} py-1.5! px-4! text-sm float-right mt-2`;
</script>

<div class="shadow border rounded-md bg-white w-full p-2 flex items-start">
  <div class="bg-gray-300 w-8 h-8 rounded-md mr-2" />
  <form class="w-full" on:submit|preventDefault>
    <textarea
      rows="2"
      class="border-0 focus:(ring-0) block w-full p-1 md:text-base text-sm"
      placeholder="Write a comment.."
      required
    />
    <button class={btnSendClassName} type="submit">Send</button>
    <div class="clear-both" />
  </form>
</div>
