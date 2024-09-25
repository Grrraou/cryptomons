<template>
  <div class="battlefield-block" :style="backgroundStyle">
    <div class="battlefieldContainer">
      <div class="battle-name">
        <h2>{{ battlefieldStore.name }}</h2>
        <p>🖱️ {{ battlefieldStore.clicks }}</p>
        <p>💀 {{ battlefieldStore.killed }}</p>
      </div>
      <div class="battle-field">
        <MonsterThumb 
          class="monster-area" 
          :monster="battlefieldStore.currentMonster"
          :battlefield="battlefieldStore"
        />
        <div class="heroes-area" @drop="handleHeroDrop" @dragover.prevent>
          <h3>Assigned Heroes ( {{ assignedHeroes.length }} / {{ battlefieldStore.heroSlots }} )</h3>
          <div class="heroes-grid">
            <div v-for="(hero, index) in assignedHeroes">
              <HeroThumb 
                v-if="hero.isWorkingThere(battlefieldStore.index)"
                :key="index" 
                :hero="hero"
                class="hero-container"
                draggable="true"
              />
            </div>
          </div>
          <div class="drop-area">
            Drop heroes here to assign
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import HeroThumb from '@/components/HeroThumb.vue';
import MonsterThumb from './MonsterThumb.vue';
import BattlefieldManager from '@/managers/BattlefieldManager';
import HeroManager from '@/managers/HeroManager';
  
export default defineComponent({
  components: {
    HeroThumb,
    MonsterThumb,
  },
  props: {
    battlefield: {
      type: Object,
      required: true,
    },
    currentCreatures: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const battlefieldStore = BattlefieldManager.getBattlefieldStore(props.battlefield.index);
    const heroes = ref(HeroManager.getHeroes());
    const assignedHeroes = computed(() => heroes.value.filter(heroStore => {
        return heroStore.isWorkingThere(battlefieldStore.index);
      }));

    const handleHeroDrop = (event: DragEvent) => {
      if (battlefieldStore.heroSlots > assignedHeroes.value.length) {
        const heroIndex = event.dataTransfer?.getData('heroIndex');
        if (heroIndex) {
          const hero = HeroManager.getHeroStore(heroIndex);
          hero.location = battlefieldStore.index;
        }
      }
      
    };

    const backgroundStyle = computed(() => ({
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('${battlefieldStore.getImage()}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#000',
    }));
  
      const battlefieldId = computed(() => `battlefield-${battlefieldStore.index}`);
  
      return {
        battlefieldStore,
        assignedHeroes,
        backgroundStyle,
        battlefieldId,
        handleHeroDrop,
      };
    },
  });
  </script>
  

<style scoped>
.battlefieldContainer {
    width: 100%;
    display: flex;
}


.battle-field {
    display: flex;
    gap: 10px;
}
  
.battle-name {
    font-size: 18px;
    text-align: center;
    color: #444;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
    width: 250px;
}
  
.monster-area {
    background-color: #ffe6e6;
    border: 3px solid #9c1616;
    padding: 10px;
    width: 300px;;
    border-radius: 5px;
    text-align: center;
    background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)), 
              url('/battlefields/mobsWidgetBG.png') center/cover no-repeat;
}
  
.heroes-area {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    color: #444;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
}
  
.heroes-grid {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
  
.drop-area {
    background-color: #d3d3d3;
    border: 2px dashed #aaa;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
}
</style>
  