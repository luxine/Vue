<template>
  <div class="docs-code-block">
    <div v-if="title" class="bg-gray-100 px-4 py-2 border-b border-gray-200">
      <h4 class="text-sm font-semibold text-gray-700">{{ title }}</h4>
    </div>
    <div class="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
      <pre class="text-sm font-mono"><code><slot /></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<style scoped>
.docs-code-block {
  @apply rounded-lg border border-gray-200 overflow-hidden;
}

.docs-code-block pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
