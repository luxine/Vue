# Vue 通用项目模板

一个功能完整、架构清晰的 Vue 3 + TypeScript 项目模板，支持多平台部署（Web、Desktop、Mobile）。

## 🚀 特性

### 核心技术栈
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 下一代前端构建工具
- **Pinia** - Vue 状态管理库
- **Vue Router** - Vue.js 官方路由管理器
- **Element Plus** - Vue 3 组件库
- **Tailwind CSS** - 实用优先的 CSS 框架

### 多平台支持
- 🌐 **Web** - 现代浏览器支持
- 🖥️ **Desktop** - Electron 桌面应用
- 📱 **Mobile** - Capacitor 移动应用

### 架构特性
- 🔧 **依赖注入容器** - 统一的服务管理
- 🌐 **网络请求抽象层** - 可扩展的 HTTP 客户端
- 💾 **存储服务抽象** - 统一的数据存储接口
- 🌍 **国际化支持** - 多语言切换
- 🔌 **插件系统** - 模块化的功能扩展
- 🎯 **自定义 Hooks** - 可复用的业务逻辑
- 🔒 **水印指令** - 内容保护
- 📊 **WebSocket 支持** - 实时通信

## 📁 项目结构

```
src/
├── adapters/           # 适配器层
│   ├── requests/       # 网络请求适配器
│   └── store/          # 存储适配器
├── basis/              # 基础设施
│   ├── DI/             # 依赖注入容器
│   ├── RequestService/ # 请求服务基类
│   └── StoreService/   # 存储服务基类
├── components/         # 公共组件
├── directives/         # 自定义指令
├── hooks/              # 自定义 Hooks
├── interface/          # 接口定义
├── middleware/         # 中间件
├── plugins/            # 插件
├── router/             # 路由配置
├── shared/             # 共享工具
├── styles/             # 样式文件
├── views/              # 页面组件
├── ws/                 # WebSocket 模块
└── main.ts            # 应用入口
```

## 🛠️ 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖
```bash
cd base
pnpm install
```

### 开发模式
```bash
# Web 开发
pnpm dev

# Desktop 开发
pnpm dev/desktop
```

### 构建部署
```bash
# Web 构建
pnpm build

# Desktop 构建
pnpm build/desktop

# Android 构建
pnpm build/android
```

## 🏗️ 架构设计

### 依赖注入容器 (DIContainer)
提供统一的服务管理，支持请求服务和存储服务的注入：

```typescript
// 注入服务
DIContainer.injectRequestsModel(new ApiRequestService());
DIContainer.injectStoreModel(new LocalStorageService());

// 获取服务实例
const requestService = DIContainer.getRequestInstance();
const storeService = DIContainer.getStoreInstance();
```

### 网络请求架构
采用分层设计，支持业务逻辑与底层请求分离：

```
Vue 组件 / 业务代码
    ↓
RequestService.get(...)  ←—— 静态入口
    ↓
DIContainer → 拿到注入的 BusinessService 实例
    ↓
BusinessService.get(...) —— 转发给 BusinessRequestService
    ↓
BusinessRequestService.get(...) —— 调用 BaseRequestService，拿到 ServerResponse<T> 并统一处理
    ↓
BaseRequestService.get(...) —— 使用底层请求库发起原生 HTTP 请求
```

### 存储服务抽象
统一的存储接口，支持多种存储后端：

```typescript
interface IStoreService {
  set<T>(key: string, value: T): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

### Pinia Hooks 系统
自定义的 Pinia 插件，支持仓库初始化管理：

- `__init__` Hooks: 仓库被激活时自动调用
- `__initState__` Hooks: 维护仓库初始化状态
- `__waitInit__` Hooks: 等待初始化完成的异步操作

## 🔧 配置说明

### 环境变量
项目支持多环境配置，主要环境变量：

```bash
# API 配置
VITE_BASE_URL=http://localhost:3000/api
VITE_WS_BASE_URL=ws://localhost:3000/ws
VITE_TIMEOUT=10000
VITE_RETRY_COUNT=3

# 平台配置
VITE_APP_PLATFORM=web|electron|mobile

# 构建配置
VITE_BASE_PATH=/
```

### Vite 配置
- 自动导入 Vue 相关 API
- Element Plus 组件自动导入
- TypeScript 类型检查
- 构建分析和可视化
- WebAssembly 支持

## 📦 可用脚本

```bash
# 开发
pnpm dev              # Web 开发服务器
pnpm dev/desktop      # Desktop 开发模式

# 构建
pnpm build            # Web 生产构建
pnpm build/desktop    # Desktop 应用构建
pnpm build/android    # Android 应用构建

# 代码质量
pnpm lint/fix         # ESLint 修复
pnpm format           # Prettier 格式化
pnpm style            # 代码风格检查
pnpm fix              # 完整修复流程

# 预览
pnpm preview          # 预览生产构建
```

## 🌍 国际化

项目内置国际化支持，支持动态语言切换：

```typescript
import { setLocale, getLocale } from '@/plugins/i18n';

// 切换语言
await setLocale('zh');

// 获取当前语言
const currentLocale = getLocale();
```

支持的语言包位于 `src/assets/locales/` 目录。

## 🔌 插件系统

### 消息插件
统一的消息提示管理。

### 加载插件
全局加载状态管理。

### 用户活动插件
用户行为跟踪和分析。

## 🎯 自定义 Hooks

### 初始化 Hook
```typescript
// 在 Pinia store 中使用
export const useMyStore = defineStore('my', {
  state: () => ({
    data: null,
    __initState__: false
  }),
  
  actions: {
    async __init__() {
      // 初始化逻辑
      this.data = await fetchData();
    }
  }
});
```

## 🔒 安全特性

### 水印指令
内置水印功能，保护敏感内容：

```vue
<template>
  <div v-watermark="watermarkConfig">
    <!-- 受保护的内容 -->
  </div>
</template>
```

## 📱 多平台支持

### Web 平台
- 现代浏览器支持
- PWA 支持
- 响应式设计

### Desktop 平台 (Electron)
- 跨平台桌面应用
- 原生系统集成
- 自动更新支持

### Mobile 平台 (Capacitor)
- iOS 和 Android 支持
- 原生功能访问
- 应用商店发布

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如果您遇到问题或有建议，请：

1. 查看 [Issues](../../issues) 页面
2. 创建新的 Issue
3. 联系项目维护者

---

**享受开发！** 🎉