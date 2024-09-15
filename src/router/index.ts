import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MinesPage from '@/views/MinesPage.vue';
import VaultPage from '@/views/VaultPage.vue';
import GoalsPage from '@/views/GoalsPage.vue';
import StakingPage from '@/views/StakingPage.vue';
import AchievementsPage from '@/views/AchievementsPage.vue';
import BattlePage from '@/views/BattlePage.vue';
import StatsPage from '@/views/StatsPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/mines', name: 'Mines', component: MinesPage },
  { path: '/staking', name: 'Staking', component: StakingPage },
  { path: '/vault', name: 'Vault', component: VaultPage },
  { path: '/battle', name: 'Battle', component: BattlePage },
  { path: '/goals', name: 'Goals', component: GoalsPage },
  { path: '/achievements', name: 'Achievements', component: AchievementsPage },
  { path: '/stats', name: 'Stats', component: StatsPage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;