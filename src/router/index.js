import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';

const routes = [
    {
        route: '/',
        name: 'Home',
        component: Home
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;