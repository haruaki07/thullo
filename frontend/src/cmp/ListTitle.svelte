<script lang="ts">
  import DotsThree from "phosphor-svelte/lib/DotsThree";
  import { getContext } from "svelte";
  import {
    Dropdown,
    DropdownDivider,
    DropdownLink,
    DropdownMenu,
  } from "./Widget";

  const list = getContext("list") as any;
</script>

<div class="flex items-center justify-between font-semibold mb-3">
  <span>{$list.title}</span>
  <div class="relative">
    <button
      type="button"
      title="Menu"
      class="text-gray-500"
      id="btnMenuList{$list.id}"
    >
      <DotsThree size="24px" weight="bold" />
    </button>
    <Dropdown
      target="btnMenuList{$list.id}"
      placement="bottom-end"
      class="bg-white rounded-md shadow border w-52"
    >
      <DropdownMenu>
        <DropdownLink let:className>
          <button type="button" class={className}> Rename </button>
        </DropdownLink>
        <DropdownDivider />
        <DropdownLink let:className>
          <button type="button" class="{className} text-red-600">
            Delete
          </button>
        </DropdownLink>
      </DropdownMenu>
    </Dropdown>
  </div>
</div>
