<script lang="ts">
  import { tw } from "twind";
  import { css } from "twind/css";

  let height = tw(css({ height: "calc(100vh - 4rem)" }));

  export let wrapperClass = "";
  export let bodyClass = "";
</script>

<div class="w-full md:px-0 px-3 mt-16 {height} {wrapperClass}">
  <div class="container mx-auto flex flex-col h-full {bodyClass}">
    <slot />
  </div>
</div>
