import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import VueTour from 'vue3-tour';
import 'vue3-tour/dist/vue3-tour.css';

const app = createApp(App);
app.use(router);

const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);

app.use(VueTour as any);

/* https://vue3-toastify.js-bridge.com/api/toast.html */
app.use(Vue3Toastify, {
    position: 'top-right',
    autoClose: 20000,
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: false,
    icon: false,
    rtl: false,
} as ToastContainerOptions);

app.mount('#app');