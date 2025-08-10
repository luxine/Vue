import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Home/OverallLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/Welcome.vue'),
        meta: {
          title: 'home',
        },
      },
      {
        path: '/docs',
        name: 'docs',
        component: () => import('@/views/Docs/Docs.vue'),
        meta: {
          title: 'docs',
        },
      },
    ],
  },
];

export default routes;
