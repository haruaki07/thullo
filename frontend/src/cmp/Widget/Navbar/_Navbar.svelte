<script lang="ts">
  import { router } from "tinro";
  import { token, user } from "@/store";
  import User from "phosphor-svelte/lib/User";
  import EnvelopeSimple from "phosphor-svelte/lib/EnvelopeSimple";
  import SignOut from "phosphor-svelte/lib/SignOut";
  import CaretDown from "phosphor-svelte/lib/CaretDown";
  import Dropdown from "../Dropdown";
  import { DropdownDivider, DropdownLink, DropdownMenu } from "../DropdownMenu";
  import { post } from "@/utils/request";

  async function logout() {
    try {
      await post("logout", false, $token);
      $token = "";
      $user = null;
      router.goto("/login");
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div
  class="w-full bg-white md:px-0 px-3 border-b border-gray-200 fixed top-0 z-50"
>
  <div class="container mx-auto py-3.5 flex items-center">
    <a href="/" class="font-medium text-lg">Thullo</a>
    <slot name="center" />
    <div class="ml-auto flex items-center">
      <slot name="right" />
      <div class="relative">
        <button
          class="text-gray-600 outline-none flex items-center  font-bold focus:(outline-none)"
          id="btnNavDropdown"
        >
          <div class="bg-gray-200 w-7 h-7 rounded-md mr-2" />
          <span class="mr-2 hidden sm:block">{$user?.name}</span>
          <CaretDown weight="fill" />
        </button>
        <Dropdown
          target="btnNavDropdown"
          placement="bottom-end"
          class="bg-white rounded-md shadow border w-48"
        >
          <DropdownMenu>
            <DropdownLink let:className>
              <a href="/profile" class="dropdown-link {className}">
                <User size="18px" />
                <span class="ml-2">My Profile</span>
              </a>
            </DropdownLink>
            <DropdownLink let:className>
              <a href="/invitations" class="dropdown-link {className}">
                <EnvelopeSimple size="18px" />
                <span class="ml-2">Invitations</span>
              </a>
            </DropdownLink>
            <DropdownDivider />
            <DropdownLink let:className>
              <button
                type="button"
                class="{className} text-red-600 dropdown-link"
                on:click={logout}
              >
                <SignOut size="18px" />
                <span class="ml-2">Logout</span>
              </button>
            </DropdownLink>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </div>
</div>
