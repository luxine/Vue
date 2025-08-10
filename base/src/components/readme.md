# 组件库 (Components)

组件库包含项目中可复用的 Vue 组件，提供统一的 UI 交互体验。

## 📁 目录结构

```
components/
├── HomeLoading.vue      # 首页加载组件
├── readme.md           # 本文档
└── ...                 # 其他组件
```

## 🎯 组件设计原则

### 1. 单一职责
每个组件只负责一个特定的功能或展示逻辑。

### 2. 可复用性
组件应该具有良好的可复用性，支持不同的使用场景。

### 3. 类型安全
使用 TypeScript 确保组件的类型安全。

### 4. 响应式设计
组件应该支持不同屏幕尺寸的响应式布局。

## 🚀 组件使用

### 自动导入
项目配置了自动导入功能，组件可以直接使用：

```vue
<template>
  <!-- 组件会自动导入，无需手动 import -->
  <HomeLoading />
</template>

<script setup lang="ts">
// 无需手动导入组件
</script>
```

### 手动导入
如果需要手动导入组件：

```vue
<template>
  <HomeLoading />
</template>

<script setup lang="ts">
import HomeLoading from '@/components/HomeLoading.vue';
</script>
```

## 📦 组件列表

### HomeLoading.vue
首页加载组件，提供优雅的加载动画。

#### Props
```typescript
interface Props {
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 加载文本 */
  text?: string;
  /** 加载动画大小 */
  size?: 'small' | 'medium' | 'large';
}
```

#### 使用示例
```vue
<template>
  <HomeLoading 
    :loading="isLoading"
    text="正在加载数据..."
    size="large"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isLoading = ref(true);

// 模拟加载过程
setTimeout(() => {
  isLoading.value = false;
}, 3000);
</script>
```

## 🎨 组件样式

### 设计系统
组件遵循统一的设计系统：

- **颜色**: 使用 CSS 变量定义主题色彩
- **字体**: 统一的字体家族和大小规范
- **间距**: 一致的间距系统
- **动画**: 统一的动画时长和缓动函数

### 主题支持
组件支持主题切换：

```vue
<template>
  <div class="component" :class="theme">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '@/composables/useTheme';

const { currentTheme } = useTheme();
const theme = computed(() => `theme-${currentTheme.value}`);
</script>

<style scoped>
.component.theme-light {
  --primary-color: #1890ff;
  --background-color: #ffffff;
}

.component.theme-dark {
  --primary-color: #177ddc;
  --background-color: #141414;
}
</style>
```

## 🔧 组件开发

### 创建新组件
```vue
<!-- MyComponent.vue -->
<template>
  <div class="my-component">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'click', event: MouseEvent): void;
  (e: 'change', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  disabled: false
});

const emit = defineEmits<Emits>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
.my-component {
  /* 组件样式 */
}
</style>
```

### 组件测试
```typescript
// MyComponent.test.ts
import { mount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: {
        title: 'Test Title'
      }
    });
    
    expect(wrapper.text()).toContain('Test Title');
  });

  it('emits click event', async () => {
    const wrapper = mount(MyComponent);
    
    await wrapper.trigger('click');
    
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
```

## 📚 组件文档

### 组件 API 文档
每个组件都应该包含完整的 API 文档：

```vue
<!-- 组件文档注释 -->
<!--
  @component MyComponent
  @description 我的组件描述
  
  @prop {string} title - 组件标题
  @prop {boolean} disabled - 是否禁用
  
  @event {MouseEvent} click - 点击事件
  @event {string} change - 值变化事件
  
  @slot default - 默认插槽
  @slot header - 头部插槽
  @slot footer - 底部插槽
  
  @example
  <MyComponent title="标题" @click="handleClick">
    内容
  </MyComponent>
-->
```

### Storybook 集成
使用 Storybook 展示组件：

```typescript
// MyComponent.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import MyComponent from './MyComponent.vue';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '默认标题',
  },
};

export const Disabled: Story = {
  args: {
    title: '禁用状态',
    disabled: true,
  },
};
```

## 🎯 最佳实践

### 1. 组件命名
```typescript
// ✅ 推荐：使用 PascalCase
MyComponent.vue
UserProfile.vue
DataTable.vue

// ❌ 避免：使用 kebab-case
my-component.vue
user-profile.vue
data-table.vue
```

### 2. Props 定义
```typescript
// ✅ 推荐：使用 TypeScript 接口
interface Props {
  title: string;
  count?: number;
  items: string[];
}

// ✅ 推荐：提供默认值
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  items: () => []
});

// ❌ 避免：使用 any 类型
interface Props {
  data: any;
}
```

### 3. 事件处理
```typescript
// ✅ 推荐：定义事件类型
interface Emits {
  (e: 'update', value: string): void;
  (e: 'delete', id: number): void;
}

const emit = defineEmits<Emits>();

// ✅ 推荐：事件处理函数
const handleUpdate = (value: string) => {
  emit('update', value);
};
```

### 4. 插槽使用
```vue
<!-- ✅ 推荐：使用具名插槽 -->
<template>
  <div class="card">
    <header class="card-header">
      <slot name="header" />
    </header>
    <main class="card-body">
      <slot />
    </main>
    <footer class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<!-- 使用组件 -->
<MyCard>
  <template #header>
    <h3>卡片标题</h3>
  </template>
  
  <p>卡片内容</p>
  
  <template #footer>
    <button>操作按钮</button>
  </template>
</MyCard>
```

## 🔄 组件扩展

### 高阶组件 (HOC)
```typescript
// withLoading.ts
import { defineComponent, h } from 'vue';

export function withLoading(Component: any) {
  return defineComponent({
    name: `WithLoading(${Component.name})`,
    props: ['loading', 'error'],
    setup(props, { slots }) {
      return () => {
        if (props.loading) {
          return h(HomeLoading);
        }
        
        if (props.error) {
          return h('div', { class: 'error' }, props.error);
        }
        
        return h(Component, props, slots);
      };
    }
  });
}

// 使用高阶组件
const UserListWithLoading = withLoading(UserList);
```

### 组合式函数
```typescript
// useComponentState.ts
import { ref, computed } from 'vue';

export function useComponentState() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<any>(null);

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => !!error.value);

  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  const setError = (message: string | null) => {
    error.value = message;
  };

  const setData = (value: any) => {
    data.value = value;
  };

  return {
    loading: isLoading,
    error: hasError,
    data,
    setLoading,
    setError,
    setData
  };
}
```

## 📚 相关文档

- [Vue 3 组件指南](https://vuejs.org/guide/essentials/component-basics.html)
- [Vue 3 组合式 API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript 与 Vue](https://vuejs.org/guide/typescript/overview.html)
- [Element Plus 组件库](https://element-plus.org/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
