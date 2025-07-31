import type { Directive } from 'vue';

interface Options {
  text: string;
  rotate?: number;
  opacity?: number;
  font?: string;
  color?: string;
  gapX?: number;
  gapY?: number;
  width?: number;
  height?: number;
  enabled?: boolean; // 控制是否渲染水印
  block?: boolean; // 控制是否禁止点击
}

const defaults: Required<Omit<Options, 'width' | 'height'>> = {
  text: 'Watermark',
  rotate: -20,
  opacity: 0.15,
  font: '14px sans-serif',
  color: 'red',
  gapX: 50,
  gapY: 50,
  enabled: false,
  block: true,
};

function clearWatermark(el: HTMLElement) {
  el.style.backgroundImage = '';
  el.style.backgroundRepeat = '';
  el.style.backgroundSize = '';
}

function applyWatermark(el: HTMLElement, opts: Options) {
  const rect = el.getBoundingClientRect();
  const baseW = opts.width ?? rect.width;
  const baseH = opts.height ?? rect.height;
  const w = baseW + (opts.gapX ?? 0);
  const h = baseH + (opts.gapY ?? 0);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(((opts.rotate ?? 0) * Math.PI) / 180);
  ctx.font = opts.font!;
  ctx.fillStyle = opts.color!;
  ctx.globalAlpha = opts.opacity!;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(opts.text, 0, 0);
  ctx.restore();

  const url = canvas.toDataURL();
  Object.assign(el.style, {
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${w}px ${h}px`,
  });
}

const WatermarkDirective: Directive<HTMLElement, string | Partial<Options>> = {
  mounted(el, binding) {
    update(el, binding);
  },
  updated(el, binding) {
    if (JSON.stringify(binding.oldValue) === JSON.stringify(binding.value)) return;
    update(el, binding);
  },
};

function update(el: HTMLElement, binding: DirectiveBinding<string | Partial<Options>, string, string>) {
  // 解析入参
  const raw = typeof binding.value === 'string' ? { text: binding.value } : binding.value || {};
  const { enabled, block, ...opts } = { ...defaults, ...raw } as Required<Options>;

  // 水印渲染或清除
  if (enabled) {
    applyWatermark(el, opts);
  } else {
    clearWatermark(el);
  }

  // 点击拦截控制
  if (block) {
    el.style.pointerEvents = 'none';
  } else {
    el.style.pointerEvents = '';
  }
}

export default WatermarkDirective;
