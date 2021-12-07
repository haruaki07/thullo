<script lang="ts">
  import Section from "@/cmp/Widget/Section";
  import Input from "./_Input.svelte";
  import Comment from "./_Comment.svelte";
</script>

<Section title="">
  <div>
    <Input />
    <div class="divide-y divide-gray-200 mt-3 max-h-48 overflow-auto">
      <Comment />
      <Comment />
      <Comment />
    </div>
  </div>
</Section>
