// src/basis/store/StoreService.ts
import { IStoreService } from '@/interface/IStoreService';
import DIContainer from '@/basis/DI/DIContainer';

/**
 * 全局存储服务代理类，所有调用均返回 Promise，
 * 底层实际实现由 DIContainer.getStoreInstance() 提供（异步接口）。
 */
class StoreService implements IStoreService {
  private constructor() {}

  /** 获取底层实际存储实现 */
  private static getInstance(): IStoreService {
    return DIContainer.getStoreInstance();
  }

  /** 静态方法：存入（覆盖）数据 */
  public static set<T>(key: string, value: T): Promise<void> {
    return StoreService.getInstance().set(key, value);
  }

  /** 静态方法：读取数据 */
  public static get<T>(key: string): Promise<T | null> {
    return StoreService.getInstance().get(key);
  }

  /** 静态方法：删除指定条目 */
  public static remove(key: string): Promise<void> {
    return StoreService.getInstance().remove(key);
  }

  /** 静态方法：清空所有数据 */
  public static clear(): Promise<void> {
    return StoreService.getInstance().clear();
  }

  /** 实例方法代理到静态方法，以实现 IStoreService 接口 */
  public set<T>(key: string, value: T): Promise<void> {
    return StoreService.set(key, value);
  }

  public get<T>(key: string): Promise<T | null> {
    return StoreService.get(key);
  }

  public remove(key: string): Promise<void> {
    return StoreService.remove(key);
  }

  public clear(): Promise<void> {
    return StoreService.clear();
  }
}

export default StoreService;
