import { IRequestService, RequestOptions } from '@/interface/IRequestService';
import { BaseRequestService } from './BaseRequestService';
import { Message } from '@/plugins/message';
import StoreService from '@/basis/StoreService/StoreService';
import router from '@/router';
import { hideLoading } from '@/plugins/loading';
interface ServerResponse<T> {
  code: number;
  message: string;
  data: T;
}

export class BusinessRequestService implements IRequestService {
  private base: BaseRequestService;

  constructor(baseService: BaseRequestService) {
    this.base = baseService;
  }

  private async handle<T>(res: ServerResponse<T>): Promise<T> {
    if (res.code === 401) {
      await StoreService.remove('user');
      router.replace('/login');
      hideLoading();
      throw new Error('Unauthorized');
    }
    if (res.code !== 200) {
      console.error('error request', {
        ...res,
      });
      Message.error(res.message || 'Unknown business error');
      hideLoading();
      throw new Error(res.message || 'Unknown business error');
    }
    return res.data;
  }

  async get<T>(url: string, opts?: RequestOptions): Promise<T> {
    const res = await this.base.get<ServerResponse<T>>(url, opts);
    return this.handle(res);
  }

  async post<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    const res = await this.base.post<ServerResponse<T>, B>(url, body, opts);
    return this.handle(res);
  }

  async put<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    const res = await this.base.put<ServerResponse<T>, B>(url, body, opts);
    return this.handle(res);
  }

  async delete<T>(url: string, opts?: RequestOptions): Promise<T> {
    const res = await this.base.delete<ServerResponse<T>>(url, opts);
    return this.handle(res);
  }
}
