import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import VaultPage from '@/views/VaultPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/vault', name: 'Vault', component: VaultPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;