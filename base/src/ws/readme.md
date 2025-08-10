# WebSocket 模块 (WS)

WebSocket 模块提供实时通信功能，支持连接管理、事件处理、自动重连等特性。

## 📁 目录结构

```
ws/
├── ws.ts                    # WebSocket 主模块
├── webSocketModules.ts      # WebSocket 核心类
├── handleWebSocketEvent.ts  # 事件处理器
└── readme.md               # 本文档
```

## 🔌 核心功能

### 1. 连接管理
- 自动连接建立
- 连接状态监控
- 自动重连机制
- 连接超时处理

### 2. 事件处理
- 消息发送和接收
- 事件类型定义
- 事件处理器注册
- 错误处理

### 3. 状态管理
- 连接状态跟踪
- 心跳检测
- 连接健康检查
- 状态变化通知

## 🚀 快速开始

### 初始化 WebSocket
```typescript
import { initWebSocket, useWebSocket } from '@/ws/ws';

// 初始化 WebSocket 连接
const wsClient = initWebSocket('ws://localhost:8080/ws');

// 在组件中使用
const ws = useWebSocket();
```

### 发送消息
```typescript
import { useWebSocket } from '@/ws/ws';

const ws = useWebSocket();

// 发送消息
ws.send({
  type: 'chat_message',
  data: {
    message: 'Hello, World!',
    userId: 123
  }
});
```

### 监听事件
```typescript
import { useWebSocket } from '@/ws/ws';

const ws = useWebSocket();

// 监听特定事件
ws.on('chat_message', (data) => {
  console.log('收到聊天消息:', data);
});

// 监听连接状态变化
ws.on('connected', () => {
  console.log('WebSocket 已连接');
});

ws.on('disconnected', () => {
  console.log('WebSocket 已断开');
});
```

## 📡 WebSocket 模块类

### WsModules
核心 WebSocket 管理类，提供完整的 WebSocket 功能。

#### 构造函数
```typescript
constructor(options: {
  url: string;
  protocols?: string | string[];
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
})
```

#### 主要方法
```typescript
// 连接管理
connect(): Promise<void>
disconnect(): void
reconnect(): Promise<void>

// 消息发送
send(data: WsEvent): void
sendRaw(data: string | ArrayBuffer): void

// 事件监听
on(event: string, handler: (data: any) => void): void
off(event: string, handler?: (data: any) => void): void
once(event: string, handler: (data: any) => void): void

// 状态查询
isConnected(): boolean
getState(): WsState
```

#### 配置选项
```typescript
interface WsOptions {
  url: string;                    // WebSocket 服务器地址
  protocols?: string | string[];  // 子协议
  reconnectInterval?: number;     // 重连间隔（毫秒）
  maxReconnectAttempts?: number;  // 最大重连次数
  heartbeatInterval?: number;     // 心跳间隔（毫秒）
}
```

## 🎯 事件处理

### 事件类型定义
```typescript
interface WsEvent {
  type: string;        // 事件类型
  data: unknown;       // 事件数据
  timestamp: number;   // 时间戳
}
```

### 内置事件类型
- `connected`: 连接建立
- `disconnected`: 连接断开
- `error`: 连接错误
- `message`: 收到消息
- `reconnecting`: 正在重连
- `reconnected`: 重连成功

### 自定义事件处理
```typescript
import { useWebSocket } from '@/ws/ws';

const ws = useWebSocket();

// 注册自定义事件处理器
ws.on('user_joined', (data) => {
  console.log('用户加入:', data.user);
  showNotification(`${data.user.name} 加入了聊天室`);
});

ws.on('user_left', (data) => {
  console.log('用户离开:', data.user);
  showNotification(`${data.user.name} 离开了聊天室`);
});

ws.on('chat_message', (data) => {
  console.log('聊天消息:', data);
  addMessageToChat(data.message);
});
```

## 🔄 自动重连机制

### 重连配置
```typescript
import { initWebSocket } from '@/ws/ws';

// 配置重连参数
const wsClient = initWebSocket('ws://localhost:8080/ws', {
  reconnectInterval: 3000,      // 3秒重连间隔
  maxReconnectAttempts: 5,      // 最多重连5次
  heartbeatInterval: 30000      // 30秒心跳间隔
});
```

### 重连事件监听
```typescript
const ws = useWebSocket();

// 监听重连事件
ws.on('reconnecting', (attempt) => {
  console.log(`正在尝试重连... (第 ${attempt} 次)`);
  showLoadingMessage('正在重新连接...');
});

ws.on('reconnected', () => {
  console.log('重连成功');
  hideLoadingMessage();
  showSuccessMessage('连接已恢复');
});

ws.on('reconnect_failed', () => {
  console.log('重连失败');
  showErrorMessage('连接失败，请检查网络');
});
```

## 💓 心跳检测

### 心跳机制
WebSocket 模块内置心跳检测功能，确保连接健康：

```typescript
// 自动心跳检测
const wsClient = initWebSocket('ws://localhost:8080/ws', {
  heartbeatInterval: 30000  // 30秒发送一次心跳
});

// 心跳事件监听
ws.on('heartbeat', () => {
  console.log('发送心跳包');
});

ws.on('heartbeat_timeout', () => {
  console.log('心跳超时，准备重连');
});
```

## 🛡️ 错误处理

### 错误类型
```typescript
// WebSocket 错误类型
enum WsErrorType {
  CONNECTION_FAILED = 'connection_failed',
  MESSAGE_SEND_FAILED = 'message_send_failed',
  HEARTBEAT_TIMEOUT = 'heartbeat_timeout',
  RECONNECT_FAILED = 'reconnect_failed'
}
```

