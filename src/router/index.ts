import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MinesPage from '@/views/MinesPage.vue';
import VaultPage from '@/views/VaultPage.vue';
import GoalsPage from '@/views/GoalsPage.vue';
import StakingPage from '@/views/StakingPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/mines', name: 'Mines', component: MinesPage },
  { path: '/staking', name: 'Staking', component: StakingPage },
  { path: '/vault', name: 'Vault', component: VaultPage },
  { path: '/goals', name: 'Goals', component: GoalsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;