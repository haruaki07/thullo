<script lang="ts">
  import { router } from "tinro";
  import { token, user } from "@/store";
  import { css as style } from "@/styles";
  import TextInput from "@/cmp/TextInput.svelte";
  import Email from "phosphor-svelte/lib/EnvelopeSimple";
  import Key from "phosphor-svelte/lib/Key";
  import { tw, css } from "twind/css";
  import Spinner from "@/cmp/Spinner.svelte";
  import { login } from "@/api/auth";

  let loading = false;
  let msg = {
    visible: false,
    content: "",
  };
  let errors: {
    email?: string;
    password?: string;
  } = {};

  const values = { email: "john@gmail.com", password: "john123" };

  async function handleSubmit(e: Event) {
    errors = {};
    msg.visible = false;
    msg.content = "";
    loading = true;
    try {
      const data = await login(values);
      $token = data.token;
      $user = data.user;
      router.goto("/");
    } catch (e) {
      if (e.name && e.name === "ValidationError") {
        errors = e.details[0];
      } else {
        msg.visible = true;
        msg.content = e.message;
      }
    } finally {
      loading = false;
    }
  }
</script>

<div class="w-full h-screen flex items-center justify-center">
  <form on:submit|preventDefault={handleSubmit} class="w-11/12 sm:w-96">
    <div
      class="text-red-500 text-sm mb-4 font-medium {tw(
        css({ minHeight: '1.25rem' })
      )}"
    >
      {#if msg.visible}
        Login failed, {msg.content}
      {/if}
    </div>
    <TextInput
      type="email"
      bind:value={values.email}
      placeholder="E-Mail"
      withIcon
      required
      error={errors.email}
    >
      <span slot="icon"> <Email size="20px" /></span>
    </TextInput>
    <TextInput
      type="password"
      bind:value={values.password}
      placeholder="Password"
      withIcon
      error={errors.password}
      required
    >
      <span slot="icon"> <Key size="20px" /></span>
    </TextInput>
    <button
      type="submit"
      class="{style.button.blue} w-full text-center"
      disabled={loading}
    >
      {#if loading}
        <Spinner class="inline-block" />
      {/if}
      Login
    </button>
  </form>
</div>
