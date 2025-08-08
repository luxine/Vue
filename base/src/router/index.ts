import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import routes from './routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({
  trickleSpeed: 200,
  minimum: 0.1,
});

const platform = (import.meta.env.VITE_APP_PLATFORM || 'web').toLowerCase();
const router = createRouter({
  history: resolveHistory(),
  routes,
});
function resolveHistory() {
  const base = import.meta.env.BASE_URL;
  if (platform === 'electron') {
    return createWebHashHistory(base);
  }
  return createWebHistory(base);
}

router.beforeEach(async (to, from, next) => {
  if (from.name && from.fullPath !== to.fullPath) {
    sessionStorage.setItem('prevRoute', from.fullPath);
  }

  NProgress.start();
  next();
});

router.afterEach((to, from, failure) => {
  NProgress.done();
  if (!failure) {
    setTimeout(() => window.HSStaticMethods?.autoInit(), 100);
  }
});
router.onError(() => {
  NProgress.done();
});
export function safeBack() {
  const prev = sessionStorage.getItem('prevRoute');
  const current = router.currentRoute.value.fullPath;

  if (prev && prev !== current) {
    router.replace(prev);
  } else {
    router.push('/');
  }
}

export default router;
