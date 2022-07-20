import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/setting',
        name: 'Setting',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/setting/components/Setting.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
