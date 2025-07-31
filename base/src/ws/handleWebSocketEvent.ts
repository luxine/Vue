import { WsModules } from './webSocketModules';

export const setupWsEnvet = (ws: WsModules) => {
  testEvent(ws);
};

const testEvent = (ws: WsModules) => {
  ws.on('TEST', () => {
    return;
  });
};
