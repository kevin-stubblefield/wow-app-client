import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import CharacterDetail from '@/components/CharacterDetail.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/character/:realm/:name',
        name: 'CharacterDetail',
        component: CharacterDetail,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;