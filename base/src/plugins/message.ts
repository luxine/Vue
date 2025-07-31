import { App } from 'vue';
import type { MessageParams } from 'element-plus';

let messageApi: (options: MessageParams) => void;
const STYLE_HOST_ID = 'message-style-host';

function ensureStyleHost(): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  let host = document.getElementById(STYLE_HOST_ID);
  if (!host) {
    host = document.createElement('div');
    host.id = STYLE_HOST_ID;
    document.body.appendChild(host);
  }
  return host;
}

export default {
  install(app: App) {
    const styleHost = ensureStyleHost();
    messageApi = ElMessage;
    if (styleHost) {
      const styleEl = document.createElement('style');
      styleEl.textContent = `
  #${STYLE_HOST_ID} .msg-info {
    background-color: #409EFF !important;
    color: #FFF;
    border-left: 5px solid #206CB6;
  }
  #${STYLE_HOST_ID} .msg-success {
    background-color: #67C23A !important;
    color: #FFF;
    border-left: 5px solid #497B2E;
  }
  #${STYLE_HOST_ID} .el-message {
    animation: pulse 1.2s infinite;
  }
  @keyframes pulse {
    0%,100% { transform: scale(1); }
    50%     { transform: scale(1.03); }
  }
`;
      styleHost.appendChild(styleEl);
    }

    const originalUnmount = app.unmount;
    app.unmount = function () {
      originalUnmount.call(app);
      if (styleHost && styleHost.parentNode) {
        styleHost.parentNode.removeChild(styleHost);
      }
    };
  },
};

function getOptions(type: 'info' | 'success' | 'warning' | 'error', message: string): MessageParams {
  const base: MessageParams = {
    message,
    type,
    duration: 3000,
    offset: 30,
    plain: true,
    customClass: `msg-${type}`,
  };

  return {
    ...base,
  };
}

class Throttle {
  private static lastTimes: Record<string, number> = {};
  private static readonly INTERVAL = 3000;

  static allow(msg: string): boolean {
    const now = Date.now();
    const last = this.lastTimes[msg] || 0;
    if (now - last < this.INTERVAL) {
      return false;
    }
    this.lastTimes[msg] = now;
    return true;
  }
}

export class Message {
  static info(msg: string) {
    if (!Throttle.allow(msg)) return;
    messageApi(getOptions('info', msg));
  }

  static success(msg: string) {
    if (!Throttle.allow(msg)) return;
    messageApi(getOptions('success', msg));
  }

  static warning(msg: string) {
    if (!Throttle.allow(msg)) return;
    messageApi(getOptions('warning', msg));
  }

  static error(msg: string) {
    if (!Throttle.allow(msg)) return;
    messageApi(getOptions('error', msg));
  }
}
