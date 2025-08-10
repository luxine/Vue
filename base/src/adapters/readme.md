# 适配器层 (Adapters)

适配器层负责将外部服务适配到项目的统一接口，实现业务逻辑与具体实现的解耦。

## 📁 目录结构

```
adapters/
├── requests/          # 网络请求适配器
│   ├── ApiRequestService.ts      # API 请求服务
│   ├── BaseRequestService.ts     # 基础请求服务
│   └── BusinessRequestService.ts # 业务请求服务
└── store/             # 存储适配器
    ├── LocalStorageService.ts    # 本地存储服务
    └── IndexDBStoreageService.ts # IndexDB 存储服务
```

## 🌐 网络请求适配器

### ApiRequestService
主要的 API 请求服务，负责：
- 统一请求头管理
- 认证令牌处理
- 请求参数预处理
- 错误处理

```typescript
import { createRequstService } from '@/adapters/requests/ApiRequestService';

// 创建请求服务实例
const apiService = await createRequstService();

// 使用服务
const data = await apiService.get<User>('/api/users/1');
const result = await apiService.post<User>('/api/users', userData);
```

### BaseRequestService
底层请求服务，基于 `ky` 库实现：
- HTTP 方法封装 (GET, POST, PUT, DELETE)
- 请求超时配置
- 重试机制
- 响应数据处理

### BusinessRequestService
业务层请求服务，负责：
- 业务逻辑处理
- 响应数据转换
- 错误码处理
- 业务异常处理

## 💾 存储适配器

### LocalStorageService
基于浏览器 LocalStorage 的存储服务：

```typescript
import LocalStorageService from '@/adapters/store/LocalStorageService';

const storage = new LocalStorageService();

// 存储数据
await storage.set('user', { id: 1, name: 'John' });

// 读取数据
const user = await storage.get<User>('user');

// 删除数据
await storage.remove('user');

// 清空所有数据
await storage.clear();
```

### IndexDBStoreageService
基于 IndexedDB 的存储服务，适用于：
- 大量数据存储
- 复杂数据结构
- 离线数据缓存

## 🔧 使用示例

### 在组件中使用请求服务

```vue
<template>
  <div>
    <button @click="fetchUser">获取用户信息</button>
    <div v-if="user">{{ user.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DIContainer } from '@/basis/DI/DIContainer';

const user = ref(null);

const fetchUser = async () => {
  try {
    const requestService = DIContainer.getRequestInstance();
    user.value = await requestService.get('/api/user/profile');
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
};
</script>
```

### 在 Store 中使用存储服务

```typescript
import { defineStore } from 'pinia';
import { DIContainer } from '@/basis/DI/DIContainer';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    __initState__: false
  }),

  actions: {
    async __init__() {
      const storeService = DIContainer.getStoreInstance();
      const savedUser = await storeService.get('user');
      if (savedUser) {
        this.user = savedUser;
      }
    },

    async saveUser(userData) {
      const storeService = DIContainer.getStoreInstance();
      await storeService.set('user', userData);
      this.user = userData;
    }
  }
});
```

## 🔄 扩展新的适配器

### 添加新的请求适配器

```typescript
// 创建新的请求服务
class CustomRequestService implements IRequestService {
  async get<T>(url: string, opts?: RequestOptions): Promise<T> {
    // 自定义实现
  }
  
  async post<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    // 自定义实现
  }
  
  // ... 其他方法
}

// 注入到容器
DIContainer.injectRequestsModel(new CustomRequestService());
```

### 添加新的存储适配器

```typescript
// 实现存储接口
class CustomStorageService implements IStoreService {
  async set<T>(key: string, value: T): Promise<void> {
    // 自定义实现
  }
  
  async get<T>(key: string): Promise<T | null> {
    // 自定义实现
  }
  
  // ... 其他方法
}

// 注入到容器
DIContainer.injectStoreModel(new CustomStorageService());
```

## 🎯 最佳实践

1. **接口一致性**: 所有适配器必须实现对应的接口
2. **错误处理**: 统一处理异常情况
3. **类型安全**: 使用 TypeScript 泛型确保类型安全
4. **异步处理**: 所有 I/O 操作都应该是异步的
5. **资源管理**: 合理管理连接和资源释放

## 🔍 调试技巧

### 请求调试
```typescript
// 在开发环境中启用详细日志
if (Utils.isDev()) {
  console.log('Request:', { url, options });
}
```

### 存储调试
```typescript
// 监控存储操作
const originalSet = storage.set;
storage.set = async (key, value) => {
  console.log('Storage set:', { key, value });
  return originalSet.call(storage, key, value);
};
```
