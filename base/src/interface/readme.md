# 接口定义层 (Interface)

接口定义层定义了项目中所有核心服务的契约，确保类型安全和代码一致性。

## 📁 目录结构

```
interface/
├── IKyRequestService.ts   # Ky 请求服务接口
├── IRequestService.ts     # 通用请求服务接口
├── IStoreService.ts       # 存储服务接口
├── ws.d.ts               # WebSocket 类型定义
└── readme.md            # 本文档
```

## 🌐 请求服务接口

### IRequestService
通用的 HTTP 请求服务接口，定义了标准的 RESTful 操作方法。

```typescript
export interface IRequestService {
  get<T>(url: string, opts?: RequestOptions): Promise<T>;
  post<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T>;
  put<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T>;
  delete<T>(url: string, opts?: RequestOptions): Promise<T>;
}
```

### RequestOptions
请求选项配置接口：

```typescript
export interface RequestOptions {
  /** 查询参数 */
  params?: Record<string, unknown[] | string | number | boolean | null | undefined>;
  /** 自定义请求头 */
  headers?: Record<string, string>;
  /** 超时时间（毫秒） */
  timeout?: number | false;
  /** 重试次数 */
  retry?: number;
}
```

### IKyRequestService
基于 `ky` 库的请求服务接口扩展：

```typescript
export interface IKyRequestService extends IRequestService {
  // Ky 特有的方法
  head<T>(url: string, opts?: RequestOptions): Promise<T>;
  patch<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T>;
}
```

## 💾 存储服务接口

### IStoreService
统一的数据存储服务接口：

```typescript
export interface IStoreService {
  /** 存储数据 */
  set<T>(key: string, value: T): Promise<void>;
  /** 读取数据 */
  get<T>(key: string): Promise<T | null>;
  /** 删除指定数据 */
  remove(key: string): Promise<void>;
  /** 清空所有数据 */
  clear(): Promise<void>;
}
```

## 📡 WebSocket 类型定义

### ws.d.ts
WebSocket 相关的类型定义：

```typescript
// WebSocket 事件类型
export interface WsEvent {
  type: string;
  data: unknown;
  timestamp: number;
}

// WebSocket 配置选项
export interface WsOptions {
  url: string;
  protocols?: string | string[];
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

// WebSocket 状态枚举
export enum WsState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3
}
```

## 🎯 接口设计原则

### 1. 单一职责原则
每个接口只定义一组相关的方法：

```typescript
// ✅ 好的设计：职责单一
interface IRequestService {
  get<T>(url: string, opts?: RequestOptions): Promise<T>;
  post<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T>;
  // ... 其他 HTTP 方法
}

// ❌ 避免：混合职责
interface IMixedService {
  get<T>(url: string): Promise<T>;
  set<T>(key: string, value: T): Promise<void>;
  sendNotification(title: string): void;
}
```

### 2. 接口隔离原则
客户端不应该依赖它不需要的接口：

```typescript
// ✅ 好的设计：接口分离
interface IReadOnlyStore {
  get<T>(key: string): Promise<T | null>;
}

interface IWritableStore {
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}

interface IStoreService extends IReadOnlyStore, IWritableStore {
  clear(): Promise<void>;
}
```

### 3. 依赖倒置原则
依赖抽象而不是具体实现：

```typescript
// ✅ 好的设计：依赖抽象
class UserService {
  constructor(private requestService: IRequestService) {}
  
  async getUser(id: string): Promise<User> {
    return this.requestService.get<User>(`/api/users/${id}`);
  }
}

// ❌ 避免：依赖具体实现
class UserService {
  constructor(private kyInstance: Ky) {}
}
```

## 🔧 使用示例

### 实现请求服务接口

```typescript
import { IRequestService, RequestOptions } from '@/interface/IRequestService';

class ApiRequestService implements IRequestService {
  async get<T>(url: string, opts?: RequestOptions): Promise<T> {
    // 实现 GET 请求逻辑
    const response = await fetch(url, {
      method: 'GET',
      headers: opts?.headers,
      signal: opts?.timeout ? AbortSignal.timeout(opts.timeout) : undefined
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  async post<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    // 实现 POST 请求逻辑
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...opts?.headers
      },
      body: JSON.stringify(body),
      signal: opts?.timeout ? AbortSignal.timeout(opts.timeout) : undefined
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  // 实现其他方法...
}
```

### 实现存储服务接口

