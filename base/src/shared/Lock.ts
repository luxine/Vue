type Release = () => void;

/**
 * 互斥锁提供资源独占访问控制
 *
 * - 实现基本的互斥锁机制
 * - 支持带超时的锁获取
 * - 提供自动释放锁的运行上下文
 */
export class MutexLock {
  private _locked = false;
  private _queue: Array<{
    waiter: (release: Release) => void;
    reject: (err: Error) => void;
    timer?: ReturnType<typeof setTimeout>;
  }> = [];
  public acquire(timeoutMs?: number): Promise<Release> {
    return new Promise<Release>((resolve, reject) => {
      const dispatchNext = this._dispatchNext.bind(this);
      const entry = {
        waiter: (release: Release) => {
          if (entry.timer) clearTimeout(entry.timer);
          this._locked = true;
          resolve(release);
        },
        reject,
        timer: undefined as ReturnType<typeof setTimeout> | undefined,
      };
      if (typeof timeoutMs === 'number') {
        entry.timer = setTimeout(() => {
          const idx = this._queue.indexOf(entry);
          if (idx !== -1) this._queue.splice(idx, 1);
          reject(new Error(`Mutex acquire timeout after ${timeoutMs}ms`));
        }, timeoutMs);
      }
      if (!this._locked) {
        entry.waiter(dispatchNext);
      } else {
        this._queue.push(entry);
      }
    });
  }
  private _dispatchNext() {
    if (this._queue.length > 0) {
      const next = this._queue.shift()!;
      next.waiter(this._dispatchNext.bind(this));
    } else {
      this._locked = false;
    }
  }

  public async runExclusive<T>(fn: () => Promise<T>, timeoutMs?: number): Promise<T> {
    const release = await this.acquire(timeoutMs);
    try {
      return await fn();
    } finally {
      release();
    }
  }
}
type LockType = 'read' | 'write';
interface PendingRequest {
  type: LockType;
  resolve: (release: () => void) => void;
  reject: (err: Error) => void;
}

/**
 * 读写锁实现，支持多读单写模式
 *
 * 特性：
 * - 读锁可被多个请求同时持有
 * - 写锁是独占的
 * - 遵循先进先出（FIFO）队列机制
 * - 写请求优先于读请求（避免写饥饿）
 */
export class ReadWriteLock {
  private readers = 0;
  private writer = false;
  private queue: PendingRequest[] = [];
  public readLock(): Promise<() => void> {
    return new Promise<() => void>((resolve, reject) => {
      const tryAcquire = () => {
        const firstWriteIdx = this.queue.findIndex((r) => r.type === 'write');
        if (!this.writer && firstWriteIdx === -1) {
          this.readers++;
          resolve(() => this.readUnlock());
          return true;
        }
        return false;
      };
      if (!tryAcquire()) {
        this.queue.push({ type: 'read', resolve, reject });
      }
    });
  }

  public writeLock(): Promise<() => void> {
    return new Promise<() => void>((resolve, reject) => {
      const tryAcquire = () => {
        if (!this.writer && this.readers === 0) {
          this.writer = true;
          resolve(() => this.writeUnlock());
          return true;
        }
        return false;
      };
      if (!tryAcquire()) {
        this.queue.push({ type: 'write', resolve, reject });
      }
    });
  }

  private readUnlock() {
    if (this.readers <= 0) {
      throw new Error('ReadUnlock without matching lock');
    }
    this.readers--;
    this.processQueue();
  }

  private writeUnlock() {
    if (!this.writer) {
      throw new Error('WriteUnlock without matching lock');
    }
    this.writer = false;
    this.processQueue();
  }

  private processQueue() {
    let idxWrite = this.queue.findIndex((r) => r.type === 'write');
    while (this.queue.length > 0 && this.queue[0].type === 'read' && !this.writer && (idxWrite === -1 || idxWrite > 0)) {
      const req = this.queue.shift()!;
      this.readers++;
      req.resolve(() => this.readUnlock());
      idxWrite = this.queue.findIndex((r) => r.type === 'write');
    }
    if (this.queue.length > 0 && this.queue[0].type === 'write' && this.readers === 0 && !this.writer) {
      const req = this.queue.shift()!;
      this.writer = true;
      req.resolve(() => this.writeUnlock());
    }
  }
}
