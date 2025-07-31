import { encode, decode } from '@msgpack/msgpack';
import pako from 'pako';
import { cloneDeep } from 'lodash-es';
export class Utils {
  private constructor() {}
  /**
   * 判断当前是否为开发环境
   */
  public static isDev(): boolean {
    return import.meta.env.MODE === 'dev';
  }

  /**
   * 将对象编码为 Uint8Array
   * @param payload 任意可序列化对象
   */
  public static toBinary(payload: unknown): Uint8Array {
    const bin = encode(payload);
    return bin;
  }

  /**
   * 将对象编码为 Base64 字符串
   * @param payload 任意可序列化对象
   */
  public static toBaseBinary(payload: unknown): string {
    const binary = encode(payload);
    const compressed = pako.deflate(binary); // Uint8Array
    let str = '';
    for (const byte of compressed) {
      str += String.fromCharCode(byte);
    }
    return btoa(str);
  }
  /**
   * 从 Uint8Array解码回对象
   * @param data MsgPack 二进制数据
   */
  public static fromBinary<T = unknown>(data: Uint8Array): T {
    return decode(data) as T;
  }

  /**
   * 从 Base64 字符串解码回对象
   * @param base64 由 MsgPackEncoder.toBase64 生成的字符串
   */
  public static fromBaseBinary<T = unknown>(base64: string): T {
    const binStr = atob(base64);
    const compressed = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      compressed[i] = binStr.charCodeAt(i);
    }
    const binary = pako.inflate(compressed);
    return decode(binary) as T;
  }

  /*
   * 深度获取Ref对象的原始值
   */
  public static unwrapRefsDeep<T>(obj: T): T {
    const target = unref(obj);

    if (Array.isArray(target)) {
      return target.map((item) => Utils.unwrapRefsDeep(item)) as T;
    }

    if (target !== null && typeof target === 'object') {
      const result: { [key: string]: unknown } = {};
      for (const key in target) {
        result[key] = Utils.unwrapRefsDeep(target[key]);
      }
      return result as T;
    }

    return cloneDeep(target);
  }
  /**
   * 生成带查询参数的完整URL
   * @param baseUrl - 基础URL路径，不包含查询参数部分（例如："/api/search"）
   * @param params - 查询参数对象，支持键值对结构。自动过滤undefined和null值参数
   * @returns 拼接后的完整URL字符串。当没有有效参数时直接返回原始baseUrl
   * @template T - 泛型参数继承自Record<string, unknown>，保证参数对象的类型安全
   */
  public static generateQueryUrl<T extends Record<string, unknown>>(baseUrl: string, params: T): string {
    const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null);
    if (entries.length === 0) {
      return baseUrl;
    }
    const queryString = entries.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`).join('&');
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${queryString}`;
  }
  /**
   * 获取API基础URL (Http Ws)
   * 如果是web环境，则返回web环境API地址
   * 如果是桌面环境，则返回预设的桌面端主机API地址
   *@return HTTP 和 WS 的baseURL组成的对象
   */
  public static getApiBaseURL(env?: 'web' | 'desktop') {
    const host = window.location.hostname;
    const port = 8090;
    const VITE_WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;
    const isElectron = import.meta.env.VITE_APP_PLATFORM === 'electron';
    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
    const BASEPATH = import.meta.env.VITE_BASE_PATH;
    const ELECTRON_WS_BASE_URL = import.meta.env.VITE_ELECTRON_WS_BASE_URL;
    const ELECTRON_BASE_URL = import.meta.env.VITE_ELECTRON_BASE_URL;
    const FILE_PATH = new URL(VITE_BASE_URL).origin + '/ticketImages';
    const BASE_URL = isElectron ? ELECTRON_BASE_URL : Utils.isDev() ? VITE_BASE_URL : `http://${host}:${port}${BASEPATH}`;
    const WS_URL = isElectron ? ELECTRON_WS_BASE_URL : Utils.isDev() ? VITE_WS_BASE_URL : `ws://${host}:${port}${BASEPATH}`;

    switch (env) {
      case 'web':
        return {
          HTTP: VITE_BASE_URL,
          WS: VITE_WS_BASE_URL,
          FILE_PATH,
        };
      case 'desktop':
        return {
          HTTP: ELECTRON_BASE_URL,
          WS: ELECTRON_WS_BASE_URL,
          FILE_PATH,
        };
      default:
        return {
          HTTP: BASE_URL,
          WS: WS_URL,
          FILE_PATH,
        };
    }
  }

  /**
   * 生成指定长度的随机字符串，字符集包含 A–Z, a–z, 0–9
   * @param length 要生成的字符串长度，默认 16
   * @returns 随机字符串
   */
  public static generateRandomString(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const resultChars: string[] = [];
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      resultChars.push(chars[randomValues[i] % chars.length]);
    }
    return resultChars.join('');
  }
}

export default Utils;
