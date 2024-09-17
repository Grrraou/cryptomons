<template>
  <!-- @todo removed :style="backgroundStyle" -->
  <div class="clicker-area" :style="backgroundStyle" @dragover.prevent @drop="handleHeroDrop">
    <!-- Title and Logo Section -->
    <div class="title-section">
      <h3 class="mine-name">{{ mineStore.name }}</h3>
      <img :src="mineStore.getImage()" alt="Bitcoin Mine Logo" class="logo-image" draggable="false" />
      <div class="logs"></div>
    </div>
  
    <!-- Statistics and Actions Section -->
    <div class="stats-actions-section">
      <div class="statsBox">
        <p class="clicks-display statDisplay">
          <span class="clicks-text">{{ mineStore.clicks }}</span>
          <img src="/mines/clickCount.png" class="click-icon" draggable="false" />
        </p>
        <p class="level-display statDisplay">
          <span class="level-text">{{ mineStore.level }}</span>
          <img src="/mines/upgradeLevel.png" class="level-icon" draggable="false" />
        </p>
        <p class="token-balance-display statDisplay">
          <span class="token-balance-text">{{ tokenStore.balance.toFixed(SettingsManager.getSettings().decimals) }}</span>
          <img :src="tokenStore.getIcon()" class="token-icon" draggable="false" />
        </p>
      </div>
    </div>

    <div class="action-container">
        <button class="mine-button" @click="mineManually($event)">
          <img src="/mines/miningButton.png" alt="Mine Logo" class="button-logo" draggable="false" />
          Mine!
        </button>
        <button class="upgrade-button" @click="upgrade" :disabled="!mineStore.canUpgrade()">
          <img src="/mines/upgradeButton.png" alt="Mine Logo" class="button-logo" draggable="false" />
          Upgrade (Cost: {{ mineStore.getUpgradeCost() }} <img :src="tokenStore.getIcon()" class="token-icon-small" />)
        </button>
    </div>
  
    <!-- Workers Area Section -->
    <div class="workers-section">
      <p class="workers-heading">Workers in this Area:</p>
      <p v-if="heroes.length === 0" class="no-heroes">No workers assigned</p>
      <div v-if="heroes.length > 0" class="heroes-in-area">
        <div v-for="(hero, index) in heroes">
          <HeroThumb 
            v-if="hero.isWorkingThere(mineStore.index)"
            :key="index" 
            :hero="hero"
            class="hero-container"
            draggable="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import HeroThumb from '@/components/HeroThumb.vue';
import MineManager from '@/managers/MineManager';
import TokenManager from '@/managers/TokenManager';
import HeroManager from '@/managers/HeroManager';
import UXManager from '@/managers/UXManager';
import SettingsManager from '@/managers/SettingsManager';
  
export default defineComponent({
    components: {
      HeroThumb,
    },
    props: {
      mine: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const mineStore = MineManager.getMineStore(props.mine.index);
      const tokenStore = TokenManager.getTokenStore(mineStore.token);
      const heroes = ref(HeroManager.getHeroes());

      const backgroundStyle = computed(() => ({
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('${mineStore.getImage()}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }));

      const handleHeroDrop = (event: DragEvent) => {
        const heroIndex = event.dataTransfer?.getData('heroIndex');
        if (heroIndex) {
          const hero = HeroManager.getHeroStore(heroIndex);
          hero.location = mineStore.index;
          heroes.value = HeroManager.getHeroes();
        }
      };
      
      const mineManually = (event: MouseEvent) => {
        mineStore.increaseClicks(1);
        const minedAmount = mineStore.getDefaultMiningAmount();
        mineStore.mine(minedAmount);
        const x = event.clientX;
        const y = event.clientY;
        UXManager.showFlyingText(minedAmount.toFixed(SettingsManager.getSettings().decimals).toString(), tokenStore.getIcon(), x, y);
      };

      const upgrade = (event: MouseEvent) => {
        mineStore.upgrade()
        const x = event.clientX;
        const y = event.clientY;
        UXManager.showFlyingText('Level UP !', '/levelUp.png', x, y);
      };

      return {
        mineStore,
        backgroundStyle,
        tokenStore,
        heroes,
        SettingsManager,
        handleHeroDrop,
        mineManually,
        upgrade,
      };
    },
  });
  </script>
  
  


<style scoped>
  .mine-name {
    color: #444;
    margin-right: 15px;
  }

  .clicker-area {
    margin: 10px auto;
    padding: 20px;
    width: 90%;
    border: 4px solid #ffa500;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-blend-mode: 'lighten';
    font-size: 1.3em;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }

  .clicker-area:hover {
    border: 4px solid #5EC15E;
  }

  .title-section {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 15px;
  }

  .title-section h2 {
    margin: 0 10px;
  }

  .title-section img {
    max-width: 80px;
    max-height: 80px;
    border: 3px solid #ffa500;
    border-radius: 33%;
  }

  .logo-image {
    max-width: 80px;
    max-height: 80px;
    border: 3px solid #ffa500;
    border-radius: 50%;
    margin-top: 10px;
  }

  .statsBox {
    display: flex;
  }

  .statDisplay {
    margin: 0 15px !important;
  }

  .logs {
    padding: 0 20px;
    float: right;
  }

  .stats-actions-section {
    text-align: center;
    margin-bottom: 15px;
  }

  .clicks-display, .level-display {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    margin: 10px 0;
    color: #333;
  }

  .clicks-text, .level-text {
    font-size: 1.3em;
    font-weight: bold;
    margin-right: 10px;
  }

  .click-icon, .level-icon, .token-icon {
    width: 40px;
    height: auto;
    transition: transform 0.3s ease;
  }

  .token-icon-small {
    width: 20px;
    margin-left: 3px;
    margin-top: -2px;
  }

  .clicks-display:hover .click-icon, .level-display:hover .level-icon, .token-balance-display:hover .token-icon {
    transform: scale(2);
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    margin: 5px;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .action-container {
    display: flex;
  }

  .mine-button, .upgrade-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    background-color: #ffa500;
    border: 2px solid #444;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .mine-button:hover, .upgrade-button:hover {
    background-color: #ff8c00;
    transform: translateY(-2px);
  }

  .mine-button:active, .upgrade-button:active {
    background-color: #e07a00;
    transform: translateY(0);
  }

  .button-logo {
    width: 50px;
    height: 50px;
    margin-right: 8px;
  }

  .mine-button img {
    pointer-events: none;
  }

  .workers-section {
    width: 100%;
  }

  .workers-heading {
    font-size: 1.5em;
    font-weight: bold;
    color: #444;
    margin-bottom: 10px;
    text-align: center;
    background-color: rgba(255, 165, 0, 0.1);
    padding: 10px;
    border-radius: 10px;
    border: 2px dashed #444;
  }

  .no-heroes {
    font-size: 1.2em;
    color: #888;
    text-align: center;
    margin-bottom: 20px;
    padding: 10px;
    background-color: rgba(240, 240, 240, 0.8);
    border-radius: 10px;
    border: 2px dashed #444;
  }

  .heroes-in-area {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    background-image: url('/mines/workingBG.png');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .token-balance-display {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    margin: 10px 0;
    color: #333;
  }

  .token-balance-text {
    font-size: 1.3em;
    font-weight: bold;
    margin-right: 10px;
  }

  .token-icon {
    width: 30px;
    height: auto;
  }
</style>
  