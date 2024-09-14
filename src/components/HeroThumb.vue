<template>
    <div class="hero" @dragstart="dragStart($event, hero)" :id="heroStore.getDOMid()">
      <div class="hero-icons">
        <div class="mining-icon">
          <span>⛏️{{ heroStore.miningPower }}</span>
        </div>
        <div class="combat-icon">
          <span>{{ heroStore.battlePower }}⚔️</span>
        </div>
      </div>
      <img 
        :src="heroStore.getPicture()" 
        :alt="heroStore.name" 
        class="hero-image" 
        draggable="true" 
        @dragstart="dragStart($event, hero)" 
      />
      <p class="hero-name">{{ hero.name }}</p>
      <div class="xp-container">
        <div class="xp-bar">
          <div class="xp-bar-fill" :style="{ width: heroStore.xp + '%' }">
            <span class="xp-text">{{ heroStore.xp }}% XP</span>
          </div>
        </div>
        <div class="level-icon">
          <span>Lvl.{{ heroStore.level }}</span>
        </div>
        <button @click="increaseXp">Gain XP</button>
      </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { Hero } from '@/enums/HeroesEnum';
import HeroManager from '@/managers/HeroManager';
  
export default defineComponent({
    props: {
      hero: {
        type: Object as () => Hero,
        required: true,
      },
    },
    setup(props) {
        const heroStore = HeroManager.getHeroStore(props.hero.index);
  
        function dragStart(event: DragEvent, hero: Hero) {
            event.dataTransfer?.setData('heroIndex', hero.index);
        }
  
        function increaseXp() {
            if (heroStore.xp < 100) {
            const xpGain = 1;
            heroStore.gainXp(xpGain);
            }
        }
  
      return {
            heroStore,
            dragStart,
            increaseXp,
        };
    },
});
</script>
  

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative; /* Ensures icons are positioned relative to hero */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  font-size: 14px;
}

.hero:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.hero-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #ffa500;
}

.hero-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

/* Icons Styling - always visible */
.hero-icons {
  position: absolute;
  top: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 2; /* Ensure icons are above other elements */
}

.mining-icon, .combat-icon {
  font-size: 14px;
  color: #444;
  display: flex;
  align-items: center;
}

.mining-icon span, .combat-icon span {
  margin-left: 5px; /* Space between icon and number */
}

.mining-icon {
  /* Top-left corner */
}

.combat-icon {
  /* Top-right corner */
  justify-content: flex-end;
}

.level-icon {
  font-size: 1.3em;
  font-weight: bold;
  color: #444;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

/** XP BAR */
.xp-container {
  width: 100%;
  max-width: 500px; /* Optional: Set a maximum width */
  text-align: center;
}

.xp-bar {
  position: relative;
  width: 100%;
  height: 25px;
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.xp-bar-fill {
  height: 100%;
  background-color: #76c7c0;
  transition: width 0.4s ease;
  border-radius: 10px;
}

.xp-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #444;
  pointer-events: none;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

</style>