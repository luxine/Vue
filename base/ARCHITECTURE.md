# Vue Template 架构设计文档

## 📋 目录

- [设计理念](#设计理念)
- [架构概览](#架构概览)
- [核心模块](#核心模块)
- [数据流](#数据流)
- [依赖注入](#依赖注入)
- [网络请求架构](#网络请求架构)
- [存储架构](#存储架构)
- [插件系统](#插件系统)
- [状态管理](#状态管理)
- [WebSocket架构](#websocket架构)
- [多平台适配](#多平台适配)
- [性能优化](#性能优化)

## 🎯 设计理念

### 1. 分层架构
项目采用清晰的分层架构，每一层都有明确的职责：

```
┌─────────────────────────────────────┐
│            Presentation Layer       │  ← Vue组件层
├─────────────────────────────────────┤
│            Business Layer           │  ← 业务逻辑层
├─────────────────────────────────────┤
│            Service Layer            │  ← 服务层
├─────────────────────────────────────┤
│            Adapter Layer            │  ← 适配器层
├─────────────────────────────────────┤
│            Infrastructure Layer     │  ← 基础设施层
└─────────────────────────────────────┘
```

### 2. 依赖倒置原则
- 高层模块不依赖低层模块
- 抽象不依赖具体实现
- 具体实现依赖抽象

### 3. 单一职责原则
每个模块只负责一个功能领域，便于维护和测试。

## 🏗️ 架构概览

### 整体架构图
```
┌─────────────────────────────────────────────────────────────┐
│                        Vue Application                      │
├─────────────────────────────────────────────────────────────┤
│  Router  │  Pinia  │  Plugins  │  Components  │  Views      │
├─────────────────────────────────────────────────────────────┤
│                    Dependency Injection                     │
├─────────────────────────────────────────────────────────────┤
│  Request Service  │  Store Service  │  WebSocket Service   │
├─────────────────────────────────────────────────────────────┤
│                    Adapter Layer                            │
├─────────────────────────────────────────────────────────────┤
│  HTTP Client  │  LocalStorage  │  IndexedDB  │  WebSocket   │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 核心模块

### 1. 依赖注入容器 (DIContainer)

#### 设计目标
- 统一服务管理
- 确保全局单例
- 降低模块间耦合

#### 实现原理
```typescript
class DIContainer {
  private static _requestInstance: IRequestService | null = null;
  private static _storeInstance: IStoreService | null = null;
  
  // 注入服务
  public static injectRequestsModel<T extends IRequestService>(
    service: ServiceConstructor<T> | T
  ): void
  
  // 获取实例
  public static getRequestInstance(): IRequestService
}
```

#### 使用方式
```typescript
// 应用启动时注入服务
DIContainer.injectStoreModel(LocalStorageService);
DIContainer.injectRequestsModel(apiService);

// 在组件中使用
const requestService = DIContainer.getRequestInstance();
const storeService = DIContainer.getStoreInstance();
```

### 2. 网络请求架构

#### 三层架构设计

```
┌─────────────────────────────────────┐
│         ApiRequestService           │  ← API封装层
│   (统一请求头、认证、错误处理)        │
├─────────────────────────────────────┤
│      BusinessRequestService         │  ← 业务逻辑层
│   (业务错误处理、状态码处理)          │
├─────────────────────────────────────┤
│        BaseRequestService           │  ← 底层实现层
│   (HTTP请求、参数处理、响应解析)      │
└─────────────────────────────────────┘
```

#### 各层职责

**BaseRequestService (底层实现层)**
- 基于 `ky` 库的HTTP请求实现
- 请求参数处理和URL构建
- 响应数据解析
- 超时和重试机制

**BusinessRequestService (业务逻辑层)**
- 统一响应格式处理
- 业务错误码处理 (401、500等)
- 用户认证失效处理
- 错误消息提示

**ApiRequestService (API封装层)**
- 统一请求头设置
- 认证token管理
- 请求拦截和响应拦截
- 环境配置适配

#### 请求流程
```
Vue组件
    ↓
RequestService.get(...)
    ↓
DIContainer.getRequestInstance()
    ↓
ApiRequestService.get(...)
    ↓
BusinessRequestService.get(...)
    ↓
BaseRequestService.get(...)
    ↓
ky.get(...) → HTTP请求
```

### 3. 存储架构

#### 存储抽象接口
```typescript
interface IStoreService {
  set<T>(key: string, value: T): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

#### 存储实现

**LocalStorageService**
- 基于浏览器localStorage
- 适合小容量数据存储
- 同步操作，性能较好

**IndexDBStorageService**
- 基于IndexedDB
- 适合大容量数据存储
- 异步操作，支持复杂查询

#### 使用方式
```typescript
// 通过依赖注入获取存储服务
const storeService = DIContainer.getStoreInstance();

// 存储数据
await storeService.set('user', userData);

// 读取数据
const user = await storeService.get<User>('user');
```

## 📊 数据流

### 1. 请求数据流
```
用户操作 → Vue组件 → RequestService → DIContainer → 
BusinessService → BaseService → HTTP请求 → 
响应数据 → 业务处理 → 组件更新
```

### 2. 存储数据流
```
用户操作 → Vue组件 → StoreService → DIContainer → 
存储适配器 → 本地存储 → 数据持久化
```

### 3. 状态管理数据流
```
用户操作 → Vue组件 → Pinia Store → 
__init__ Hook → 异步初始化 → 状态更新 → 组件响应
```

## 🔌 插件系统

### 插件架构
```
┌─────────────────────────────────────┐
│            Plugin Manager           │
├─────────────────────────────────────┤
│  i18n  │  message  │  loading  │ ... │
├─────────────────────────────────────┤
│            Vue Application          │
└─────────────────────────────────────┘
```

### 核心插件

**国际化插件 (i18n)**
- 多语言支持
- 动态语言切换
- 按需加载语言包

**消息提示插件 (message)**
- 统一消息通知
- 多种消息类型
- 自动消失机制

**加载状态插件 (loading)**
- 全局加载状态
- 请求拦截器集成
- 自定义加载组件

**Pinia Hooks插件**
- 状态管理生命周期
- 自动初始化机制
- 异步状态管理

## 🎮 状态管理

### Pinia Hooks设计

#### 核心概念
- **__init__**: 仓库激活时自动调用的初始化函数
- **__initState__**: 维护初始化状态的Ref<boolean>
- **__waitInit__**: 等待初始化完成的异步函数

#### 使用模式
```typescript
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const __initState__ = ref(false);
  
  const __init__ = async () => {
    // 初始化逻辑
    const userData = await loadUserData();
    user.value = userData;
    __initState__.value = true;
  };
  
  return { user, __init__, __initState__ };
});
```

#### 生命周期
```
Store创建 → __init__执行 → 异步初始化 → __initState__更新 → 组件响应
```

## 🌐 WebSocket架构

### WebSocket模块设计

#### 核心类
```typescript
class WsModules {
  // 连接管理
  connect(): void
  close(): void
  
  // 事件管理
  on(type: string, callback: WsEventCallback): void
  off(type: string, callback: WsEventCallback): void
  
  // 消息发送
  send(event: string, name: string, payload?: unknown): void
}
```

#### 特性
- 自动重连机制
- 事件驱动架构
- 连接状态管理
- 错误处理

#### 使用方式
```typescript
// 初始化WebSocket
const ws = initWebSocket('ws://localhost:8080');

// 监听事件
ws.on('message', (data) => {
  console.log('收到消息:', data);
});

// 发送消息
ws.send('chat', 'user', { message: 'Hello!' });
```

## 🔄 多平台适配

### 平台检测
```typescript
const platform = (import.meta.env.VITE_APP_PLATFORM || 'web').toLowerCase();
```

### 路由适配
```typescript
function resolveHistory() {
  const base = import.meta.env.BASE_URL;
  if (platform === 'electron') {
    return createWebHashHistory(base); // Electron使用hash模式
  }
  return createWebHistory(base); // Web使用history模式
}
```

### API地址适配
```typescript
public static getApiBaseURL(env?: 'web' | 'desktop') {
  const isElectron = import.meta.env.VITE_APP_PLATFORM === 'electron';
  
  if (isElectron) {
    return {
      HTTP: ELECTRON_BASE_URL,
      WS: ELECTRON_WS_BASE_URL,
    };
  }
  
  return {
    HTTP: VITE_BASE_URL,
    WS: VITE_WS_BASE_URL,
  };
}
```

## ⚡ 性能优化

### 1. 代码分割
```typescript
// 路由懒加载
component: () => import('@/views/Home/Welcome.vue')

// 动态导入
const modules = import.meta.glob('/src/stores/**/*.ts');
```

### 2. 构建优化
```typescript
// Vite配置
build: {
  target: 'esnext',
  sourcemap: true,
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      }
    }
  }
}
```

### 3. 缓存策略
- 依赖注入确保服务单例
- 组件缓存和状态缓存
- 请求结果缓存

### 4. 按需加载
- 组件按需导入
- 语言包按需加载
- 插件按需注册

## 🧪 测试策略

### 单元测试
- 工具函数测试
- 服务层测试
- 组件测试

### 集成测试
- API接口测试
- 状态管理测试
- 路由测试

### E2E测试
- 用户操作流程测试
- 跨平台兼容性测试

## 📈 监控和日志

### 错误监控
- 全局错误捕获
- 网络请求错误
- 组件错误边界

### 性能监控
- 页面加载时间
- API响应时间
- 内存使用情况

### 用户行为追踪
- 页面访问统计
- 功能使用统计
- 错误上报

## 🔮 未来规划

### 短期目标
- [ ] 完善单元测试覆盖
- [ ] 添加更多UI组件
- [ ] 优化构建性能

### 中期目标
- [ ] 支持更多平台
- [ ] 微前端架构支持
- [ ] 服务端渲染支持

### 长期目标
- [ ] 低代码平台集成
- [ ] AI辅助开发
- [ ] 云原生部署支持

---

*本文档持续更新中，如有疑问或建议，请提交Issue或Pull Request。*
