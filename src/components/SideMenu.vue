<template>
    <div class="side-menu-container">
      <div class="side-menu">
        <div class="sound-toggle">
            <button @click="toggleSound()">{{ soundIcon }}</button>
          </div>
        <div class="side-menu-container">
          <div class="logo-container">
            <img src="@/assets/mainLogo.png" alt="Cryptomons Logo" class="logo" />
          </div>
          <div class="totalAssets">
            {{ totalAssetsValue }} <img class="token-icon" src="@/assets/tokens/cryptodollar.png">
          </div>
          <nav class="main-menu-nav">
            <ul>
              <li>
                <router-link to="/">🏠 Home</router-link>
              </li>
              <li>
                <router-link to="/mines">⛏️ Mines</router-link>
              </li>
              <li v-if="true">
                <router-link to="/staking">🔒 Staking</router-link>
              </li>
              <li v-else>
                <router-link to="/staking" class="forbidden-link">🚫 Staking</router-link>
              </li>
              <li v-if="true">
                <router-link to="/vault">🏛️ Vault</router-link>
              </li>
              <li v-else>
                <router-link to="/vault" class="forbidden-link">🚫 Vault</router-link>
              </li>
              <li v-if="true">
                <router-link to="/battle">⚔️ Battle</router-link>
              </li>
              <li v-else>
                <router-link to="/battle" class="forbidden-link">🚫 Battle</router-link>
              </li>
              <li v-if="true">
                <router-link to="/inventory">📦 Inventory</router-link>
              </li>
              <li v-else>
                <router-link to="/inventory" class="forbidden-link">🚫 Inventory</router-link>
              </li>
              <li v-if="true">
                <router-link to="/swap">🔄 Swap</router-link>
              </li>
              <li v-else>
                <router-link to="/swap" class="forbidden-link">🚫 Swap</router-link>
              </li>
              <li>
                <router-link to="/goals">🎯 Goals</router-link>
              </li>
              <li>
                <router-link to="/achievements">🏆 Achievements</router-link>
              </li>
              <li>
                <router-link to="/stats">📊 Stats</router-link>
              </li>
              <li>
                <router-link to="/settings">⚙️ Settings</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onBeforeUnmount } from 'vue';
import TokenManager from '@/managers/TokenManager';
import AudioManager from '@/managers/AudioManager';

export default defineComponent({
    name: 'SideMenu',
    setup(props) {
        /* SOUND */
        const soundOn = ref<boolean>(true);
        const soundIcon = computed(() => {
            return AudioManager.isSoundOn() ? '🔊' : '🔇';
        });
        const toggleSound = () => {
            soundOn.value = !soundOn.value;
            AudioManager.toggleSound();
        };

        /* Refreshed total assets */
        const totalAssetsValue = ref<number>(TokenManager.getTotalAssetsValue());
        let intervalId: number | null = null;
        const updateTotalAssetsValue = () => {
            totalAssetsValue.value = TokenManager.getTotalAssetsValue();
        };
        onMounted(() => {
            intervalId = window.setInterval(updateTotalAssetsValue, 1000); // Update every second
        });
        onBeforeUnmount(() => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        });

        return {
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
}

.totalAssets {
    font-weight: bold;
    font-size: 20px;
}

.token-icon {
    width: 16px;
    height: auto;
    transition: transform 0.3s ease;
    margin-bottom: -2px;
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
    width: 160px;
    padding: 20px;
    background-image: url('@/assets/menuBG.png');
    position: fixed;
    height: 100vh;
}

nav ul {
    list-style-type: none;
    padding: 0;
}

nav ul li {
    margin: 10px 0;
}

nav ul li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

nav ul li a:hover {
    font-size: 1.2em;
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
</style>
