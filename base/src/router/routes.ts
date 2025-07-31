import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Home/OverallLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/root',
        name: 'root',
        component: () => import('@/views/Root/Root.vue'),
        meta: {
          title: 'root',
        },
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/Welcome.vue'),
        meta: {
          title: 'home',
        },
      },
    ],
  },
];

export default routes;
