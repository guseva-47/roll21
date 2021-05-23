import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Main from "../components/MainPage/Main.vue";
import UserProfile from "../components/UserProfile/UserProfile.vue";
import TwoColumnTemplate from "../components/TwoColumnTemplate.vue";
import UserRightBar from "../components/UserProfile/UserRightBar.vue";
import TableProfile from "../components/TableProfile/TableProfile.vue";
import TableRightBar from "../components/TableProfile/TableRightBar.vue";
import Tabletop from "../components/Tabletop/Tabletop.vue";
import EditorExample from "@/components/EditorExample.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/table",
    name: "TableProfile",
    component: TwoColumnTemplate,
    children: [
      {
        path: ":idTable",
        name: "TableProfId",
        components: {
          rightBar: TableRightBar,
          leftBar: TableProfile,
        },
      },
    ],
  },
  {
    path: "/table/:idTable/go",
    name: "Go",
    component: Tabletop,
  },
  {
    path: "/profile",
    name: "Profile",
    component: TwoColumnTemplate,
    children: [
      {
        path: ":id",
        name: "ProfId",
        components: {
          rightBar: UserRightBar,
          leftBar: UserProfile,
        },
      },
    ],
  },
  {
    path: "/editor",
    name: "Editor",
    component: EditorExample,
  },
  { path: "/profile", redirect: { name: "Main" } }, // todo, по-хорошему, надо переводить а страницу пользователя, я думаю
  { path: "/table", redirect: { name: "Main" } }, // todo
  { path: "/login", name: "login", component: Main }, // todo настоящая страница логин
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
