import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './router';
import { store } from './store';

import contextmenu from 'vue3-contextmenu';
import 'vue3-contextmenu/dist/vue3-contextmenu.css';

createApp(App)
  .use(router)
  .use(store)
  .use(contextmenu)
  .mount("#app");
