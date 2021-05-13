import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '../components/Main.vue'
import UserProfile from '../components/UserProfile/UserProfile.vue'
import TwoColumnTemplate from '../components/TwoColumnTemplate.vue'
import UserRightBar from '../components/UserProfile/UserRightBar.vue'
import GameProfile from '../components/GameProfile/GameProfile.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/game',
    name: 'GameProfile',
    component: TwoColumnTemplate,
    children: [{
      path: 'id',
      components: {
        rightBar: UserRightBar,
        leftBar: GameProfile
      }
    }]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: TwoColumnTemplate,
    children: [{
      path: 'id',
      components: {
        rightBar: UserRightBar,
        leftBar: UserProfile
      }
    }]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
