<script lang="ts">
  import { Route } from "tinro";
  import LazyCmp from "./LazyCmp.svelte";

  export let path: string;
  export let component: any;
</script>

<Route {path} {...$$restProps}>
  <LazyCmp {component} />
</Route>
