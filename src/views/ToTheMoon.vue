<template>
  <div class="rocket-container">
    <div class="space-background" :style="{ backgroundPositionY: backgroundPosition + 'px' }"></div>
    <div class="rocket" id="rocket">
      <img :src="rocketImage" alt="Rocket" class="rocket-image" draggable="false" :class="{ shake: isShaking }" />
      <button @click="toggleRocket" :disabled="gasStore.balance < 0.1">
        {{ isShaking ? 'Stop Rocket' : 'Start Rocket' }}
        ( {{ gasStore.balance.toFixed(2) }} <img :src="gasStore.getIcon()" class="token-icon"> )
      </button>
    </div>
    <!-- Planet appears when discovered -->
    <div v-if="planetDiscovered" class="planet" :style="planet.style" id="planet">
        {{ planet.name }}<br><!-- Dynamic planet content here -->
        {{ planet.description }}
    </div>
  </div>
</template>

<script lang="ts">
import BattlefieldManager from '@/managers/BattlefieldManager';
import HeroManager from '@/managers/HeroManager';
import ItemManager from '@/managers/ItemManager';
import SettingsManager from '@/managers/SettingsManager';
import TokenManager from '@/managers/TokenManager';
import UXManager from '@/managers/UXManager';
import { cp } from 'fs';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
      const isShaking = ref(false);
      const rocketImage = ref('/moon/rocket-stop.png');
      const backgroundPosition = ref(0); // Current background Y position
      const planetDiscovered = ref(false); // Whether a planet is discovered

      const planetName = ref('Planet X'); // Dynamic planet name or content
      const planet = ref({name: 'Name', style: '', description: ''});

      let animationFrameId: number | null = null;
      let lastTime: number | null = null;
      let discoveryInterval: ReturnType<typeof setInterval>;
      const gasStore = TokenManager.getTokenStore('gas');
      


    const speed = 100; // Pixels per second for background movement

    const moveBackground = (timestamp: number) => {
      if (lastTime !== null) {
        const delta = timestamp - lastTime;
        backgroundPosition.value += (delta / 1000) * speed; // Move space background up
      }
      lastTime = timestamp;
      animationFrameId = requestAnimationFrame(moveBackground); // Continue the animation loop
    };

    const checkForPlanetDiscovery = () => {
      // Random 1/5 chance of discovering a planet
      gasStore.updateBalance(-0.1);
      UXManager.showFlyingTextOnElement('-0.1', gasStore.getIcon(), 'rocket', 150, 'red');
      if (gasStore.balance < 0.1) {
        stopRocket();
        UXManager.showFlyingTextOnElement('Out of gas', gasStore.getIcon(), 'rocket', 150, 'red');
      }
      if (Math.random() < 1 / 5) {
        generatePlanet();
        stopRocket(); // Auto-stop the rocket if a planet is discovered
      }
    };

    const generatePlanet = () => {
      planetDiscovered.value = true;

      const rand = Math.random() * 100;

      /**
       * Tokens
       */
      if (rand < 30) {
        const tokenStore = TokenManager.getTokens()[Math.floor(Math.random() * TokenManager.getTokens().length)];
        const totalAssets = TokenManager.getTotalAssetsValue();
        const randomPercent = Math.random() * (5 - 1) + 1; 
        const partOfAssets = (randomPercent / 100) * totalAssets;
        const gain = partOfAssets / tokenStore.price;
        tokenStore.updateBalance(gain);

        planet.value.name = `Found a ${tokenStore.name} deposit !`;
        planet.value.style = `background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(240, 240, 240, 0.7)), url("${tokenStore.getIcon()}");background-size: cover;background-position: center center;`;
        planet.value.description = `+${gain.toFixed(2)} ${tokenStore.index.toUpperCase()}`;
        
        UXManager.showFlyingTextOnElement(`+${gain.toFixed(SettingsManager.getSettings().decimals)}`, tokenStore.getIcon(), 'rocket', 150, 'green');

      } 
      /**
       * Heroes
       */
      else if (rand < 60) {
        const unlockedHeroes = HeroManager.getHeroes()
          .filter(heroStore => {
            return heroStore.isUnlocked();
          });
        const heroStore = unlockedHeroes[Math.floor(Math.random() * unlockedHeroes.length)];
        const randomPercent = Math.random() * (5 - 1) + 1; 
        const gain = (randomPercent / 100) * heroStore.getXpToLevel();

        planet.value.name = `${heroStore.name} found an anomaly !`;
        planet.value.style = `background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(240, 240, 240, 0.7)), url("${heroStore.getPicture()}");background-size: cover;background-position: center center;`;
        planet.value.description = `+${gain.toFixed(2)} XP`;

        UXManager.showFlyingTextOnElement(`+${gain.toFixed(SettingsManager.getSettings().decimals)} XP`, '', 'rocket', 150, 'green');

      } 
      /**
       * ITEMS
       */
      else if (rand < 190) {
        const unlockedBattlefields = BattlefieldManager.getBattlefields().filter(battlefield => {
          return battlefield.isUnlocked();
        });
        const monster = unlockedBattlefields[Math.floor(Math.random() * unlockedBattlefields.length)].getRandomMonster();
        const item = ItemManager.getBaseItem(monster.loot.index);

        ItemManager.getItemStore().lootItem(monster.loot.index)

        planet.value.name = `${monster.name} defeated !`;
        planet.value.style = `background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(240, 240, 240, 0.7)), url("/monsters/${monster.index}.png");background-size: cover;background-position: center center;`;
        planet.value.description = `Found a ${item.name}`;

      } 
      /**
       * NFTs
       */
      else {
        planet.value.name = `Found a NFT !`;
        planet.value.style = `background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(240, 240, 240, 0.7)), url("/items/default.png");background-size: cover;background-position: center center;`;
        planet.value.description = `Not implemented yet`;
      }

    }

    const toggleRocket = () => {
      planetDiscovered.value = false;
      isShaking.value = !isShaking.value;
      rocketImage.value = isShaking.value
        ? '/moon/rocket-start.png'
        : '/moon/rocket-stop.png';

      if (isShaking.value) {
        // Start moving the background
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(moveBackground);
        discoveryInterval = setInterval(checkForPlanetDiscovery, 10000 / SettingsManager.getSettings().rocketSpeed);
      } else {
        stopRocket();
      }
    };

    const stopRocket = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      if (discoveryInterval !== null) {
        clearInterval(discoveryInterval);
        discoveryInterval = null;
      }
      lastTime = null;
      isShaking.value = false;
      rocketImage.value = '/moon/rocket-stop.png';
    };

    onMounted(() => {
      // Clean up intervals and animations if the component is destroyed
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (discoveryInterval !== null) {
        clearInterval(discoveryInterval);
      }
    });

    onBeforeUnmount(() => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (discoveryInterval !== null) {
        clearInterval(discoveryInterval);
      }
    });

    return {
      isShaking,
      rocketImage,
      backgroundPosition,
      planetDiscovered,
      planet,
      toggleRocket,
      gasStore,
    };
  },
};
</script>

<style scoped>
.rocket-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

.rocket {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  bottom: 50px;
}

.rocket img, .rocket button {
  z-index: 2; /* Rocket and button are above the background */
}

.space-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/moon/space.png') repeat-y; /* Use repeat-y for vertical scrolling */
  background-size: cover;
  z-index: 1; /* Behind the rocket */
}

.rocket-image {
  width: 200px;
  height: auto;
  transition: transform 0.2s;
}

.planet {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #FFF;
  border: 12px solid #FFF;
  z-index: 3;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4em;
  color: black;
  text-align: center;
}

.shake {
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.token-icon {
  width: 12px;
  margin-bottom: -2px;
}
</style>
