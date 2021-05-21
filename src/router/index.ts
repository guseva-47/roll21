import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Main from "../components/MainPage/Main.vue";
import UserProfile from "../components/UserProfile/UserProfile.vue";
import TwoColumnTemplate from "../components/TwoColumnTemplate.vue";
import UserRightBar from "../components/UserProfile/UserRightBar.vue";
import GameProfile from "../components/GameProfile/GameProfile.vue";
import GameRightBar from "../components/GameProfile/GameRightBar.vue";
import Tabletop from "../components/Tabletop/Tabletop.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/game",
    name: "GameProfile",
    component: TwoColumnTemplate,
    children: [
      {
        path: "id",
        components: {
          rightBar: GameRightBar,
          leftBar: GameProfile,
        },
      },
    ],
  },
  {
    path: "/game/id/go",
    name: "Go",
    component: Tabletop,
  },
  {
    path: "/profile",
    name: "Profile",
    component: TwoColumnTemplate,
    children: [
      {
        path: "id",
        components: {
          rightBar: UserRightBar,
          leftBar: UserProfile,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