### 错误处理示例
```typescript
import { useWebSocket } from '@/ws/ws';

const ws = useWebSocket();

// 监听错误事件
ws.on('error', (error) => {
  console.error('WebSocket 错误:', error);
  
  switch (error.type) {
    case 'connection_failed':
      showErrorMessage('连接失败，请检查网络');
      break;
    case 'message_send_failed':
      showWarningMessage('消息发送失败，请重试');
      break;
    case 'heartbeat_timeout':
      showInfoMessage('连接超时，正在重连...');
      break;
    default:
      showErrorMessage('未知错误');
  }
});
```

## 🔧 高级用法

### 消息队列
```typescript
import { useWebSocket } from '@/ws/ws';

const ws = useWebSocket();

// 离线消息队列
const messageQueue: WsEvent[] = [];

// 发送消息（带队列）
const sendMessageWithQueue = (message: WsEvent) => {
  if (ws.isConnected()) {
    ws.send(message);
  } else {
    messageQueue.push(message);
    console.log('消息已加入队列，等待连接恢复');
  }
};

// 连接恢复后发送队列消息
ws.on('connected', () => {
  while (messageQueue.length > 0) {
    const message = messageQueue.shift();
    if (message) {
      ws.send(message);
    }
  }
});
```

### 消息确认机制
```typescript
import { useWebSocket } from '@/ws/ws';

const ws = useWebSocket();

// 消息确认映射
const pendingMessages = new Map<string, {
  message: WsEvent;
  timestamp: number;
  retries: number;
}>();

// 发送带确认的消息
const sendWithAck = (message: WsEvent, timeout = 5000) => {
  const messageId = Utils.generateRandomString();
  const messageWithId = {
    ...message,
    id: messageId,
    timestamp: Date.now()
  };
  
  // 添加到待确认列表
  pendingMessages.set(messageId, {
    message: messageWithId,
    timestamp: Date.now(),
    retries: 0
  });
  
  // 发送消息
  ws.send(messageWithId);
  
  // 设置超时检查
  setTimeout(() => {
    const pending = pendingMessages.get(messageId);
    if (pending && pending.retries < 3) {
      pending.retries++;
      ws.send(messageWithId);
    } else if (pending) {
      pendingMessages.delete(messageId);
      console.error('消息发送失败:', messageWithId);
    }
  }, timeout);
};

// 处理确认消息
ws.on('ack', (data) => {
  const { messageId } = data;
  pendingMessages.delete(messageId);
  console.log('消息已确认:', messageId);
});
```

### 连接池管理
```typescript
import { initWebSocket } from '@/ws/ws';

// WebSocket 连接池
class WsConnectionPool {
  private connections = new Map<string, any>();
  
  // 获取或创建连接
  getConnection(url: string, options?: WsOptions) {
    if (!this.connections.has(url)) {
      const connection = initWebSocket(url, options);
      this.connections.set(url, connection);
    }
    return this.connections.get(url);
  }
  
  // 关闭指定连接
  closeConnection(url: string) {
    const connection = this.connections.get(url);
    if (connection) {
      connection.disconnect();
      this.connections.delete(url);
    }
  }
  
  // 关闭所有连接
  closeAll() {
    this.connections.forEach((connection) => {
      connection.disconnect();
    });
    this.connections.clear();
  }
}

// 使用连接池
const wsPool = new WsConnectionPool();
const chatWs = wsPool.getConnection('ws://localhost:8080/chat');
const notificationWs = wsPool.getConnection('ws://localhost:8080/notifications');
```

## 🎯 最佳实践

### 1. 连接管理
```typescript
// ✅ 推荐：在应用启动时初始化
// main.ts
const wsClient = initWebSocket(Utils.getApiBaseURL().WS);

// ✅ 推荐：在应用关闭时清理
window.addEventListener('beforeunload', () => {
  wsClient.disconnect();
});
```

### 2. 事件处理
```typescript
// ✅ 推荐：使用类型安全的事件处理
interface ChatMessage {
  id: string;
  userId: number;
  content: string;
  timestamp: number;
}

ws.on('chat_message', (data: ChatMessage) => {
  // 类型安全的事件处理
  addMessageToChat(data);
});

// ❌ 避免：使用 any 类型
ws.on('chat_message', (data: any) => {
  // 不安全的类型处理
});
```

### 3. 错误处理
```typescript
// ✅ 推荐：全面的错误处理
ws.on('error', (error) => {
  console.error('WebSocket 错误:', error);
  
  // 根据错误类型采取不同措施
  if (error.type === 'connection_failed') {
    showReconnectButton();
  } else if (error.type === 'heartbeat_timeout') {
    // 自动重连，无需用户干预
  }
});
```

### 4. 性能优化
```typescript
// ✅ 推荐：避免频繁的事件监听器注册
// 在组件挂载时注册一次
onMounted(() => {
  ws.on('message', handleMessage);
});

// 在组件卸载时清理
onUnmounted(() => {
  ws.off('message', handleMessage);
});
```

## 🔍 调试技巧

### 开发环境调试
```typescript
// 启用详细日志
if (Utils.isDev()) {
  ws.on('*', (event, data) => {
    console.log(`[WebSocket] ${event}:`, data);
  });
}
```

### 连接状态监控
```typescript
// 监控连接状态
setInterval(() => {
  console.log('WebSocket 状态:', ws.getState());
  console.log('连接状态:', ws.isConnected());
}, 5000);
```

### 消息流量监控
```typescript
// 监控消息流量
let messageCount = 0;
ws.on('message', () => {
  messageCount++;
  console.log(`已接收 ${messageCount} 条消息`);
});
```

## 📚 相关文档

- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [WebSocket 协议](https://tools.ietf.org/html/rfc6455)
- [Vue 3 组合式 API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript 事件处理](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#event-handling)
