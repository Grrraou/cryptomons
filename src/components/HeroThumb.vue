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
        draggable="false" 
        @mousedown="triggerParentDrag($event)" 
      />
      <p class="hero-name">{{ hero.name }}</p>
      <div class="xp-container">
        <div class="xp-bar">
          <div class="xp-bar-fill" :style="{ width: (heroStore.xp / heroStore.getLevelUpCost()) + '%' }">
            <span class="xp-text" :class="xpClass">{{ (heroStore.xp / heroStore.getLevelUpCost()).toFixed(2) }} %</span>
          </div>
        </div>
        <div class="level-icon">
          <span>Lvl.{{ heroStore.level }}</span>
        </div>
        <button v-if="heroStore.canLevelUp() && heroStore.canBuyLevelUp()" class="levelup-button active" @click="heroStore.levelUp()" >
          <span class="levelup-text">levelup</span><br>
          <span class="levelup-price">
            {{ heroStore.getLevelUpCost() }}<img :src="TokenManager.getTokenStore(heroStore.token).getIcon()" class="token-icon" :title="TokenManager.getTokenStore(heroStore.token).index">
          </span>
        </button>
        <button v-if="heroStore.canLevelUp() && !heroStore.canBuyLevelUp()" class="levelup-button inactive" >
          <span class="levelup-text">levelup</span><br>
          <span class="levelup-price">
            {{ heroStore.getLevelUpCost() }}<img :src="TokenManager.getTokenStore(heroStore.token).getIcon()" class="token-icon" :title="TokenManager.getTokenStore(heroStore.token).index">
          </span>
        </button>
      </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Hero } from '@/enums/HeroesEnum';
import HeroManager from '@/managers/HeroManager';
import TokenManager from '@/managers/TokenManager';
  
export default defineComponent({
    props: {
      hero: {
        type: Object as () => Hero,
        required: true,
      },
    },
    setup(props) {
        const heroStore = HeroManager.getHeroStore(props.hero.index);

        const levelupButtonClass = computed(() => {
          return (heroStore.canLevelUp()) ? 'active' : 'inactive';
        });

        let xpClass = computed(() => {
          return heroStore.canLevelUp() ? 'shiny' : '';
        });
  
        function dragStart(event: DragEvent, hero: Hero) {
            event.dataTransfer?.setData('heroIndex', hero.index);
        }

        function triggerParentDrag(event: MouseEvent) {
            const parent = (event.target as HTMLElement).closest('.hero');
            if (parent) {
                // Manually trigger the mousedown on the parent to start dragging
                parent.dispatchEvent(new MouseEvent('mousedown', event));
            }
        }
  
      return {
            heroStore,
            TokenManager,
            levelupButtonClass,
            xpClass,
            dragStart,
            triggerParentDrag,
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
  margin-left: 5px;
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
  max-width: 500px;
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

.levelup-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    background-color: #ffa500;
    border: 2px solid #444;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    padding: 5px 5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.levelup-button.inactive {
  background-color: #444;
}
.levelup-button.inactive .levelup-price {
  color: #FFF;
}

.levelup-button.active:hover {
    background-color: #ff8c00;
    transform: translateY(-2px);
}

.levelup-price {
  color: #444;
}

.levelup-price .token-icon {
  width: 14px;
  margin-bottom: -3px;
  margin-left: 1px;
}
</style>