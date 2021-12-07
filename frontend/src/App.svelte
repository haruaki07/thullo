<script lang="ts">
  import { Route, router } from "tinro";
  import { token, user } from "./store";
  import LazyRoute from "./cmp/LazyRoute.svelte";
  import { networkError } from "./utils/request";
  import { onMount } from "svelte";
  import { checkAuth } from "./api/auth";
  import Spinner from "./cmp/Spinner.svelte";

  let loading = true;

  onMount(async () => {
    if (!$token) {
      loading = false;
      router.goto("/login");
      return;
    }
    try {
      let me = await checkAuth();
      $user = me;
    } catch (e) {
      if (networkError(e)) {
        alert("an error ocurred. can't connect to server");
        $token = "";
        router.goto("/login");
      }
    } finally {
      loading = false;
    }
  });
</script>

<div class="w-full min-h-screen bg-white relative flex flex-col">
  <Route>
    {#if $token}
      <LazyRoute path="/" component={() => import("./pages/Home")} />
      <LazyRoute path="/b/:id" component={() => import("./pages/Board")} />
      <Route fallback>Not found</Route>
    {:else}
      <LazyRoute
        path="/login"
        component={() => import("./pages/Login.svelte")}
      />
      <LazyRoute
        path="/register"
        component={() => import("./pages/Register.svelte")}
      />
      <Route fallback>
        <a href="/login">Login</a>
        or
        <a href="/register">Register</a>
      </Route>
    {/if}
  </Route>
  {#if loading}
    <div
      class="fixed z-50 inset(x-0 y-0) bg-white flex items-center justify-center"
    >
      <Spinner size="2.5rem" color="currentColor" class="text-blue-500!" />
    </div>
  {/if}
</div>
