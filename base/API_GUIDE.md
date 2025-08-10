# Vue Template API 使用指南

## 📋 目录

- [依赖注入容器](#依赖注入容器)
- [网络请求服务](#网络请求服务)
- [存储服务](#存储服务)
- [WebSocket服务](#websocket服务)
- [状态管理](#状态管理)
- [工具函数](#工具函数)
- [插件系统](#插件系统)

## 🔧 依赖注入容器

### DIContainer

依赖注入容器是项目的核心，负责管理全局服务实例。

#### 注入服务
```typescript
import DIContainer from '@/basis/DI/DIContainer';
import LocalStorageService from '@/adapters/store/LocalStorageService';
import { createRequstService } from '@/adapters/requests/ApiRequestService';

// 注入存储服务
DIContainer.injectStoreModel(LocalStorageService);

// 注入请求服务
const apiService = await createRequstService();
DIContainer.injectRequestsModel(apiService);
```

#### 获取服务实例
```typescript
// 获取请求服务实例
const requestService = DIContainer.getRequestInstance();

// 获取存储服务实例
const storeService = DIContainer.getStoreInstance();
```

#### 错误处理
```typescript
try {
  const requestService = DIContainer.getRequestInstance();
} catch (error) {
  console.error('RequestService is not initialized');
}
```

## 🌐 网络请求服务

### 基础用法

#### GET请求
```typescript
import DIContainer from '@/basis/DI/DIContainer';

const requestService = DIContainer.getRequestInstance();

// 简单GET请求
const users = await requestService.get<User[]>('/api/users');

// 带查询参数的GET请求
const filteredUsers = await requestService.get<User[]>('/api/users', {
  params: {
    page: 1,
    limit: 10,
    status: 'active'
  }
});
```

#### POST请求
```typescript
// 创建用户
const newUser = await requestService.post<User>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// 带自定义请求头的POST请求
const result = await requestService.post<User>('/api/users', userData, {
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

#### PUT请求
```typescript
// 更新用户
const updatedUser = await requestService.put<User>('/api/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com'
});
```

#### DELETE请求
```typescript
// 删除用户
await requestService.delete('/api/users/123');
```

### 高级用法

#### 请求选项
```typescript
interface RequestOptions {
  params?: Record<string, unknown[] | string | number | boolean | null | undefined>;
  headers?: Record<string, string>;
  timeout?: number | false;
  retry?: number;
}

// 使用所有选项
const result = await requestService.get<User[]>('/api/users', {
  params: { page: 1, limit: 20 },
  headers: { 'Authorization': 'Bearer token' },
  timeout: 5000,
  retry: 3
});
```

#### 错误处理
```typescript
try {
  const data = await requestService.get<User[]>('/api/users');
} catch (error) {
  if (error.message === 'Unauthorized') {
    // 处理401错误
    router.push('/login');
  } else {
    // 处理其他错误
    console.error('Request failed:', error);
  }
}
```

#### 类型安全
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

// 类型安全的请求
const users = await requestService.get<User[]>('/api/users');
const newUser = await requestService.post<User, CreateUserRequest>('/api/users', {
  name: 'John',
  email: 'john@example.com',
  password: 'password123'
});
```

## 💾 存储服务

### 基础用法

#### 存储数据
```typescript
import DIContainer from '@/basis/DI/DIContainer';

const storeService = DIContainer.getStoreInstance();

// 存储简单数据
await storeService.set('theme', 'dark');
await storeService.set('language', 'zh-CN');

// 存储复杂对象
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    language: 'zh-CN'
  }
};
await storeService.set('user', user);
```

#### 读取数据
```typescript
// 读取简单数据
const theme = await storeService.get<string>('theme');
const language = await storeService.get<string>('language');

// 读取复杂对象
const user = await storeService.get<User>('user');
if (user) {
  console.log('User name:', user.name);
  console.log('User theme:', user.preferences.theme);
}
```

#### 删除数据
```typescript
// 删除单个键
await storeService.remove('theme');

// 清空所有数据
await storeService.clear();
```

### 高级用法

#### 类型安全存储
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

// 类型安全的存储和读取
const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    language: 'zh-CN',
    notifications: true
  }
};

await storeService.set<User>('user', user);
const storedUser = await storeService.get<User>('user');
```

#### 批量操作
```typescript
// 批量存储
const batchSet = async (data: Record<string, unknown>) => {
  const promises = Object.entries(data).map(([key, value]) => 
    storeService.set(key, value)
  );
  await Promise.all(promises);
};

// 批量读取
const batchGet = async (keys: string[]) => {
  const promises = keys.map(key => storeService.get(key));
  return await Promise.all(promises);
};

// 使用示例
await batchSet({
  'user': userData,
  'settings': settingsData,
  'cache': cacheData
});

const [user, settings, cache] = await batchGet(['user', 'settings', 'cache']);
```

## 🌐 WebSocket服务

### 基础用法

#### 初始化连接
```typescript
import { initWebSocket, useWebSocket } from '@/ws/ws';

// 初始化WebSocket连接
const ws = initWebSocket('ws://localhost:8080');

// 在组件中使用
const wsClient = useWebSocket();
```

#### 监听事件
```typescript
// 监听消息事件
ws.on('message', (data) => {
  console.log('收到消息:', data);
});

// 监听用户事件
ws.on('user_joined', (data) => {
  console.log('用户加入:', data.payload);
});

// 监听错误事件
ws.on('error', (data) => {
  console.error('WebSocket错误:', data);
});
```

#### 发送消息
```typescript
// 发送聊天消息
ws.send('chat', 'user', {
  message: 'Hello, World!',
  timestamp: Date.now()
});

// 发送用户状态
ws.send('status', 'user', {
  status: 'online',
  userId: 123
});
```

### 高级用法

#### 事件管理
```typescript
// 移除事件监听器
const messageHandler = (data) => {
  console.log('收到消息:', data);
};

ws.on('message', messageHandler);

// 移除监听器
ws.off('message', messageHandler);
```

#### 连接管理
```typescript
// 关闭连接
ws.close();

// 检查连接状态
if (ws.ws && ws.ws.readyState === WebSocket.OPEN) {
  console.log('WebSocket已连接');
}
```

#### 自动重连
```typescript
// WebSocket支持自动重连
const ws = initWebSocket('ws://localhost:8080', {
  autoReconnect: true,
  reconnectInterval: 3000
});
```

## 🎮 状态管理

### Pinia Hooks

#### 基础Store
```typescript
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const __initState__ = ref(false);

  const __init__ = async () => {
    loading.value = true;
    try {
      const userData = await loadUserData();
      user.value = userData;
      __initState__.value = true;
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      loading.value = false;
    }
  };

  const updateUser = (userData: User) => {
    user.value = userData;
  };

  const logout = () => {
    user.value = null;
    __initState__.value = false;
  };

  return {
    user,
    loading,
    __init__,
    __initState__,
    updateUser,
    logout
  };
});
```

#### 在组件中使用
```typescript
import { useUserStore } from '@/stores/user';

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    // 等待初始化完成
    const waitForInit = async () => {
      if (!userStore.__initState__) {
        await userStore.__init__();
      }
    };

    onMounted(() => {
      waitForInit();
    });

    return {
      user: computed(() => userStore.user),
      loading: computed(() => userStore.loading),
      updateUser: userStore.updateUser,
      logout: userStore.logout
    };
  }
});
```

#### 异步状态管理
```typescript
export const useDataStore = defineStore('data', () => {
  const data = ref<Data[]>([]);
  const __initState__ = ref(false);

  const __init__ = async () => {
    const requestService = DIContainer.getRequestInstance();
    const result = await requestService.get<Data[]>('/api/data');
    data.value = result;
    __initState__.value = true;
  };

  const addData = async (newData: Omit<Data, 'id'>) => {
    const requestService = DIContainer.getRequestInstance();
    const result = await requestService.post<Data>('/api/data', newData);
    data.value.push(result);
  };

  return {
    data,
    __init__,
    __initState__,
    addData
  };
});
```

## 🛠️ 工具函数

### Utils类

#### 环境检测
```typescript
import Utils from '@/shared/Utils';

