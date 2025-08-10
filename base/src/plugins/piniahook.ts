import { PiniaPluginContext } from 'pinia';

export const initHook = async (ctx: PiniaPluginContext) => {
  const { store } = ctx;
  if (typeof store.__init__ === 'function') await store.__init__();
  if (typeof store.__initState__ === 'boolean' && store.__initState__ === false) {
    store.__initState__ = true;
    console.log('initState');
  }
  return;
};

export async function __watchInitState__(initState: Ref<boolean>) {
  if (initState.value) {
    return true;
  }
  return new Promise((r) => {
    let state = false;
    const { stop } = watch(
      () => initState.value,
      (r) => {
        if (r) {
          state = r;
        }
      },
    );
    const timerID = setInterval(() => {
      if (state) {
        stop();
        clearInterval(timerID);
        r(true);
      }
    }, 50);
  });
}