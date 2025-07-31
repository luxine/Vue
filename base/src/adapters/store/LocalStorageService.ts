// src/adapters/store/LocalStorageService.ts
import { IStoreService } from '@/interface/IStoreService';

class LocalStorageService implements IStoreService {
  /** 存入（覆盖）数据 */
  async set<T>(key: string, value: T): Promise<void> {
    const str = JSON.stringify(value);
    window.localStorage.setItem(key, str);
  }

  /** 读取数据，解析失败或不存在时返回 null */
  async get<T>(key: string): Promise<T | null> {
    const str = window.localStorage.getItem(key);
    if (!str) return null;
    try {
      return JSON.parse(str) as T;
    } catch {
      return null;
    }
  }

  /** 删除指定条目 */
  async remove(key: string): Promise<void> {
    window.localStorage.removeItem(key);
  }

  /** 清空所有数据 */
  async clear(): Promise<void> {
    window.localStorage.clear();
  }
}

export default LocalStorageService;
