<script lang="ts">
  export let content = `asdasdad`;
</script>

<div class="w-full py-2">
  <div class="flex items-center">
    <div class="bg-gray-300 w-8 h-8 rounded-md" />
    <div class="children:leading-none ml-2 mt-1">
      <p class="font-medium text(sm gray-700)">John Shelby</p>
      <span class="text(xs gray-400)">{new Date().toLocaleString()}</span>
    </div>
    <div class="ml-auto flex items-center text-sm children:mr-2">
      <button class="text-gray-700">Edit</button>
      <button class="text-red-500">Delete</button>
    </div>
  </div>
  <div class="mt-2 text(gray-700 sm) md:text-base">
    {@html content}
  </div>
</div>
