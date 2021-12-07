<script lang="ts">
  import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
  import { css } from "@/styles";
  import SearchInput from "../SearchInput";
  import UserList from "./_UserList.svelte";

  let selectedUsers: string[] = [];
</script>

<div class="p-3">
  <SearchInput class="mb-3" withIcon placeholder="Search E-mail..">
    <svelte:fragment slot="btn">
      <MagnifyingGlass size="14px" />
    </svelte:fragment>
  </SearchInput>
  <UserList bind:selected={selectedUsers} />
  {#if selectedUsers.length}
    <button type="button" class="{css.button.blue} text-sm w-full mt-3">
      Invite
    </button>
  {/if}
</div>
