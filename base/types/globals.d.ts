declare const __APP_VERSION__: string;
declare const __BUILD_TIME__: string;
declare const __COMMIT_HASH__: string;
declare const __GIT_HASH__: string;
import { Composer } from 'vue-i18n';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: Composer['t'];
  }
}
declare module 'vue' {
  export interface GlobalComponents {
    VChart: typeof import('vue-echarts')['default']
  }
}

import type { IStaticMethods } from "preline/dist";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
    $temp: null | string | Record<string,string>;
  }
}
export {};
