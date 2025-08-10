# 共享工具层 (Shared)

共享工具层提供项目中通用的工具函数和类，包括数据处理、编码解码、URL 生成、随机字符串生成等功能。

## 📁 目录结构

```
shared/
├── Lock.ts              # 锁机制工具
├── Utils.ts             # 通用工具类
├── readme.md           # 本文档
└── ...                 # 其他工具文件
```

## 🛠️ 通用工具类 (Utils.ts)

### 核心功能

#### 1. 环境检测
```typescript
// 判断当前是否为开发环境
Utils.isDev(): boolean
```

#### 2. 二进制数据处理
```typescript
// 将对象编码为 Uint8Array
Utils.toBinary(payload: unknown): Uint8Array

// 将对象编码为 Base64 字符串
Utils.toBaseBinary(payload: unknown): string

// 从 Uint8Array 解码回对象
Utils.fromBinary<T = unknown>(data: Uint8Array): T

// 从 Base64 字符串解码回对象
Utils.fromBaseBinary<T = unknown>(base64: string): T
```

#### 3. Ref 对象处理
```typescript
// 深度获取 Ref 对象的原始值
Utils.unwrapRefsDeep<T>(obj: T): T
```

#### 4. URL 生成
```typescript
// 生成带查询参数的完整 URL
Utils.generateQueryUrl<T extends Record<string, unknown>>(
  baseUrl: string, 
  params: T
): string
```

#### 5. API 基础 URL 获取
```typescript
// 获取 API 基础 URL (HTTP, WS, FILE_PATH)
Utils.getApiBaseURL(env?: 'web' | 'desktop'): {
  HTTP: string;
  WS: string;
  FILE_PATH: string;
}
```

#### 6. 随机字符串生成
```typescript
// 生成指定长度的随机字符串
Utils.generateRandomString(length?: number): string
```

### 使用示例

#### 环境检测
```typescript
import { Utils } from '@/shared/Utils';

// 根据环境执行不同逻辑
if (Utils.isDev()) {
  console.log('开发环境调试信息');
  app.config.performance = true;
} else {
  // 生产环境优化
  console.log = () => {}; // 禁用日志
}
```

#### 二进制数据处理
```typescript
import { Utils } from '@/shared/Utils';

// 编码数据
const data = { id: 1, name: 'John', active: true };
const binary = Utils.toBinary(data);
const base64 = Utils.toBaseBinary(data);

// 解码数据
const decodedBinary = Utils.fromBinary<typeof data>(binary);
const decodedBase64 = Utils.fromBaseBinary<typeof data>(base64);

console.log(decodedBinary); // { id: 1, name: 'John', active: true }
console.log(decodedBase64); // { id: 1, name: 'John', active: true }
```

#### URL 生成
```typescript
import { Utils } from '@/shared/Utils';

// 基础 URL
const baseUrl = '/api/users';

// 查询参数
const params = {
  page: 1,
  limit: 10,
  search: 'john',
  active: true,
  tags: ['admin', 'user']
};

// 生成完整 URL
const url = Utils.generateQueryUrl(baseUrl, params);
console.log(url);
// 输出: /api/users?page=1&limit=10&search=john&active=true&tags=admin&tags=user
```

#### API URL 获取
```typescript
import { Utils } from '@/shared/Utils';

// 获取默认 API URL
const apiUrls = Utils.getApiBaseURL();
console.log(apiUrls);
// 输出: { HTTP: "http://localhost:8090/api", WS: "ws://localhost:8090/api", FILE_PATH: "http://localhost:3000/ticketImages" }

// 获取 Web 环境 API URL
const webUrls = Utils.getApiBaseURL('web');
console.log(webUrls);

// 获取 Desktop 环境 API URL
const desktopUrls = Utils.getApiBaseURL('desktop');
console.log(desktopUrls);
```

#### 随机字符串生成
```typescript
import { Utils } from '@/shared/Utils';

// 生成默认长度（16位）的随机字符串
const random1 = Utils.generateRandomString();
console.log(random1); // 例如: "aB3kL9mN2pQ7rS4"

// 生成指定长度的随机字符串
const random2 = Utils.generateRandomString(32);
console.log(random2); // 例如: "xK9mN2pQ7rS4tU8vW1yZ3aB5cD6eF7gH8"

// 生成短随机字符串
const random3 = Utils.generateRandomString(8);
console.log(random3); // 例如: "aB3kL9mN"
```

## 🔒 锁机制工具 (Lock.ts)

### 功能特性
- 异步锁机制
- 防止重复操作
- 超时控制
- 自动释放

### 使用示例

