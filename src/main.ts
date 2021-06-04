import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './router';
import { store } from './store';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
