// src/utils/loading.ts

import type { App } from 'vue';
import { LoadingPlugin, Props, useLoading } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

/**
 *  LoadingOptions 接口，可根据需要增删
 */
export interface LoadingOptions {
  container?: HTMLElement | null; // 容器元素，不传则全屏
  canCancel?: boolean; // 是否可点击遮罩取消
  onCancel?: () => void; // 取消时调用
  color?: string; // 加载图标颜色
  loader?: string; // 预设动画名称，如 'dots'、'bars'
  width?: number; // 图标宽度（px）
  height?: number; // 图标高度（px）
  backgroundColor?: string; // 遮罩层背景色
  opacity?: number; // 遮罩层透明度 0~1
  zIndex?: number; // 控制 z-index
  isFullPage?: boolean; // 是否全屏展示（默认 true）
  enforceFocus?: boolean; // 是否锁定焦点
  lockScroll?: boolean; // 是否锁定页面滚动
  blur?: string | null; // 背景模糊效果
}

/**
 * showLoading 返回的实例类型，只需包含 hide() 方法即可关闭对应 loading
 */
export interface LoadingInstance {
  hide: () => void;
}

/**
 * 全局唯一的 loaderService，由 initLoading() 调用后赋值
 */
let loaderService: ReturnType<typeof useLoading> | null = null;

/**
 * 当前正在展示的 Loading 实例，hideLoading() 会对它调用 .hide() 并置空
 */
let currentInstance: LoadingInstance | null = null;

/**
 * 初始化全局 Loading 插件
 * @param app 当前 Vue 应用实例
 */
export function initLoading(app: App): void {
  app.use(LoadingPlugin);
  loaderService = useLoading({
    loader: 'bars',
    color: '#22C55E',
    width: 80,
    height: 80,
    backgroundColor: '#111',
    opacity: 0.6,
    canCancel: false,
  });
}

/**
 * 显示一个 Loading（默认全屏）。可选地传入配置项 overrides。
 *
 * @param options 可选的 LoadingOptions（若不传则全屏全局）
 */
export function showLoading(options?: LoadingOptions | undefined): void {
  if (!loaderService) {
    throw new Error('[loading.ts] showLoading：未初始化 loaderService，请在 main.ts 调用 initLoading(app)');
  }
  if (currentInstance) {
    currentInstance.hide();
    currentInstance = null;
  }
  currentInstance = loaderService.show(options as unknown as Props) as LoadingInstance;
}

/**
 * 关闭当前正在显示的 Loading（若无实例则直接忽略）
 */
export function hideLoading(): void {
  if (!currentInstance) {
    // throw new Error('[loading.ts] hideLoading：当前无加载实例，无需关闭');
    return;
  }
  currentInstance.hide();
  currentInstance = null;
}
