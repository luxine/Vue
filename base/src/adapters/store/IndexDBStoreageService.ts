import { IStoreService } from '@/interface/IStoreService';

class IndexedDBService implements IStoreService {
  private dbPromise: Promise<IDBDatabase>;

  /**
   * @param dbName 数据库名称，默认为 'app-store'
   * @param storeName 对象仓库名称，默认为 'keyval'
   */
  constructor(
    private dbName: string = 'app-store',
    private storeName: string = 'keyval',
  ) {
    this.dbPromise = this.openDB();
  }

  /** 打开（或创建）数据库并初始化对象仓库 */
  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      // 第一次创建或版本升级时，建 objectStore
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /** 存入（插入或更新）数据 */
  async set<T>(key: string, value: T): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.put(value, key);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  /** 根据 key 读取数据，找不到返回 null */
  async get<T>(key: string): Promise<T | null> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.get(key);

      req.onsuccess = () => {
        const result = req.result;
        resolve(result === undefined ? null : (result as T));
      };
      req.onerror = () => reject(req.error);
    });
  }

  /** 删除指定 key */
  async remove(key: string): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.delete(key);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  /** 清空整个仓库 */
  async clear(): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.clear();

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}

export default IndexedDBService;
