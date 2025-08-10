# 开发指南

本文档提供项目的开发指南，包括环境搭建、开发流程、代码规范等。

## 🛠️ 环境搭建

### 系统要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git >= 2.0.0

### 开发环境安装

1. **克隆项目**
```bash
git clone <repository-url>
cd Vue/base
```

2. **安装依赖**
```bash
pnpm install
```

3. **启动开发服务器**
```bash
# Web 开发
pnpm dev

# Desktop 开发
pnpm dev/desktop
```

## 📝 代码规范

### TypeScript 规范

#### 类型定义
```typescript
// ✅ 推荐：明确的类型定义
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// ✅ 推荐：使用泛型
function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json());
}

// ❌ 避免：使用 any 类型
function processData(data: any): any {
  return data;
}
```

#### 接口设计
```typescript
// ✅ 推荐：清晰的接口设计
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  code: number;
}

// ✅ 推荐：可选属性使用 ?
interface UserProfile {
  id: number;
  name: string;
  avatar?: string;
  bio?: string;
}
```

### Vue 组件规范

#### 组件结构
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 导入
import { ref, computed } from 'vue';

// 类型定义
interface Props {
  title: string;
  count?: number;
}

interface Emits {
  (e: 'update', value: string): void;
}

// Props 和 Emits
const props = withDefaults(defineProps<Props>(), {
  count: 0
});

const emit = defineEmits<Emits>();

// 响应式数据
const loading = ref(false);
const data = ref<any[]>([]);

// 计算属性
const totalCount = computed(() => data.value.length);

// 方法
const handleUpdate = (value: string) => {
  emit('update', value);
};

// 生命周期
onMounted(() => {
  // 初始化逻辑
});
</script>

<style scoped>
/* 组件样式 */
</style>
```

#### 命名规范
```typescript
// ✅ 推荐：组件使用 PascalCase
MyComponent.vue
UserProfile.vue

// ✅ 推荐：文件使用 kebab-case
my-component.vue
user-profile.vue

// ✅ 推荐：变量和函数使用 camelCase
const userName = ref('');
const fetchUserData = () => {};

// ✅ 推荐：常量使用 UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;
```

### CSS 规范

#### 类名规范
```css
/* ✅ 推荐：使用 BEM 命名法 */
.user-card {
  /* 组件样式 */
}

.user-card__header {
  /* 元素样式 */
}

.user-card--active {
  /* 修饰符样式 */
}

/* ✅ 推荐：使用 CSS 变量 */
:root {
  --primary-color: #1890ff;
  --border-radius: 4px;
  --spacing-unit: 8px;
}

.component {
  color: var(--primary-color);
  border-radius: var(--border-radius);
  padding: calc(var(--spacing-unit) * 2);
}
```

## 🔧 开发工具

### VS Code 配置

#### 推荐扩展
- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier
- Auto Rename Tag
- Bracket Pair Colorizer

#### 工作区设置
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "vue.codeActions.enabled": false
}
```

### Git 配置

#### 提交规范
```bash
# 提交格式
<type>(<scope>): <subject>

# 类型说明
feat:     新功能
fix:      修复
docs:     文档更新
style:    代码格式调整
refactor: 重构
test:     测试相关
chore:    构建过程或辅助工具的变动

# 示例
feat(user): 添加用户登录功能
fix(api): 修复用户数据获取接口
docs(readme): 更新项目文档
```

#### Git Hooks
项目配置了 pre-commit 钩子，会自动运行：
- ESLint 检查
- Prettier 格式化
- TypeScript 类型检查

## 🚀 开发流程

### 功能开发流程

1. **创建功能分支**
```bash
git checkout -b feature/user-login
```

2. **开发功能**
- 编写组件和逻辑
- 添加类型定义
- 编写测试用例

3. **代码审查**
```bash
# 提交代码
git add .
git commit -m "feat(user): 添加用户登录功能"

# 推送到远程
git push origin feature/user-login
```

4. **创建 Pull Request**
- 描述功能变更
- 添加测试说明
- 请求代码审查

### 测试流程

#### 单元测试
```bash
# 运行所有测试
pnpm test

# 运行特定测试文件
pnpm test UserLogin.test.ts

# 监听模式
pnpm test:watch
```

#### 集成测试
```bash
# 运行集成测试
pnpm test:integration

# 运行 E2E 测试
pnpm test:e2e
```