```typescript
import { Lock } from '@/shared/Lock';

// 创建锁实例
const lock = new Lock();

// 使用锁保护异步操作
const performOperation = async () => {
  if (lock.isLocked()) {
    console.log('操作正在进行中，请稍候...');
    return;
  }

  try {
    await lock.acquire();
    console.log('开始执行操作...');
    
    // 执行需要保护的异步操作
    await someAsyncOperation();
    
    console.log('操作完成');
  } finally {
    lock.release();
  }
};

// 带超时的锁
const timeoutLock = new Lock(5000); // 5秒超时

const performTimeoutOperation = async () => {
  try {
    await timeoutLock.acquire();
    // 执行操作
  } catch (error) {
    if (error.message === 'Lock timeout') {
      console.log('操作超时');
    }
  } finally {
    timeoutLock.release();
  }
};
```

## 🎯 最佳实践

### 1. 工具类使用
```typescript
// ✅ 推荐：按需导入
import { Utils } from '@/shared/Utils';

// ✅ 推荐：类型安全
const data = Utils.fromBinary<User>(binaryData);

// ❌ 避免：使用 any 类型
const data: any = Utils.fromBinary(binaryData);
```

### 2. 错误处理
```typescript
// ✅ 推荐：适当的错误处理
try {
  const decoded = Utils.fromBaseBinary(encodedData);
  // 处理解码后的数据
} catch (error) {
  console.error('数据解码失败:', error);
  // 处理错误情况
}
```

### 3. 性能优化
```typescript
// ✅ 推荐：缓存 API URL
const apiUrls = Utils.getApiBaseURL();
const baseUrl = apiUrls.HTTP;

// ✅ 推荐：避免重复计算
const randomStrings = Array.from({ length: 100 }, () => 
  Utils.generateRandomString(16)
);
```

### 4. 锁机制使用
```typescript
// ✅ 推荐：使用 try-finally 确保锁释放
const lock = new Lock();

try {
  await lock.acquire();
  // 执行操作
} finally {
  lock.release();
}

// ✅ 推荐：检查锁状态
if (!lock.isLocked()) {
  await performOperation();
} else {
  showMessage('操作正在进行中');
}
```

## 🔍 调试技巧

### 开发环境调试
```typescript
// 启用详细日志
if (Utils.isDev()) {
  console.log('API URLs:', Utils.getApiBaseURL());
  console.log('Current environment:', import.meta.env.MODE);
}
```

### 性能监控
```typescript
// 监控工具函数性能
const startTime = performance.now();
const result = Utils.toBaseBinary(largeData);
const endTime = performance.now();
console.log(`编码耗时: ${endTime - startTime}ms`);
```

### 锁状态监控
```typescript
// 监控锁状态
const lock = new Lock();

// 定期检查锁状态
setInterval(() => {
  if (lock.isLocked()) {
    console.log('锁被占用中...');
  }
}, 1000);
```

## 🔄 扩展工具

### 添加新的工具函数
```typescript
// 在 Utils 类中添加新方法
export class Utils {
  // ... 现有方法

  /**
   * 格式化日期
   * @param date 日期对象或时间戳
   * @param format 格式化字符串
   */
  public static formatDate(date: Date | number, format: string = 'YYYY-MM-DD'): string {
    const d = new Date(date);
    // 实现日期格式化逻辑
    return format
      .replace('YYYY', d.getFullYear().toString())
      .replace('MM', (d.getMonth() + 1).toString().padStart(2, '0'))
      .replace('DD', d.getDate().toString().padStart(2, '0'));
  }

  /**
   * 深拷贝对象
   * @param obj 要拷贝的对象
   */
  public static deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    if (obj instanceof Date) {
      return new Date(obj.getTime()) as T;
    }
    
    if (obj instanceof Array) {
      return obj.map(item => Utils.deepClone(item)) as T;
    }
    
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = Utils.deepClone(obj[key]);
      }
    }
    
    return cloned;
  }
}
```

### 创建专用工具类
```typescript
// 字符串工具类
export class StringUtils {
  /**
   * 驼峰转下划线
   */
  public static camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  /**
   * 下划线转驼峰
   */
  public static snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
}

// 数组工具类
export class ArrayUtils {
  /**
   * 数组去重
   */
  public static unique<T>(arr: T[]): T[] {
    return [...new Set(arr)];
  }

  /**
   * 数组分组
   */
  public static groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
    return arr.reduce((groups, item) => {
      const groupKey = String(item[key]);
      groups[groupKey] = groups[groupKey] || [];
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }
}
```

## 📚 相关文档

- [TypeScript 工具类型](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [MsgPack 编码](https://msgpack.org/)
- [Pako 压缩库](https://github.com/nodeca/pako)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Vue 3 响应式 API](https://vuejs.org/guide/extras/reactivity-in-depth.html)
