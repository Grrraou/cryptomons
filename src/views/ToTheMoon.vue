<template>
  <TutorialComponent name="tothemoonTutorial"></TutorialComponent>
  <div class="rocket-container">
    <div class="space-background" :style="{ backgroundPositionY: backgroundPosition + 'px' }">
      <InfoBubble page="toTheMoon" class="moon-info-bubble" />
      
    </div>
    <div class="rocket" id="rocket">
      
      <img :src="rocket.image" alt="Rocket" class="rocket-image" draggable="false" :class="{ shake: rocketStore.isActive }" />
      <button @click="toggleRocket" :disabled="gasStore.balance < 0.1">
        {{ rocketStore.isActive ? 'Stop Rocket' : 'Start Rocket' }}
        ( {{ gasStore.balance.toFixed(2) }} <img :src="gasStore.getIcon()" class="token-icon"> )
      </button>
    </div>

    <div class="distance">
      {{ RocketManager.getRocket().distance.toFixed(2) }} km
    </div>

    <div v-if="rocketStore.planet" class="planet" :style="rocketStore.planet.style" id="planet">
        {{ rocketStore.planet.name }}<br>
        {{ rocketStore.planet.description }}
    </div>
  </div>
</template>

<script lang="ts">
import SettingsManager from '@/managers/SettingsManager';
import TokenManager from '@/managers/TokenManager';
import RocketManager from '@/managers/RocketManager';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import InfoBubble from '@/components/InfoBubble.vue';
import TutorialComponent from '@/components/TutorialComponent.vue';
import { rocketManager } from '@/App.vue';

export default {
  components: {
    InfoBubble,
    TutorialComponent,
  },
  setup() {
    const rocketStore = RocketManager.getRocket();
    const rocket = rocketManager.rocket;
    const gasStore = TokenManager.getTokenStore('gas');
    const backgroundPosition = ref(0);

    rocket.sound.loop = true;
    rocket.sound.volume = SettingsManager.getSettings().soundVolume;
    rocket.sound.pause();

    const toggleRocket = () => {
      rocketManager.toggleRocket();

      if (rocketStore.isActive) {
        rocket.animationFrameId = requestAnimationFrame(moveBackground);
      }
    };
      
    const moveBackground = (timestamp: number) => {
      if (rocket.lastTime !== null) {
        const delta = timestamp - rocket.lastTime;
        backgroundPosition.value += (delta / 1000) * rocket.speed;
      }
      rocket.lastTime = timestamp;
      rocket.animationFrameId = requestAnimationFrame(moveBackground);
    };

    watch(
      () => SettingsManager.getSettings().soundOn,
      (newVal) => {
        if (newVal) {
          if (rocketStore.isActive) {
            rocket.sound.play();
          }
        } else {
          rocket.sound.pause();
        }
      }
    );

    onMounted(() => {
      if (rocketStore.isActive) {
        rocket.animationFrameId = requestAnimationFrame(moveBackground);
        rocketManager.toggleRocketSound();
      }
    });

    onBeforeUnmount(() => {
      if (rocket.animationFrameId !== null) {
        cancelAnimationFrame(rocket.animationFrameId);
      }
      rocket.sound.pause();
    });

    return {
      backgroundPosition,
      toggleRocket,
      gasStore,
      RocketManager,
      rocketManager,
      rocket,
      rocketStore,
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
  z-index: 2;
}

.distance {
  z-index: 2;
  position: absolute;
  top: 20px;
  left: 20px;
  color: #FFF;
}

.space-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/moon/space.png') repeat-y;
  background-size: cover;
  z-index: 1;
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

.moon-info-bubble {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
