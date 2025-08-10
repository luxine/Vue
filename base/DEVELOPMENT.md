# Vue Template 开发指南

## 📋 目录

- [环境搭建](#环境搭建)
- [项目结构](#项目结构)
- [开发规范](#开发规范)
- [代码质量](#代码质量)
- [调试技巧](#调试技巧)
- [性能优化](#性能优化)
- [测试指南](#测试指南)
- [部署流程](#部署流程)
- [常见问题](#常见问题)

## 🛠️ 环境搭建

### 系统要求
- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0
- **Git**: >= 2.0.0

### 安装步骤

#### 1. 克隆项目
```bash
git clone <repository-url>
cd Vue-template/base
```

#### 2. 安装依赖
```bash
pnpm install
```

#### 3. 环境配置
```bash
# 复制环境配置文件
cp .env.example .env

# 编辑环境变量
vim .env
```

#### 4. 启动开发服务器
```bash
# Web开发
pnpm dev

# Electron桌面开发
pnpm dev/desktop

# 移动端开发
pnpm dev/mobile
```

### 开发工具推荐

#### VS Code 扩展
```json
{
  "recommendations": [
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

#### VS Code 设置
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.experimental.useFlatConfig": true,
  "eslint.validate": ["javascript", "typescript", "vue"],
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 📁 项目结构

### 目录说明

```
src/
├── adapters/          # 适配器层 - 外部服务适配
│   ├── requests/      # 网络请求适配器
│   └── store/         # 存储适配器
├── basis/             # 基础架构 - 核心服务
│   ├── DI/           # 依赖注入容器
│   ├── RequestService/ # 请求服务
│   └── StoreService/   # 存储服务
├── interface/         # 接口定义 - TypeScript接口
├── plugins/           # 插件系统 - Vue插件
├── views/             # 页面组件 - 路由页面
├── components/        # 通用组件 - 可复用组件
├── router/            # 路由配置 - Vue Router
├── shared/            # 工具函数 - 通用工具
├── ws/                # WebSocket模块 - 实时通信
├── hooks/             # 自定义Hooks - 组合式函数
├── assets/            # 静态资源 - 图片、字体等
├── styles/            # 样式文件 - 全局样式
└── types/             # 类型定义 - 全局类型
```

### 文件命名规范

#### 组件文件
- 页面组件: `PascalCase.vue` (如: `UserProfile.vue`)
- 通用组件: `PascalCase.vue` (如: `BaseButton.vue`)
- 布局组件: `PascalCase.vue` (如: `MainLayout.vue`)

#### 工具文件
- 工具函数: `camelCase.ts` (如: `utils.ts`)
- 类型定义: `camelCase.d.ts` (如: `api.d.ts`)
- 配置文件: `kebab-case.ts` (如: `vite.config.ts`)

#### 样式文件
- 全局样式: `globals.css`
- 组件样式: 使用 `<style scoped>` 或 CSS Modules

## 📝 开发规范

### Vue 3 组合式 API

#### 组件结构
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 导入
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@/types/user'

// 类型定义
interface Props {
  userId: string
}

// Props 和 Emits
const props = defineProps<Props>()
const emit = defineEmits<{
  update: [user: User]
}>()

// 响应式数据
const user = ref<User | null>(null)
const loading = ref(false)

// 计算属性
const userName = computed(() => user.value?.name || 'Unknown')

// 方法
const loadUser = async () => {
  loading.value = true
  try {
    const requestService = DIContainer.getRequestInstance()
    user.value = await requestService.get<User>(`/api/users/${props.userId}`)
  } catch (error) {
    console.error('Failed to load user:', error)
  } finally {
    loading.value = false
  }
}

// 生命周期
onMounted(() => {
  loadUser()
})

// 暴露给模板
defineExpose({
  loadUser
})
</script>

<style scoped>
/* 组件样式 */
</style>
```

#### 状态管理 (Pinia)
```typescript
// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/user'
import DIContainer from '@/basis/DI/DIContainer'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref<User | null>(null)
  const loading = ref(false)
  const __initState__ = ref(false)

  // 计算属性
  const isLoggedIn = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || '')

  // 初始化
  const __init__ = async () => {
    loading.value = true
    try {
      const storeService = DIContainer.getStoreInstance()
      const storedUser = await storeService.get<User>('user')
      if (storedUser) {
        user.value = storedUser
      }
      __initState__.value = true
    } catch (error) {
      console.error('Failed to initialize user store:', error)
    } finally {
      loading.value = false
    }
  }

  // 方法
  const login = async (credentials: LoginCredentials) => {
    const requestService = DIContainer.getRequestInstance()
    const userData = await requestService.post<User>('/api/auth/login', credentials)
    user.value = userData
    
    // 持久化
    const storeService = DIContainer.getStoreInstance()
    await storeService.set('user', userData)
  }

  const logout = async () => {
    user.value = null
    __initState__.value = false
    
    // 清除存储
    const storeService = DIContainer.getStoreInstance()
    await storeService.remove('user')
  }

  return {
    // 状态
    user,
    loading,
    __initState__,
    
    // 计算属性
    isLoggedIn,
    userName,
    
    // 方法
    __init__,
    login,
    logout
  }
})
```

### TypeScript 规范

#### 类型定义
```typescript
// types/user.ts
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  avatar?: string
}

// types/api.ts
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
```

#### 泛型使用
```typescript
// 通用API函数
async function apiRequest<T, R = T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: T
): Promise<R> {
  const requestService = DIContainer.getRequestInstance()
  
  switch (method) {
    case 'GET':
      return requestService.get<R>(url)
    case 'POST':
      return requestService.post<R, T>(url, data!)
    case 'PUT':
      return requestService.put<R, T>(url, data!)
    case 'DELETE':
      return requestService.delete<R>(url)
    default:
      throw new Error(`Unsupported method: ${method}`)
  }
}

// 使用示例
const users = await apiRequest<User[]>('/api/users', 'GET')
const newUser = await apiRequest<CreateUserRequest, User>('/api/users', 'POST', userData)
```

### CSS 规范

#### Tailwind CSS
```vue
<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-xl font-semibold text-gray-900">
            {{ title }}
          </h1>
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="handleClick"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </header>
  </div>
</template>
```

#### 自定义样式
```vue
<style scoped>
/* 组件特定样式 */
.custom-button {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md;
}

.custom-button--primary {
  @apply text-white bg-indigo-600 hover:bg-indigo-700;
}

.custom-button--secondary {
  @apply text-indigo-700 bg-indigo-100 hover:bg-indigo-200;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .custom-button {
    @apply w-full justify-center;
  }
}
</style>
```

## 🔍 代码质量

### ESLint 配置
```javascript
// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: tsparser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      vue: vue,
      prettier: prettier
    },
    rules: {
      // Vue 规则
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      
      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      
      // 通用规则
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn'
    }
  }
]
```

### Prettier 配置
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### Git Hooks
```json
{
  "lint-staged": {
    "*.{js,ts,vue}": [
      "prettier --write",
      "eslint --cache --fix"
    ],
    "*.{css,scss,json,md}": [
      "prettier --write"
    ]
  }
}
```

## 🐛 调试技巧

### Vue DevTools
```typescript
// 开发环境启用性能监控
if (Utils.isDev()) {
  app.config.performance = true
}
```

### 调试工具
```typescript
// 调试日志
const debug = (message: string, data?: unknown) => {
  if (Utils.isDev()) {
    console.log(`[DEBUG] ${message}`, data)
  }
}

// 错误边界
const handleError = (error: Error, context?: string) => {
  console.error(`[ERROR] ${context || 'Unknown'}:`, error)
  
  // 错误上报
  if (!Utils.isDev()) {
    // 发送错误到监控服务
  }
}
```

### 网络请求调试
```typescript
// 请求拦截器
const requestService = DIContainer.getRequestInstance()

// 添加调试信息
if (Utils.isDev()) {
  console.log('Request:', {
    url: '/api/users',
    method: 'GET',
    params: { page: 1 }
  })
}
```

## ⚡ 性能优化

### 代码分割
```typescript
// 路由懒加载
const routes = [
  {
    path: '/users',
    component: () => import('@/views/Users/UserList.vue')
  }
]

// 组件懒加载
const LazyComponent = defineAsyncComponent(() => 
  import('@/components/HeavyComponent.vue')
)
```

### 缓存策略
```typescript
// 组件缓存
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['UserList', 'UserDetail']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

// 数据缓存
const cachedData = new Map()

const getCachedData = async (key: string, fetcher: () => Promise<unknown>) => {
  if (cachedData.has(key)) {
    return cachedData.get(key)
  }
  
  const data = await fetcher()
  cachedData.set(key, data)
  return data
}
```

### 虚拟滚动
```vue
<template>
  <VirtualList
    :items="users"
    :item-height="60"
    :container-height="400"
  >
    <template #default="{ item }">
      <UserItem :user="item" />
    </template>
  </VirtualList>
</template>
```

## 🧪 测试指南

### 单元测试
```typescript
// tests/utils.test.ts
import { describe, it, expect } from 'vitest'
import Utils from '@/shared/Utils'

describe('Utils', () => {
  describe('generateRandomString', () => {
    it('should generate string with default length', () => {
      const result = Utils.generateRandomString()
      expect(result).toHaveLength(16)
      expect(typeof result).toBe('string')
    })

    it('should generate string with custom length', () => {
      const result = Utils.generateRandomString(32)
      expect(result).toHaveLength(32)
    })
  })

  describe('generateQueryUrl', () => {
    it('should generate URL with query parameters', () => {
      const result = Utils.generateQueryUrl('/api/users', {
        page: 1,
        limit: 10
      })
      expect(result).toBe('/api/users?page=1&limit=10')
    })
  })
})
```

### 组件测试
```typescript
// tests/components/UserCard.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UserCard from '@/components/UserCard.vue'

describe('UserCard', () => {
  it('should render user information', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    }

    const wrapper = mount(UserCard, {
      props: { user }
    })

    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('john@example.com')
  })

  it('should emit click event', async () => {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com' }
    const wrapper = mount(UserCard, { props: { user } })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

### E2E 测试
```typescript
// tests/e2e/user-flow.spec.ts
import { test, expect } from '@playwright/test'

test('user login flow', async ({ page }) => {
  await page.goto('/login')
  
  await page.fill('[data-testid="email"]', 'test@example.com')
  await page.fill('[data-testid="password"]', 'password123')
  await page.click('[data-testid="login-button"]')
  
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('[data-testid="user-name"]')).toContainText('Test User')
})
```

## 🚀 部署流程

### 构建配置
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['lodash-es', 'axios']
        }
      }
    }
  }
})
```

### 环境配置
```bash
# .env.production
VITE_APP_TITLE=Vue Template
VITE_BASE_URL=https://api.example.com
VITE_WS_BASE_URL=wss://api.example.com
```

### 部署脚本
```json
{
  "scripts": {
    "build": "vue-tsc -b && vite build --mode prod",
    "build:desktop": "vite build --mode desktop && electron-builder",
    "build:android": "vue-tsc -b && vite build --mode android && npx cap add android && npx cap copy android",
    "deploy": "npm run build && npm run deploy:upload"
  }
}
```

## ❓ 常见问题

### Q: 如何处理跨域问题？
A: 在开发环境中，Vite 提供了代理功能：
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

### Q: 如何优化首屏加载速度？
A: 使用以下策略：
1. 路由懒加载
2. 组件懒加载
3. 代码分割
4. 资源压缩
5. CDN 加速

### Q: 如何处理大列表渲染？
A: 使用虚拟滚动：
```vue
<template>
  <VirtualList
    :items="items"
    :item-height="50"
    :container-height="400"
  >
    <template #default="{ item }">
      <ListItem :item="item" />
    </template>
  </VirtualList>
</template>
```

### Q: 如何实现主题切换？
A: 使用 CSS 变量和 Tailwind CSS：
```typescript
// 主题切换
const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

// 初始化主题
const initTheme = () => {
  const theme = localStorage.getItem('theme') || 'light'
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
```

---

*更多开发相关文档，请参考项目源码和官方文档。*