```typescript
import { IStoreService } from '@/interface/IStoreService';

class LocalStorageService implements IStoreService {
  async set<T>(key: string, value: T): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      throw new Error(`Failed to store data: ${error.message}`);
    }
  }
  
  async get<T>(key: string): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`Failed to retrieve data for key "${key}":`, error);
      return null;
    }
  }
  
  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
  
  async clear(): Promise<void> {
    localStorage.clear();
  }
}
```

### 在依赖注入中使用

```typescript
import { DIContainer } from '@/basis/DI/DIContainer';
import { IRequestService, IStoreService } from '@/interface';

// 注入服务
DIContainer.injectRequestsModel(new ApiRequestService());
DIContainer.injectStoreModel(new LocalStorageService());

// 获取服务实例
const requestService: IRequestService = DIContainer.getRequestInstance();
const storeService: IStoreService = DIContainer.getStoreInstance();
```

## 🔄 扩展接口

### 添加新的服务接口

```typescript
// 1. 定义新接口
export interface ICacheService {
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  has(key: string): Promise<boolean>;
  delete(key: string): Promise<boolean>;
  clear(): Promise<void>;
}

// 2. 在容器中注册
class DIContainer {
  private static _cacheInstance: ICacheService | null = null;
  
  public static injectCacheModel<T extends ICacheService>(
    service: ServiceConstructor<T> | T
  ): void {
    if (!DIContainer._cacheInstance) {
      DIContainer._cacheInstance = 
        typeof service === 'function' ? new service() : service;
    }
  }
  
  public static getCacheInstance(): ICacheService {
    if (!DIContainer._cacheInstance) {
      throw new Error('CacheService is not initialized');
    }
    return DIContainer._cacheInstance;
  }
}
```

### 接口组合

```typescript
// 组合多个接口
export interface IDataService extends IRequestService, IStoreService {
  // 额外的数据操作方法
  validate<T>(data: T): boolean;
  transform<T, R>(data: T): R;
}
```

## 🧪 接口测试

### 接口兼容性测试

```typescript
// 测试接口实现
describe('IRequestService Implementation', () => {
  let service: IRequestService;
  
  beforeEach(() => {
    service = new ApiRequestService();
  });
  
  it('should implement all required methods', () => {
    expect(typeof service.get).toBe('function');
    expect(typeof service.post).toBe('function');
    expect(typeof service.put).toBe('function');
    expect(typeof service.delete).toBe('function');
  });
  
  it('should handle GET requests', async () => {
    const mockData = { id: 1, name: 'Test' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });
    
    const result = await service.get('/api/test');
    expect(result).toEqual(mockData);
  });
});
```

### 类型检查测试

```typescript
// 类型安全测试
function testRequestService(service: IRequestService) {
  // 这些调用应该通过 TypeScript 类型检查
  service.get<User>('/api/users/1');
  service.post<User, CreateUserDto>('/api/users', { name: 'John' });
  service.put<User, UpdateUserDto>('/api/users/1', { name: 'Jane' });
  service.delete('/api/users/1');
}

// 测试实现
testRequestService(new ApiRequestService());
```

## 🎯 最佳实践

### 1. 接口命名规范
```typescript
// ✅ 推荐：使用 I 前缀
interface IRequestService {}
interface IStoreService {}
interface ICacheService {}

// ✅ 推荐：描述性命名
interface IUserRepository {}
interface IEmailService {}
interface ILogger {}
```

### 2. 泛型使用
```typescript
// ✅ 推荐：使用泛型提高类型安全
interface IRequestService {
  get<T>(url: string): Promise<T>;
  post<T, B = unknown>(url: string, body: B): Promise<T>;
}

// ❌ 避免：使用 any 类型
interface IRequestService {
  get(url: string): Promise<any>;
  post(url: string, body: any): Promise<any>;
}
```

### 3. 可选参数设计
```typescript
// ✅ 推荐：合理的可选参数
interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retry?: number;
}

// ❌ 避免：过多必需参数
interface RequestOptions {
  headers: Record<string, string>;
  timeout: number;
  retry: number;
  cache: boolean;
  credentials: string;
}
```

## 📚 相关文档

- [TypeScript 接口文档](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [SOLID 原则](https://en.wikipedia.org/wiki/SOLID)
- [依赖注入模式](https://en.wikipedia.org/wiki/Dependency_injection)
- [适配器层文档](../adapters/readme.md)
- [基础设施层文档](../basis/readme.md)
