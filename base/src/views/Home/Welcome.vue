<template>
  <main
    class="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-gray-100 relative overflow-hidden"
  >
    <!-- 背景光斑（小屏淡化，节省 GPU） -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25)_0%,transparent_60%)] sm:opacity-100 opacity-60"
    />

    <!-- 内容卡片 -->
    <section
      class="z-10 backdrop-blur-sm/40 bg-white/5 rounded-2xl shadow-xl animate-fade-in text-center w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-2xl px-6 sm:px-10 md:px-14 lg:px-16 py-10 md:py-14 lg:py-18 space-y-6 sm:space-y-8"
    >
      <!-- Logo（减小移动端阴影） -->
      <svg
        class="mx-auto h-14 w-14 sm:h-16 sm:w-16 text-indigo-400 drop-shadow-sm sm:drop-shadow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L1 21h22L12 2z" stroke="currentColor" stroke-width="1" stroke-linejoin="round" fill-opacity="0.15" />
      </svg>

      <h1 class="font-extrabold tracking-tight select-none text-3xl sm:text-4xl lg:text-5xl">Luxine&nbsp;Vue&nbsp;Template</h1>

      <p class="text-sm sm:text-base lg:text-lg text-gray-300">Vite 6 · Vue 3.5 · TypeScript 5.8 · Tailwind CSS v4</p>

      <ul class="mx-auto max-w-[42ch] text-start space-y-2 sm:space-y-3 text-gray-300 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-3 md:space-y-0">
        <li class="flex gap-2">
          <span class="text-indigo-400 mt-0.5 shrink-0">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 6l9 4.5-9 4.5-9-4.5 9-4.5zM3 10.5v6l9 4.5 9-4.5v-6" stroke="currentColor" stroke-width="1" fill="none" />
            </svg>
          </span>
          <span>一键打包 Web / Windows / Android</span>
        </li>

        <li class="flex gap-2">
          <span class="text-indigo-400 mt-0.5 shrink-0">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="1" fill="none" />
            </svg>
          </span>
          <span>内建 Docker &amp; Nginx 部署示例</span>
        </li>

        <li class="flex gap-2">
          <span class="text-indigo-400 mt-0.5 shrink-0">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 12h16M12 4v16" stroke="currentColor" stroke-width="1" fill="none" />
            </svg>
          </span>
          <span>现代化、可拓展工程化基石</span>
        </li>
      </ul>

      <!-- 行动按钮 -->
      <div class="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-1.5">
        <RouterLink
          to="/docs"
          class="rounded-full bg-indigo-500 px-6 py-3 text-center shadow transition hover:bg-indigo-600 hover:shadow-lg active:translate-y-px"
          aria-label="查看开发文档"
        >
          开始开发
        </RouterLink>
        <a
          href="https://github.com/luxine"
          target="_blank"
          rel="noopener"
          class="rounded-full border border-gray-400/40 px-6 py-3 text-center shadow transition hover:border-gray-200 hover:shadow-lg active:translate-y-px"
          aria-label="前往 GitHub"
        >
          GitHub
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
// 展示页默认无需脚本；如需读取版本号，可在此 inject 运行时变量
</script>

<style scoped>
/* 动画沿用，额外开启 prefers-reduced-motion 容错 */
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
  }
}
.animate-fade-in {
  animation: fade-in 0.8s ease-out both;
}
</style>
