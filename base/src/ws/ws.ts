import { WsModules } from './webSocketModules';
import { setupWsEnvet } from './handleWebSocketEvent';

let wsClient: WsModules;

export function initWebSocket(url: string) {
  wsClient = new WsModules({ url });
  setupWsEnvet(wsClient);
  return wsClient;
}

export function useWebSocket() {
  if (!wsClient) throw new Error('WebSocket client is not initialized.');
  return wsClient;
}
