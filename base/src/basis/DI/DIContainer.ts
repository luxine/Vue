import { IRequestService } from '@/interface/IRequestService';
import { IStoreService } from '@/interface/IStoreService';

type ServiceConstructor<T> = new (...args: unknown[]) => T;

class DIContainer {
  private static _requestInstance: IRequestService | null = null;
  private static _storeInstance: IStoreService | null = null;
  private constructor() {}

  /**
   * 注入请求服务：接受构造函数或实例对象
   * @param service 可 new 的类 或 已经构造好的实例
   */
  public static injectRequestsModel<T extends IRequestService>(service: ServiceConstructor<T> | T): void {
    if (!DIContainer._requestInstance) {
      DIContainer._requestInstance = typeof service === 'function' ? new service() : service;
    }
  }

  /**
   * 注入存储服务：接受构造函数或实例对象
   * @param service 可 new 的类 或 已经构造好的实例
   */
  public static injectStoreModel<T extends IStoreService>(service: ServiceConstructor<T> | T): void {
    if (!DIContainer._storeInstance) {
      DIContainer._storeInstance = typeof service === 'function' ? new service() : service;
    }
  }

  /**
   * 获取注入的请求服务实例，未初始化时抛错
   */
  public static getRequestInstance(): IRequestService {
    if (!DIContainer._requestInstance) {
      throw new Error('RequestService is not initialized');
    }
    return DIContainer._requestInstance;
  }

  /**
   * 获取注入的存储服务实例，未初始化时抛错
   */
  public static getStoreInstance(): IStoreService {
    if (!DIContainer._storeInstance) {
      throw new Error('StoreService is not initialized');
    }
    return DIContainer._storeInstance;
  }
}

export default DIContainer;
