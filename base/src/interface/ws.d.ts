export interface WsOptions {
  url: string;
  protocols?: string | string[];
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

export type WsEventCallback = (data: WsMessage) => void;

export interface WsMessage {
  name: string;
  payload?: unknown;
  event: string;
}
