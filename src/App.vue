<template>
  <FallingToken :tokens="fallingTokens"/>
  <div class="layout">
    <!-- Use the SideMenu component here -->
    <SideMenu />

    <!-- Main content area -->
    <div class="page-content">
      <!-- This will render the routed content -->
      <router-view v-slot="{ Component }">
        <div v-if="Component">
          <!-- Render the routed component -->
          <component :is="Component" />
        </div>
        <div v-else>
          <!-- Fallback content when no route is matched -->
          <HomePage />
        </div>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideMenu from './components/SideMenu.vue';
import '/public/styles/main.css';
import MineManager from './managers/MineManager';
import StakingManager from './managers/StakingManager';
import BattlefieldManager from './managers/BattlefieldManager';
import HomePage from './views/HomePage.vue';
import AudioManager from './managers/AudioManager';
import FallingToken from './components/animations/FallingToken.vue';
import TokenManager from './managers/TokenManager';
import RocketManager from './managers/RocketManager';

export const rocketManager = new RocketManager();

export default defineComponent({
  components: {
    SideMenu,
    HomePage,
    FallingToken
  },
  setup: () => {
    const fallingTokens = TokenManager.getTokens().filter(tokenStore => {
      return tokenStore.balance > 0;
    })

    return {
      fallingTokens,
    }
  },
  created() {
    const mineManager = new MineManager();
    mineManager.startAutoMining();

    const stakingManager = new StakingManager();
    stakingManager.startAutoStaking();

    const battlefieldManager = new BattlefieldManager();
    battlefieldManager.startAutoBattle();

    AudioManager.playMusic();

    const rocketStore = RocketManager.getRocket();
    if (rocketStore.isActive && rocketManager.startPlanetDiscoveryInterval() === null) {
      rocketManager.startPlanetDiscoveryInterval();
    }

    //UXManager.disableRightClick();
  },
});
</script>

<style scoped>
body {
  margin: 0px !important;
}

.layout {
  display: flex;
  min-height: 100vh;
}


</style>
