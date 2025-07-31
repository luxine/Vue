// requestServiceFactory.ts
import { IRequestService, RequestOptions } from '@/interface/IRequestService';
import DIContainer from '@/basis/DI/DIContainer';

let _instance: IRequestService | null = null;

class RequestService implements IRequestService {
  private constructor() {}
  private static getInstance(): IRequestService {
    if (!_instance) {
      _instance = DIContainer.getRequestInstance();
    }
    return _instance as IRequestService;
  }
  public static async get<T>(url: string, opts?: RequestOptions): Promise<T> {
    return RequestService.getInstance()!.get<T>(url, opts);
  }

  public static async post<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    return RequestService.getInstance()!.post<T, B>(url, body, opts);
  }
  public static async put<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    return RequestService.getInstance()!.put<T, B>(url, body, opts);
  }
  public static async delete<T>(url: string, opts?: RequestOptions): Promise<T> {
    return RequestService.getInstance()!.delete<T>(url, opts);
  }

  async get<T>(url: string, opts?: RequestOptions): Promise<T> {
    return RequestService.get<T>(url, opts);
  }
  async post<T, B>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    return RequestService.post<T, B>(url, body, opts);
  }
  async put<T, B>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    return RequestService.put<T, B>(url, body, opts);
  }
  async delete<T>(url: string, opts?: RequestOptions): Promise<T> {
    return RequestService.delete<T>(url, opts);
  }
}

export default RequestService;
