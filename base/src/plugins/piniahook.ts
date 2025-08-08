import { PiniaPluginContext } from 'pinia';

export const initHook = async (ctx: PiniaPluginContext) => {
  const { store } = ctx;
  if (typeof store.__init__ === 'function') await store.__init__();
  if (typeof store.__initState__ === 'boolean' && store.__initState__ === false) {
    store.__initState__ = true;
  }
  return;
};
