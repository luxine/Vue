# 插件系统 (Plugins)

插件系统为应用提供模块化的功能扩展，包括国际化、消息提示、加载状态、用户活动跟踪等核心功能。

## 📁 目录结构

```
plugins/
├── i18n.ts              # 国际化插件
├── loading.ts           # 加载状态插件
├── message.ts           # 消息提示插件
├── notification.ts      # 通知插件
├── piniahook.ts         # Pinia 钩子插件
├── userActivity.ts      # 用户活动跟踪插件
└── readme.md           # 本文档
```

## 🌍 国际化插件 (i18n.ts)

### 功能特性
- 多语言支持
- 动态语言切换
- 语言包懒加载
- 本地化持久化
- 浏览器语言检测

### 使用示例

```typescript
import { setupI18n, setLocale, getLocale } from '@/plugins/i18n';

// 在 main.ts 中初始化
setupI18n(app);

// 切换语言
await setLocale('zh');

// 获取当前语言
const currentLocale = getLocale();

// 获取可用语言列表
const availableLocales = getAvailableLocales();
```

### 语言包配置
```json
// src/assets/locales/zh.json
{
  "common": {
    "save": "保存",
    "cancel": "取消",
    "delete": "删除"
  },
  "user": {
    "profile": "用户资料",
    "settings": "设置"
  }
}
```

### API 参考
```typescript
// 设置国际化
export function setupI18n(app: App): void

// 切换语言
export async function setLocale(lang: string): Promise<void>

// 获取当前语言
export function getLocale(): string

// 获取可用语言列表
export function getAvailableLocales(): string[]
```

## 💬 消息提示插件 (message.ts)

### 功能特性
- 统一的消息提示接口
- 多种消息类型支持
- 自动消失配置
- 全局消息管理

### 使用示例

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

// 自定义配置
Message.success('保存成功', {
  duration: 3000,
  showClose: true
});
```

### 消息类型
- `success`: 成功消息
- `error`: 错误消息
- `warning`: 警告消息
- `info`: 信息消息

## ⏳ 加载状态插件 (loading.ts)

### 功能特性
- 全局加载状态管理
- 组件级加载控制
- 自动加载指示器
- 加载超时处理

### 使用示例

```typescript
import { initLoading } from '@/plugins/loading';

// 在 main.ts 中初始化
initLoading(app);

// 在组件中使用
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    const data = await api.getData();
    // 处理数据
  } finally {
    loading.value = false;
  }
};
```

### 全局加载控制
```typescript
// 显示全局加载
showGlobalLoading();

// 隐藏全局加载
hideGlobalLoading();

// 带消息的加载
showGlobalLoading('正在加载数据...');
```

## 🔔 通知插件 (notification.ts)

### 功能特性
- 桌面通知支持
- 通知权限管理
- 自定义通知样式
- 通知队列管理

### 使用示例

```typescript
import { Notification } from '@/plugins/notification';

// 发送通知
Notification.send({
  title: '新消息',
  body: '您有一条新的消息',
  icon: '/icon.png'
});

// 请求通知权限
Notification.requestPermission();

// 检查通知权限
const hasPermission = Notification.hasPermission();
```

## 🎯 Pinia 钩子插件 (piniahook.ts)

### 功能特性
- 自动初始化管理
- 状态同步控制
- 异步操作支持
- 生命周期钩子

### 使用示例

```typescript
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    __initState__: false
  }),

  actions: {
    // 自动调用的初始化方法
    async __init__() {
      const user = await fetchUserProfile();
      this.user = user;
    },

    // 等待初始化完成
    async waitForInit() {
      if (!this.__initState__) {
        await this.__init__();
      }
      return this.user;
    }
  }
});
```

### 钩子类型
- `__init__`: 仓库激活时自动调用
- `__initState__`: 维护初始化状态
- `__waitInit__`: 等待初始化完成

## 👤 用户活动跟踪插件 (userActivity.ts)

### 功能特性
- 用户行为跟踪
- 活动时间统计
- 空闲状态检测
- 数据上报支持

### 使用示例

```typescript
import { UserActivity } from '@/plugins/userActivity';

// 初始化活动跟踪
UserActivity.init({
  idleTimeout: 300000, // 5分钟空闲
  onIdle: () => {
    console.log('用户已空闲');
  },
  onActive: () => {
    console.log('用户已激活');
  }
});

// 手动记录活动
UserActivity.recordActivity('button_click');

// 获取活动统计
const stats = UserActivity.getStats();
```

## 🔧 插件配置

### 全局配置
```typescript
// 在 main.ts 中配置插件
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 初始化插件
setupI18n(app);
initLoading(app);
app.use(messagePlugin);

app.mount('#app');
```

### 环境配置
```typescript
// 根据环境配置插件行为
if (Utils.isDev()) {
  // 开发环境配置
  Message.setConfig({
    duration: 5000,
    showClose: true
  });
} else {
  // 生产环境配置
  Message.setConfig({
    duration: 3000,
    showClose: false
  });
}
```

## 🎯 最佳实践

### 1. 插件初始化顺序
```typescript
// ✅ 推荐：按依赖顺序初始化
setupI18n(app);        // 1. 国际化
initLoading(app);      // 2. 加载状态
app.use(messagePlugin); // 3. 消息提示
app.use(notificationPlugin); // 4. 通知
```

### 2. 错误处理
```typescript
// ✅ 推荐：插件错误处理
try {
  await setLocale('zh');
} catch (error) {
  console.error('语言切换失败:', error);
  Message.error('语言切换失败');
}
```

### 3. 性能优化
```typescript
// ✅ 推荐：懒加载语言包
const loadLanguage = async (locale: string) => {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await import(`../assets/locales/${locale}.json`);
    i18n.global.setLocaleMessage(locale, messages.default);
  }
};
```

## 🔄 扩展插件

### 创建自定义插件
```typescript
// 定义插件接口
interface CustomPlugin {
  install(app: App): void;
  config?: PluginConfig;
}

// 实现插件
const customPlugin: CustomPlugin = {
  install(app) {
    // 插件安装逻辑
    app.config.globalProperties.$custom = {
      // 自定义方法
    };
  },
  
  config: {
    // 插件配置
  }
};

// 使用插件
app.use(customPlugin);
```

### 插件组合
```typescript
// 组合多个插件
const pluginGroup = {
  install(app: App) {
    app.use(plugin1);
    app.use(plugin2);
    app.use(plugin3);
  }
};

app.use(pluginGroup);
```

## 🔍 调试技巧

### 插件状态检查
```typescript
// 检查插件是否已安装
console.log('i18n installed:', !!app.config.globalProperties.$i18n);
console.log('message installed:', !!app.config.globalProperties.$message);
```

### 插件配置调试
```typescript
// 调试插件配置
if (Utils.isDev()) {
  console.log('Plugin configs:', {
    i18n: i18n.global.locale.value,
    message: Message.getConfig(),
    loading: Loading.getConfig()
  });
}
```

## 📚 相关文档

- [Vue 插件开发指南](https://vuejs.org/guide/reusability/plugins.html)
- [Pinia 插件文档](https://pinia.vuejs.org/core-concepts/plugins.html)
- [Vue I18n 文档](https://vue-i18n.intlify.dev/)
- [Element Plus 消息组件](https://element-plus.org/en-US/component/message.html)
