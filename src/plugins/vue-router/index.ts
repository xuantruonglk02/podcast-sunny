import { PageName } from '@/common/constants';
import LoginPage from '@/features/auth/pages/LoginPage.vue';
import NotFoundPage from '@/features/error/pages/NotFoundPage.vue';
import ClassPage from '@/features/podcast/pages/ClassPage.vue';
import GamePage from '@/features/podcast/pages/GamePage.vue';
import PodcastPage from '@/features/podcast/pages/PodcastPage.vue';
import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/404',
        name: PageName.NOT_FOUND_PAGE,
        component: NotFoundPage,
        meta: {
            public: true,
        },
    },
    {
        path: '/:catchAll(.*)*',
        redirect: '/404',
    },
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/podcast',
        name: PageName.PODCAST_PAGE,
        component: PodcastPage,
        meta: {
            public: true,
        },
    },
    {
        path: '/class',
        name: PageName.CLASS_PAGE,
        component: ClassPage,
        meta: {
            public: true,
        },
    },
    {
        path: '/login',
        name: PageName.LOGIN_PAGE,
        component: LoginPage,
        meta: {
            public: true,
        },
    },
    {
        path: '/game',
        name: PageName.GAME_PAGE,
        component: GamePage,
        meta: {
            public: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});

export default router;