// 检测开发环境
if (Utils.isDev()) {
  console.log('当前为开发环境');
}
```

#### 二进制数据处理
```typescript
// 对象转二进制
const data = { name: 'John', age: 30 };
const binary = Utils.toBinary(data);

// 二进制转对象
const originalData = Utils.fromBinary(binary);

// Base64编码
const base64 = Utils.toBaseBinary(data);

// Base64解码
const decodedData = Utils.fromBaseBinary(base64);
```

#### URL处理
```typescript
// 生成查询URL
const url = Utils.generateQueryUrl('/api/users', {
  page: 1,
  limit: 10,
  status: 'active'
});
// 结果: /api/users?page=1&limit=10&status=active
```

#### API地址获取
```typescript
// 获取当前环境API地址
const apiUrls = Utils.getApiBaseURL();

// 获取Web环境API地址
const webUrls = Utils.getApiBaseURL('web');

// 获取桌面环境API地址
const desktopUrls = Utils.getApiBaseURL('desktop');
```

#### 随机字符串生成
```typescript
// 生成16位随机字符串
const randomString = Utils.generateRandomString();

// 生成32位随机字符串
const longRandomString = Utils.generateRandomString(32);
```

#### Ref对象处理
```typescript
// 深度解包Ref对象
const refObject = ref({ name: 'John', age: ref(30) });
const plainObject = Utils.unwrapRefsDeep(refObject);
```

## 🔌 插件系统

### 国际化插件

#### 基础用法
```typescript
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { t, locale } = useI18n();

    // 翻译文本
    const message = t('welcome.message');

    // 切换语言
    const switchLanguage = (lang: string) => {
      locale.value = lang;
    };

    return {
      message,
      switchLanguage
    };
  }
});
```

#### 语言文件
```json
// en.json
{
  "welcome": {
    "message": "Welcome to Vue Template",
    "description": "A modern Vue 3 project template"
  }
}

