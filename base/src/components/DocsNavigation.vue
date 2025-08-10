<template>
  <nav class="docs-navigation">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">目录</h3>
      <ul class="space-y-2">
        <li v-for="section in sections" :key="section.id">
          <a
            :href="`#${section.id}`"
            @click="scrollToSection(section.id)"
            class="block text-sm text-gray-600 hover:text-indigo-600 transition-colors py-1 px-2 rounded hover:bg-gray-50"
            :class="{ 'text-indigo-600 bg-indigo-50': activeSection === section.id }"
          >
            {{ section.title }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Section {
  id: string;
  title: string;
}

interface Props {
  sections: Section[];
}

const props = defineProps<Props>();
const activeSection = ref<string>('');

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const updateActiveSection = () => {
  const sections = props.sections.map(s => s.id);
  const scrollPosition = window.scrollY + 100; // 偏移量

  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i]);
    if (element && element.offsetTop <= scrollPosition) {
      activeSection.value = sections[i];
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection);
});
</script>

<style scoped>
.docs-navigation {
  @apply sticky top-24;
}
</style>
