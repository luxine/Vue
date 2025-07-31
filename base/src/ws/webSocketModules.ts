import { WsOptions, WsEventCallback, WsMessage } from '@/interface/ws';
export class WsModules {
  private ws: WebSocket | null = null;
  private readonly url: string;
  private readonly protocols?: string | string[];
  private readonly autoReconnect: boolean;
  private readonly reconnectInterval: number;
  private reconnectTimer: number | null = null;
  private isManuallyClosed = false;
  private eventMap = new Map<string, Set<WsEventCallback>>();

  constructor(options: WsOptions) {
    this.url = options.url;
    this.protocols = options.protocols;
    this.autoReconnect = options.autoReconnect ?? true;
    this.reconnectInterval = options.reconnectInterval ?? 3000;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url, this.protocols);
    this.ws.onopen = () => {
      this.log('[WS] Connected');
    };

    this.ws.onclose = () => {
      this.log('[WS] Disconnected');
      if (this.autoReconnect && !this.isManuallyClosed) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = (err) => {
      this.log('[WS] Error:', err);
    };

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const msg: WsMessage = JSON.parse(event.data);
        this.emitEvent(msg.event, { ...msg });
      } catch {
        this.log('[WS] Invalid message:', event.data);
      }
    };
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = window.setTimeout(() => {
      this.log('[WS] Reconnecting...');
      this.connect();
      this.reconnectTimer = null;
    }, this.reconnectInterval);
  }

  private emitEvent(type: string, payload: WsMessage) {
    const listeners = this.eventMap.get(type);
    if (listeners) {
      listeners.forEach((cb) => cb(payload));
    }
  }

  on(type: string, callback: WsEventCallback) {
    if (!this.eventMap.has(type)) {
      this.eventMap.set(type, new Set());
    }
    this.eventMap.get(type)!.add(callback);
  }

  off(type: string, callback: WsEventCallback) {
    this.eventMap.get(type)?.delete(callback);
  }

  send(event: string, name: string, payload?: unknown) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message: WsMessage = { event, name, payload };
      this.ws.send(JSON.stringify(message));
    } else {
      this.log('[WS] Cannot send: WebSocket not connected');
    }
  }

  close() {
    this.isManuallyClosed = true;
    this.ws?.close();
    this.ws = null;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private log(...args: unknown[]) {
    console.warn('[WS logs]', args);
  }
}
