import ky, { Options as KyOptions } from 'ky';
import { RequestOptions } from '@/interface/IRequestService';

export class BaseRequestService {
  private instance;

  constructor(baseUrl: string, defaultOpts?: Partial<KyOptions>) {
    this.instance = ky.create({
      prefixUrl: baseUrl,
      throwHttpErrors: false,
      ...defaultOpts,
    });
  }

  private buildOptions(opts?: RequestOptions): KyOptions {
    const options: KyOptions = {};
    if (opts?.timeout !== null && opts?.timeout !== undefined) options.timeout = opts?.timeout;
    if (opts?.retry !== null && opts?.timeout !== undefined) options.retry = opts.retry;
    if (opts?.headers) options.headers = opts.headers;
    if (opts?.params) {
      const sp = new URLSearchParams();
      for (const [k, v] of Object.entries(opts.params)) {
        if (Array.isArray(v)) v.forEach((x) => x !== null && x !== undefined && sp.append(k, String(x)));
        else if (v !== null && v !== undefined) sp.set(k, String(v));
      }
      options.searchParams = sp;
    }

    return options;
  }

  async get<T>(url: string, opts?: RequestOptions): Promise<T> {
    return this.instance.get(url, this.buildOptions(opts)).json<T>();
  }

  async post<T, B>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    return this.instance.post(url, { ...this.buildOptions(opts), json: body }).json<T>();
  }

  async put<T, B>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    return this.instance.put(url, { ...this.buildOptions(opts), json: body }).json<T>();
  }

  async delete<T>(url: string, opts?: RequestOptions): Promise<T> {
    return this.instance.delete(url, this.buildOptions(opts)).json<T>();
  }
}