### 构建流程

#### 开发构建
```bash
# 开发环境构建
pnpm build:dev

# 预览构建结果
pnpm preview
```

#### 生产构建
```bash
# 生产环境构建
pnpm build

# 分析构建结果
pnpm build:analyze
```

## 🔍 调试技巧

### 开发环境调试

#### Vue DevTools
```typescript
// 启用 Vue DevTools
if (Utils.isDev()) {
  app.config.performance = true;
}
```

#### 控制台调试
```typescript
// 开发环境日志
if (Utils.isDev()) {
  console.log('调试信息:', data);
  console.group('组件状态');
  console.log('props:', props);
  console.log('state:', state);
  console.groupEnd();
}
```

#### 网络请求调试
```typescript
// 请求拦截器
if (Utils.isDev()) {
  console.log('API 请求:', {
    url,
    method,
    data,
    headers
  });
}
```

### 错误处理

#### 全局错误处理
```typescript
// 全局错误处理器
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误:', err);
  console.error('错误信息:', info);
  
  // 发送错误报告
  if (Utils.isDev()) {
    console.group('错误详情');
    console.error('错误对象:', err);
    console.error('组件实例:', instance);
    console.error('错误信息:', info);
    console.groupEnd();
  }
};
```

#### 组件错误边界
```vue
<template>
  <ErrorBoundary>
    <template #default>
      <slot />
    </template>
    <template #error="{ error }">
      <div class="error-fallback">
        <h3>出错了</h3>
        <p>{{ error.message }}</p>
        <button @click="retry">重试</button>
      </div>
    </template>
  </ErrorBoundary>
</template>
```

## 📊 性能优化

### 代码分割
```typescript
// 路由懒加载
const routes = [
  {
    path: '/user',
    component: () => import('@/views/User/UserProfile.vue')
  }
];

// 组件懒加载
const LazyComponent = defineAsyncComponent(() => 
  import('@/components/HeavyComponent.vue')
);
```

### 缓存策略
```typescript
// 数据缓存
const cachedData = new Map<string, any>();

const fetchWithCache = async (key: string, fetcher: () => Promise<any>) => {
  if (cachedData.has(key)) {
    return cachedData.get(key);
  }
  
  const data = await fetcher();
  cachedData.set(key, data);
  return data;
};
```

### 虚拟滚动
```vue
<template>
  <VirtualList
    :items="largeList"
    :item-height="50"
    :container-height="400"
  >
    <template #item="{ item }">
      <ListItem :data="item" />
    </template>
  </VirtualList>
</template>
```

## 🔒 安全考虑

### 输入验证
```typescript
// 数据验证
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1).max(100),
  email: z.string().email()
});

const validateUser = (data: unknown) => {
  return UserSchema.parse(data);
};
```

### XSS 防护
```vue
<template>
  <!-- ✅ 推荐：使用 v-text 或 {{ }} 进行内容插值 -->
  <div v-text="userInput"></div>
  
  <!-- ❌ 避免：直接使用 v-html -->
  <div v-html="userInput"></div>
</template>
```

### CSRF 防护
```typescript
// 请求头中添加 CSRF Token
const headers = {
  'X-CSRF-Token': getCsrfToken(),
  'Content-Type': 'application/json'
};
```

## 📚 学习资源

### 官方文档
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Pinia 官方文档](https://pinia.vuejs.org/)

### 最佳实践
- [Vue 3 风格指南](https://vuejs.org/style-guide/)
- [TypeScript 最佳实践](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [前端工程化实践](https://github.com/fouber/blog/issues/10)

### 工具文档
- [ESLint 配置指南](https://eslint.org/docs/user-guide/configuring)
- [Prettier 配置指南](https://prettier.io/docs/en/configuration.html)
- [Jest 测试指南](https://jestjs.io/docs/getting-started)

## 🤝 贡献指南

### 贡献流程
1. Fork 项目
2. 创建功能分支
3. 提交代码变更
4. 创建 Pull Request
5. 等待代码审查
6. 合并到主分支

### 代码审查要点
- 代码质量和可读性
- 类型安全性
- 测试覆盖率
- 性能影响
- 安全性考虑

### 问题报告
- 使用 GitHub Issues
- 提供详细的错误信息
- 包含复现步骤
- 添加环境信息

---

**Happy Coding!** 🎉
