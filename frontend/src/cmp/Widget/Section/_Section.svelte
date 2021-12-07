<script lang="ts">
  export let title: string;
</script>

<div class="mt-4">
  <div class="text-sm text-gray-400 flex items-center mb-3">
    <slot name="icon" />
    <span class="ml-2 text-gray-500">
      {title}
    </span>
  </div>
  <slot />
</div>
