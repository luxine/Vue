import { PiniaPluginContext } from 'pinia';
import { once } from 'lodash-es';
import { initStoresHook } from '@/hooks/initpiniahook';
const runInitOnce = once(async () => {
  await initStoresHook();
});
export const initHook = async (ctx: PiniaPluginContext) => {
  const { store } = ctx;
  if (typeof store.__init__ === 'function') await store.__init__();
  if (typeof store.__initState__ === 'boolean' && store.__initState__ === false) {
    store.__initState__ = true;
  }
  return;
  runInitOnce();
};
