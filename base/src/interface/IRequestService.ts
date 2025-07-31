export interface RequestOptions {
  /** query 参数 */
  params?: Record<string, unknown[] | string | number | boolean | null | undefined>;
  /** 自定义请求头 */
  headers?: Record<string, string>;
  /** 超时 ms */
  timeout?: number | false;
  /** 重试次数 */
  retry?: number;
}

export interface IRequestService {
  get<T>(url: string, opts?: RequestOptions): Promise<T>;
  post<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T>;
  put<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T>;
  delete<T>(url: string, opts?: RequestOptions): Promise<T>;
}
