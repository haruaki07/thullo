<script lang="ts">
  export let users = [{ name: "John" }, { name: "Mina" }, { name: "Brad" }];
  export let selected: string[] = [];
</script>

<div class="rounded-lg flex flex-col divide(y gray-200) border">
  {#each users as user (user.name)}
    <label
      class:bg-gray-200={selected.includes(user.name)}
      class="p-2 flex w-full items-center cursor-pointer"
    >
      <input
        type="checkbox"
        bind:group={selected}
        value={user.name}
        class="hidden"
      />
      <div class="w-7 h-7 bg-gray-300 rounded-lg" />
      <p class="ml-2 font-medium text(sm gray-700)">{user.name}</p>
    </label>
  {/each}
</div>
