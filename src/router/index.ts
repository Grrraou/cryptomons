import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import MinesPage from '@/views/MinesPage.vue';
import VaultPage from '@/views/VaultPage.vue';
import GoalsPage from '@/views/GoalsPage.vue';
import StakingPage from '@/views/StakingPage.vue';
import AchievementsPage from '@/views/AchievementsPage.vue';
import BattlePage from '@/views/BattlePage.vue';
import InventoryPage from '@/views/InventoryPage.vue';
import StatsPage from '@/views/StatsPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';
import SwapPage from '@/views/SwapPage.vue';
import GoalManager from '@/managers/GoalManager';
import ToTheMoon from '@/views/ToTheMoon.vue';
import NFTsPage from '@/views/NFTsPage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/mines', name: 'Mines', component: MinesPage },
  { 
    path: '/staking', 
    name: 'Staking', 
    component: StakingPage,
    beforeEnter: (to, from, next) => {
      const isGoalUnlocked = GoalManager.isGoalReached('discover_proof_of_stake');
      if (isGoalUnlocked) {
        next(); 
      } else {
        alert('You need to discover the proof of stake before accessing the Staking.');
        next('/goals');
      }
    },
  },
  { 
    path: '/vault', 
    name: 'Vault', 
    component: VaultPage,
    beforeEnter: (to, from, next) => {
      const isGoalUnlocked = GoalManager.isGoalReached('grandma_bitcoin');
      if (isGoalUnlocked) {
        next(); 
      } else {
        alert('You need to Convince Grandma to Buy Bitcoin before accessing the Vault.');
        next('/goals');
      }
    },
  },
  { 
    path: '/battle', 
    name: 'Battle', 
    component: BattlePage,
    beforeEnter: (to, from, next) => {
      const isGoalUnlocked = GoalManager.isGoalReached('build_and_build');
      if (isGoalUnlocked) {
        next(); 
      } else {
        alert('You need to build and build and build and build and build before accessing the battlefield.');
        next('/goals');
      }
    }, 
  },
  { 
    path: '/inventory', 
    name: 'Inventory', 
    component: InventoryPage,
    beforeEnter: (to, from, next) => {
      const isGoalUnlocked = GoalManager.isGoalReached('shopping_on_silk_road');
      if (isGoalUnlocked) {
        next(); 
      } else {
        alert('You need to do some shopping on Silk Road before accessing the inventory.');
        next('/goals');
      }
    }, 
  },
  { 
    path: '/swap', 
    name: 'Swap', 
    component: SwapPage, 
    beforeEnter: (to, from, next) => {
      const isGoalUnlocked = GoalManager.isGoalReached('centralize_decentralization');
      if (isGoalUnlocked) {
        next(); 
      } else {
        alert('You need to Centralize decentralization before accessing the swap.');
        next('/goals');
      }
    }, 
  },
  { path: '/goals', name: 'Goals', component: GoalsPage },
  { 
    path: '/toTheMoon', 
    name: 'toTheMoon', 
    component: ToTheMoon, 
    beforeEnter: (to, from, next) => {
      const isGoalUnlocked = GoalManager.isGoalReached('fund_doge_1');
      if (isGoalUnlocked) {
        next(); 
      } else {
        alert('You need to fund the DOGE-1 mission first.');
        next('/goals');
      }
    }, 
  },
  { path: '/NFTs', name: 'NFTs', component: NFTsPage },
  { path: '/achievements', name: 'Achievements', component: AchievementsPage },
  { path: '/stats', name: 'Stats', component: StatsPage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;