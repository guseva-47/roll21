import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from './router'
import VueCookies from 'vue3-cookies'

createApp(App).use(router, VueCookies).mount('#app')
