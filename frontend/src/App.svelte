<script lang="ts">
  import Notifications from "svelte-notifications";
  import { Route } from "tinro";
  import LazyRoute from "./cmp/LazyRoute.svelte";
</script>

<Notifications>
  <div class="w-full min-h-screen bg-white relative flex flex-col">
    <Route>
      <!-- {#if $token} -->
      <LazyRoute path="/" component={() => import("./pages/Home")} />
      <LazyRoute path="/b/:id" component={() => import("./pages/Board")} />
      <Route fallback>Not found</Route>
      <!-- {:else} -->
      <LazyRoute
        path="/login"
        component={() => import("./pages/Login.svelte")}
      />
      <LazyRoute
        path="/register"
        component={() => import("./pages/Register.svelte")}
      />
      <!-- {/if} -->
    </Route>
    <!-- {#if loading}
    <div
      class="fixed z-50 inset(x-0 y-0) bg-white flex items-center justify-center"
    >
      <Spinner size="2.5rem" color="currentColor" class="text-blue-500!" />
    </div>
  {/if} -->
  </div>
</Notifications>

<style>
  :global(.notifications > div) {
    z-index: 999990;
  }
</style>
