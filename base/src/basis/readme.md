# 基础设施层 (Basis)

基础设施层提供项目的核心架构支持，包括依赖注入、服务基类和基础工具。

## 📁 目录结构

```
basis/
├── DI/                    # 依赖注入容器
│   └── DIContainer.ts     # 依赖注入容器实现
├── RequestService/        # 请求服务基类
│   └── RequestService.ts  # 请求服务抽象
├── StoreService/          # 存储服务基类
│   └── StoreService.ts    # 存储服务抽象
└── readme.md             # 本文档
```

## 🔧 依赖注入容器 (DIContainer)

### 概述
`DIContainer` 是一个轻量级的依赖注入容器，用于管理应用程序中的服务实例。

### 核心功能
- **服务注册**: 支持构造函数和实例对象注入
- **单例管理**: 确保服务实例的唯一性
- **类型安全**: 基于 TypeScript 接口的类型检查
- **懒加载**: 按需创建服务实例

### 使用示例

```typescript
import DIContainer from '@/basis/DI/DIContainer';
import { ApiRequestService } from '@/adapters/requests/ApiRequestService';
import { LocalStorageService } from '@/adapters/store/LocalStorageService';

// 注入请求服务
DIContainer.injectRequestsModel(new ApiRequestService());

// 注入存储服务
DIContainer.injectStoreModel(LocalStorageService);

// 获取服务实例
const requestService = DIContainer.getRequestInstance();
const storeService = DIContainer.getStoreInstance();
```

### API 参考

#### 注入服务
```typescript
// 注入请求服务
static injectRequestsModel<T extends IRequestService>(
  service: ServiceConstructor<T> | T
): void

// 注入存储服务
static injectStoreModel<T extends IStoreService>(
  service: ServiceConstructor<T> | T
): void
```

#### 获取服务
```typescript
// 获取请求服务实例
static getRequestInstance(): IRequestService

// 获取存储服务实例
static getStoreInstance(): IStoreService
```

## 🌐 请求服务基类

### RequestService
提供统一的请求服务接口，定义标准的 HTTP 操作方法。

### 接口定义
```typescript
interface IRequestService {
  get<T>(url: string, opts?: RequestOptions): Promise<T>;
  post<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T>;
  put<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T>;
  delete<T>(url: string, opts?: RequestOptions): Promise<T>;
}
```

### 请求选项
```typescript
interface RequestOptions {
  params?: Record<string, unknown[] | string | number | boolean | null | undefined>;
  headers?: Record<string, string>;
  timeout?: number | false;
  retry?: number;
}
```

## 💾 存储服务基类

### StoreService
提供统一的数据存储接口，支持多种存储后端。

### 接口定义
```typescript
interface IStoreService {
  set<T>(key: string, value: T): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

## 🏗️ 架构设计原则

### 1. 依赖倒置原则
- 高层模块不依赖低层模块
- 两者都依赖抽象接口
- 抽象不依赖具体实现

### 2. 单一职责原则
- 每个服务只负责一个特定的功能
- 接口定义清晰明确
- 实现类职责单一

### 3. 开闭原则
- 对扩展开放
- 对修改封闭
- 通过接口扩展功能

### 4. 接口隔离原则
- 客户端不应该依赖它不需要的接口
- 接口应该小而精确
- 避免胖接口

## 🔄 服务生命周期

### 1. 注册阶段
```typescript
// 应用启动时注册服务
DIContainer.injectRequestsModel(new ApiRequestService());
DIContainer.injectStoreModel(new LocalStorageService());
```

### 2. 使用阶段
```typescript
// 在业务代码中使用服务
const requestService = DIContainer.getRequestInstance();
const data = await requestService.get('/api/data');
```

### 3. 销毁阶段
```typescript
// 应用关闭时清理资源
// 容器会自动管理服务实例的生命周期
```

## 🎯 最佳实践

### 1. 服务注册
```typescript
// ✅ 推荐：在应用启动时统一注册
// main.ts
DIContainer.injectRequestsModel(await createRequstService());
DIContainer.injectStoreModel(new LocalStorageService());

// ❌ 避免：在业务代码中重复注册
// 组件中
DIContainer.injectRequestsModel(new ApiRequestService());
```

### 2. 错误处理
```typescript
// ✅ 推荐：统一的错误处理
try {
  const service = DIContainer.getRequestInstance();
  const data = await service.get('/api/data');
} catch (error) {
  if (error.message === 'RequestService is not initialized') {
    // 处理服务未初始化错误
  }
  // 处理其他错误
}
```

### 3. 类型安全
```typescript
// ✅ 推荐：使用泛型确保类型安全
const user = await requestService.get<User>('/api/user/1');
const users = await requestService.get<User[]>('/api/users');

// ❌ 避免：使用 any 类型
const data: any = await requestService.get('/api/data');
```

## 🔍 调试和测试

### 调试技巧
```typescript
// 检查服务是否已注册
console.log('Request service initialized:', !!DIContainer.getRequestInstance());
console.log('Store service initialized:', !!DIContainer.getStoreInstance());
```

### 单元测试
```typescript
// 测试服务注册
describe('DIContainer', () => {
  beforeEach(() => {
    // 清理容器状态
    // 注意：这里需要根据实际实现调整
  });

  it('should inject and retrieve request service', () => {
    const mockService = new MockRequestService();
    DIContainer.injectRequestsModel(mockService);
    
    const service = DIContainer.getRequestInstance();
    expect(service).toBe(mockService);
  });
});
```

## 🔄 扩展指南

### 添加新的服务类型
```typescript
// 1. 定义服务接口
interface INewService {
  doSomething(): Promise<void>;
}

// 2. 扩展容器
class DIContainer {
  private static _newServiceInstance: INewService | null = null;
  
  public static injectNewService<T extends INewService>(
    service: ServiceConstructor<T> | T
  ): void {
    if (!DIContainer._newServiceInstance) {
      DIContainer._newServiceInstance = 
        typeof service === 'function' ? new service() : service;
    }
  }
  
  public static getNewServiceInstance(): INewService {
    if (!DIContainer._newServiceInstance) {
      throw new Error('NewService is not initialized');
    }
    return DIContainer._newServiceInstance;
  }
}
```

## 📚 相关文档

- [适配器层文档](../adapters/readme.md)
- [接口定义文档](../interface/readme.md)
- [插件系统文档](../plugins/readme.md)
