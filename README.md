# Vue Template - 现代化Vue3项目模板

[![Vue](https://img.shields.io/badge/Vue-3.5+-green.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0+-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

一个基于 Vue 3 + TypeScript + Vite 的现代化项目模板，支持多平台部署（Web、Electron、Capacitor），内置完整的开发工具链和最佳实践。

## 🚀 快速开始
```bash
npm init @luxine/vue@latest
```

## ✨ 核心特性

### 🚀 技术栈
- **Vue 3.5** - 渐进式JavaScript框架
- **TypeScript 5.8** - 类型安全的JavaScript超集
- **Vite 6** - 下一代前端构建工具
- **Tailwind CSS v4** - 实用优先的CSS框架
- **Pinia** - Vue的状态管理库
- **Vue Router 4** - Vue.js官方路由管理器
- **Element Plus** - Vue 3组件库

### 🌐 多平台支持
- **Web应用** - 现代化的单页应用
- **Electron桌面应用** - 跨平台桌面应用
- **Capacitor移动应用** - 原生移动应用

### 🏗️ 架构设计
- **依赖注入容器** - 统一的服务管理
- **网络请求抽象层** - 三层架构设计
- **存储服务抽象** - 支持多种存储方式
- **插件系统** - 可扩展的插件架构

## 📦 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0


### 开发模式
```bash
# Web开发
pnpm dev

# Electron桌面开发
pnpm dev/desktop

# 移动端开发
pnpm dev/mobile
```

### 构建部署
```bash
# Web生产构建
pnpm build

# Electron桌面应用构建
pnpm build/desktop

# Android移动应用构建
pnpm build/android
```

## 🏛️ 项目架构

### 目录结构
```
src/
├── adapters/          # 适配器层
│   ├── requests/      # 网络请求适配器
│   └── store/         # 存储适配器
├── basis/             # 基础架构
│   ├── DI/           # 依赖注入容器
│   ├── RequestService/ # 请求服务
│   └── StoreService/   # 存储服务
├── interface/         # 接口定义
├── plugins/           # 插件系统
├── views/             # 页面组件
├── components/        # 通用组件
├── router/            # 路由配置
├── shared/            # 工具函数
├── ws/                # WebSocket模块
└── hooks/             # 自定义Hooks
```

### 核心模块

#### 1. 依赖注入容器 (DIContainer)
统一的服务管理，确保全局单例模式：
```typescript
// 注入服务
DIContainer.injectStoreModel(LocalStorageService);
DIContainer.injectRequestsModel(apiService);

// 使用服务
const apiResult = await RequestService.get('/api/version')
const storeResult = await StoreService.get('version')
```

#### 2. 网络请求抽象层
三层架构设计，职责分离：
- **BaseRequestService**: 底层HTTP请求实现
- **BusinessRequestService**: 业务逻辑处理层
- **ApiRequestService**: API接口封装层

#### 3. 存储服务抽象
统一的数据存储接口：
- **LocalStorageService**: 基于localStorage的本地存储
- **IndexDBStorageService**: 基于IndexedDB的大容量存储

#### 4. 插件系统
可扩展的插件架构：
- 国际化 (i18n)
- 消息提示系统
- 加载状态管理
- 通知系统
- Pinia Hooks生命周期管理
- 用户活动追踪

## 🔧 开发工具

### 代码质量
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查
- **Lint-staged** - 预提交检查

### 构建工具
- **Vite** - 快速构建
- **Electron Builder** - 桌面应用打包
- **Capacitor CLI** - 移动应用打包

## 📚 使用指南

### 网络请求
```typescript
// 使用依赖注入的请求服务
const requestService = DIContainer.getRequestInstance();

// GET请求
const data = await requestService.get<User[]>('/api/users');

// POST请求
const result = await requestService.post<User>('/api/users', userData);
```

### 数据存储
```typescript
// 使用依赖注入的存储服务
const storeService = DIContainer.getStoreInstance();

// 存储数据
await storeService.set('user', userData);

// 读取数据
const user = await storeService.get<User>('user');
```

### WebSocket通信
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

### Pinia状态管理
```typescript
// 使用自定义Hooks
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  
  // 初始化Hook
  const __init__ = async () => {
    // 初始化逻辑
  };
  
  // 等待初始化Hook
  const __initState__ = ref(false);
  
  return { user, __init__, __initState__ };
});
```

## 🚀 部署指南

### Web部署
```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### Electron桌面应用
```bash
# 构建桌面应用
pnpm build/desktop

# 构建结果位于 .builds/windows/ 目录
```

### 移动应用
```bash
# 构建Android应用
pnpm build/android

# 使用Android Studio打开 android/ 目录进行调试
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者们！

---

**Luxine Vue Template** - 让Vue3开发更简单、更高效！