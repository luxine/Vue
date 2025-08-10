<template>
  <div class="flex flex-col h-[100dvh] w-[100dvw] bg-primary-dark">
    <main class="flex flex-col flex-1 min-h-0 bg-background relative overflow-hidden">
      <RouterView v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.fullPath" class="absolute inset-0" />
      </transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
