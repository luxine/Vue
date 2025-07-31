<script setup lang="ts">
const router = useRouter();
onMounted(() => {
  setTimeout(() => {
    router.replace('/home');
  }, 4000);
});
</script>

<template>
  <div class="w-[100dvw] h-[100dvh] relative">
    <HomeLoading class="size-full" />
  </div>
</template>
