<template>
  <div class="side-menu-container">
    <div class="side-menu">
      <div class="sound-toggle">
        <button @click="toggleSound">{{ soundIcon }}</button>
      </div>
      <div class="logo-container">
        <img src="/mainLogo.png" alt="Cryptomons Logo" class="logo" draggable="false" />
      </div>
      <div class="totalAssets infoboxed">
        {{ totalAssetsValue.toFixed(2) }} <img class="token-icon" :src="TokenManager.getReferenceTokenStore().getIcon()">
        <!-- Info Box -->
        <div class="infobox">
          <p>Total Assets value in converted in {{ TokenManager.getReferenceTokenStore().name }}</p>
        </div>
      </div>
      <nav class="main-menu-nav">
        <ul>
          <li>
            <router-link to="/" draggable="false">🏠 Home</router-link>
          </li>
          <li class="sidemenu-mines">
            <router-link to="/mines" draggable="false">⛏️ Mines</router-link>
          </li>
          <li v-if="useGoalStores['discover_proof_of_stake']().isCompleted" class="sidemenu-staking">
            <router-link to="/staking" draggable="false">🔒 Staking</router-link>
          </li>
          <li v-else class="sidemenu-staking">
            <router-link to="/staking" class="forbidden-link" draggable="false">🚫 Staking</router-link>
          </li>
          <li v-if="useGoalStores['grandma_bitcoin']().isCompleted" class="sidemenu-vault">
            <router-link to="/vault" draggable="false">🏛️ Vault</router-link>
          </li>
          <li v-else class="sidemenu-vault">
            <router-link to="/vault" class="forbidden-link" draggable="false">🚫 Vault</router-link>
          </li>
          <li v-if="useGoalStores['build_and_build']().isCompleted" class="sidemenu-battle">
            <router-link to="/battle" draggable="false">⚔️ Battle</router-link>
          </li>
          <li v-else class="sidemenu-battle">
            <router-link to="/battle" class="forbidden-link" draggable="false">🚫 Battle</router-link>
          </li>
          <li v-if="useGoalStores['shopping_on_silk_road']().isCompleted" class="sidemenu-inventory">
            <router-link to="/inventory" draggable="false">📦 Inventory</router-link>
          </li>
          <li v-else class="sidemenu-inventory">
            <router-link to="/inventory" class="forbidden-link" draggable="false">🚫 Inventory</router-link>
          </li>
          <li v-if="useGoalStores['centralize_decentralization']().isCompleted" class="sidemenu-swap">
            <router-link to="/swap" draggable="false">🔄 Swap</router-link>
          </li>
          <li v-else class="sidemenu-swap">
            <router-link to="/swap" class="forbidden-link" draggable="false">🚫 Swap</router-link>
          </li>
          <li class="sidemenu-goals">
            <router-link to="/goals" draggable="false" :class="goalsClass">🎯 Goals</router-link>
          </li>
          <li class="sidemenu-achievements">
            <router-link to="/achievements" draggable="false">🏆 Achievements</router-link>
          </li>
          <li class="sidemenu-stats">
            <router-link to="/stats" draggable="false">📊 Stats</router-link>
          </li>
          <li class="sidemenu-settings">
            <router-link to="/settings" draggable="false">⚙️ Settings</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useGoalStores } from '@/stores/useGoals';
import TokenManager from '@/managers/TokenManager';
import AudioManager from '@/managers/AudioManager';
import GoalManager from '@/managers/GoalManager';
import { useRoute } from 'vue-router';
import AchievementManager from '@/managers/AchievementManager';

export default defineComponent({
  name: 'SideMenu',
  setup() {
    /* SOUND */
    const soundOn = ref<boolean>(true);
    const soundIcon = computed(() => {
      return AudioManager.isSoundOn() ? '🔊' : '🔇';
    });
    const toggleSound = () => {
      soundOn.value = !soundOn.value;
      AudioManager.toggleSound();
    };
    let goalsClass = computed(() => {
      return GoalManager.isThereGoalCostToPay() ? 'shiny' : '';
    });

    /* Refreshed total assets */
    const totalAssetsValue = ref<number>(TokenManager.getTotalAssetsValue());
    let intervalId: number | null = null;
    const commonChecker = () => {
      totalAssetsValue.value = TokenManager.getTotalAssetsValue();
      AchievementManager.getAchievements().filter(achievementStore => !achievementStore.isCompleted).forEach(achievementStore => {
        const achievementReference = achievementStore.getReference()
        if (achievementReference >= achievementStore.target) {
          achievementStore.completeAchievement();
        }
      });
    };
    onMounted(() => {
      intervalId = window.setInterval(commonChecker, 1000); // Update every second
    });
    onBeforeUnmount(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    });

    const route = useRoute();

    return {
      useGoalStores,
      goalsClass,
      TokenManager,
      soundIcon,
      toggleSound,
      totalAssetsValue,
    };
  },
});
</script>

<style scoped>
.main-menu-nav {
  font-size: 20px;
  height: 100vh;
  min-height: 50px;
  width: 150px;
  overflow-y: scroll;
  overflow-x: auto; 
}

.sidemenu-achievements {
  font-size: 16px;
}

.totalAssets {
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  width: 150px;
}

.token-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
  margin-top: 4px;
  margin-left: 2px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, #1a1a1d, #4e4e50);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  margin-bottom: 20px;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
}

.logo-container:hover .logo {
  transform: scale(1.1);
}

.side-menu-container {
  width: 200px;
}

.side-menu {
  border-right: 5px solid #444;
  width: 160px;
  padding: 20px;
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url(/menuBG.png);
  background-size: cover;
  background-position: center center;
  position: fixed;
  height: 100vh;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  margin: 15px 0;
  position: relative;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  font-weight: bold;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 0.8em;
  width: 100%;
  display: block;
}

nav ul li a:not(nav ul li a.router-link-active, .shiny) {
  color: #fff;
}

nav ul li a:hover {
  font-size: 1em;
}

nav ul li a.router-link-active {
  color: #42b983;
}

.forbidden-link {
  color: red;
  font-weight: bold;
  cursor: not-allowed;
}

/** SOUND */
.sound-toggle {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
}

.sound-toggle button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.shiny {
  animation: shinyAnimation 2s infinite alternate;
}

@keyframes shinyAnimation {
  0% {
    color: #444;
    text-shadow: 0 0 10px #444;
  }
  100% {
    color: #ffa500;
    text-shadow: 0 0 10px #ffa500;
  }
}
</style>
