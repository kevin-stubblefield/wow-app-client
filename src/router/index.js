import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import CharacterDetail from '@/components/CharacterDetail.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/character/:realm/:name',
        component: CharacterDetail,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;