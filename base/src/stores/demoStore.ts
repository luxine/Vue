import { __watchInitState__ } from '@/plugins/piniaHook';
import { defineStore } from 'pinia';

export const useDemoStore = defineStore('useDemoStore', () => {
    const __init__ = async () => {
        await new Promise((r) => {
            setTimeout(() => {
                console.log('[Pinia] demoStore init.');
                r(true)
            }, 2000);
        })
    };
    const __initState__ = ref(false);
    const __waitInit__ = async () => {
        return await __watchInitState__(__initState__)
    };

    return {
        __init__,
        __initState__,
        __waitInit__,
    };
});
