import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Main from '../components/MainPage/Main.vue';
import UserProfile from '../components/UserProfile/UserProfile.vue';
import TwoColumnTemplate from '../components/TwoColumnTemplate.vue';
import UserRightBar from '../components/UserProfile/UserRightBar.vue';
import TableProfile from '../components/TableProfile/TableProfile.vue';
import TableRightBar from '../components/TableProfile/TableRightBar.vue';
import Tabletop from '../components/Tabletop/Tabletop.vue';
import EditorExample from '../components/EditorExample.vue';
import Oauth from '../components/utils/Oauth.vue';
import Login from '../components/utils/Login.vue';
import Dropdown from '../components/utils/dropdown.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: Main,
    },
    {
        path: '/table',
        name: 'TableProfile',
        component: TwoColumnTemplate,
        children: [
            {
                path: ':idTable',
                name: 'TableProfId',
                components: {
                    rightBar: TableRightBar,
                    leftBar: TableProfile,
                },
            },
        ],
    },
    {
        path: '/oauth/:jwt',
        name: 'Oauth',
        component: Oauth,
    },
    {
        path: '/table/:idTable/go',
        name: 'Go',
        component: Tabletop,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: TwoColumnTemplate,
        children: [
            {
                path: ':id',
                name: 'ProfId',
                components: {
                    rightBar: UserRightBar,
                    leftBar: UserProfile,
                },
            },
        ],
    },
    { path: '/edit', name: 'edit', component: EditorExample },
    // { path: "/profile", redirect: { name: "Main" } }, // todo, по-хорошему, надо переводить а страницу пользователя, я думаю
    // { path: "/table", redirect: { name: "Main" } }, // todo
    { path: '/login', name: 'Login', component: Login }, // todo настоящая страница логин
    { path: '/test', name: 'Dropdown', component: Dropdown },

    { path: '/test/tabletop', component: Tabletop },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
