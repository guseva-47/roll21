import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './router';
import { store } from './store';

import contextmenu from 'vue3-contextmenu';
import 'vue3-contextmenu/dist/vue3-contextmenu.css';

createApp(App)
<<<<<<< HEAD
  .use(router)
  .use(store)
  .use(contextmenu)
  .mount("#app");
=======
    .use(router)
    .use(store)
    .mount('#app');
>>>>>>> 457af2ccbe586972ec8a058d824b896c32e58e1e
