import { Message } from '@/plugins/message';
export async function initStoresHook() {
  const modules = import.meta.glob('/src/stores/**/*.ts');
  try {
    await Promise.allSettled(
      Object.values(modules).map(async (loadModule) => {
        const mod = await loadModule();
        for (const exported of Object.values(mod || {})) {
          if (typeof exported === 'function') {
            const store = exported();
            if (typeof store.__init__ === 'function') {
              await store.__init__();
            }
          }
        }
      }),
    );
  } catch (error: string | unknown) {
    if (error instanceof Error) {
      Message.info(error.message as string);
    }
  }
}
