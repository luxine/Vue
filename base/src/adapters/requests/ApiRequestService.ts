import { IRequestService, RequestOptions } from '@/interface/IRequestService';
import { BaseRequestService } from './BaseRequestService';
import { BusinessRequestService } from './BusinessRequestService';
import { isEmpty } from 'lodash-es';
const VITE_TIMEOUT = import.meta.env.VITE_TIMEOUT;
const VITE_RETRY_COUNT = import.meta.env.VITE_RETRY_COUNT;

const BASE_URL = Utils.getApiBaseURL().HTTP;
const timeout = Number(VITE_TIMEOUT);
const retry = Number(VITE_RETRY_COUNT);

const getToken: () => string = () => {
  const token: undefined | string = '';
  return token;
};
export async function buildHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    token: token ? token : undefined,
  };
}

export const createRequstService = async () => {
  const headers = await buildHeaders();
  const baseService = new BaseRequestService(BASE_URL, { headers, timeout, retry });
  return new BusinessService(baseService);
};

class BusinessService implements IRequestService {
  private baseService: IRequestService;
  constructor(baseService: BaseRequestService) {
    this.baseService = new BusinessRequestService(baseService);
  }

  private async buildDefaultOptions(opts?: RequestOptions): Promise<RequestOptions | undefined> {
    if (isEmpty(opts)) {
      const backopts = {
        headers: (await buildHeaders()) as RequestOptions['headers'],
      };
      return backopts;
    } else if (isEmpty(opts.headers)) {
      const backopts = {
        headers: (await buildHeaders()) as RequestOptions['headers'],
      };
      return { ...opts, ...backopts };
    } else {
      return opts;
    }
  }
  async get<T>(url: string, opts?: RequestOptions): Promise<T> {
    const defaultOpts = await this.buildDefaultOptions(opts);
    return await this.baseService.get<T>(url, defaultOpts);
  }
  async post<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    const defaultOpts = await this.buildDefaultOptions(opts);
    return await this.baseService.post<T, B>(url, body, defaultOpts);
  }
  async put<T, B = unknown>(url: string, body: B, opts?: RequestOptions): Promise<T> {
    const defaultOpts = await this.buildDefaultOptions(opts);
    return await this.baseService.put<T, B>(url, body, defaultOpts);
  }
  async delete<T>(url: string, opts?: RequestOptions): Promise<T> {
    const defaultOpts = await this.buildDefaultOptions(opts);
    return await this.baseService.delete<T>(url, defaultOpts);
  }
}