// zh.json
{
  "welcome": {
    "message": "欢迎使用Vue模板",
    "description": "现代化的Vue3项目模板"
  }
}
```

### 消息提示插件

#### 基础用法
```typescript
import { Message } from '@/plugins/message';

// 成功消息
Message.success('操作成功');

// 错误消息
Message.error('操作失败');

// 警告消息
Message.warning('请注意');

// 信息消息
Message.info('提示信息');
```

### 加载状态插件

#### 基础用法
```typescript
import { showLoading, hideLoading } from '@/plugins/loading';

// 显示加载状态
showLoading();

// 隐藏加载状态
hideLoading();

// 自动管理加载状态（通过请求拦截器）
const requestService = DIContainer.getRequestInstance();
// 请求会自动显示/隐藏加载状态
```

### 通知插件

#### 基础用法
```typescript
import { Notification } from '@/plugins/notification';

// 显示通知
Notification.success({
  title: '成功',
  message: '操作已完成'
});

// 错误通知
Notification.error({
  title: '错误',
  message: '操作失败'
});
```

## 📝 最佳实践

### 1. 错误处理
```typescript
// 统一的错误处理
const handleRequest = async () => {
  try {
    const requestService = DIContainer.getRequestInstance();
    const data = await requestService.get('/api/data');
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    Message.error('请求失败，请重试');
    throw error;
  }
};
```

### 2. 类型安全
```typescript
// 定义接口
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 使用类型
const response = await requestService.get<ApiResponse<User[]>>('/api/users');
const users = response.data;
```

### 3. 状态管理
```typescript
// 使用Computed优化性能
const userStore = useUserStore();
const userName = computed(() => userStore.user?.name);
const isLoggedIn = computed(() => !!userStore.user);
```

### 4. 组件设计
```typescript
// 使用组合式API
export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const requestService = DIContainer.getRequestInstance();

    const loadData = async () => {
      const data = await requestService.get('/api/data');
      // 处理数据
    };

    onMounted(() => {
      loadData();
    });

    return {
      // 返回需要的数据和方法
    };
  }
});
```

---

*更多示例和详细说明，请参考项目源码和测试文件。*

