<template>
  <div class="battlefield-block" :style="backgroundStyle">
    <div class="battlefieldContainer">
      <div class="battle-name">
        <h2>{{ battlefieldStore.name }}</h2>
      </div>
      <div class="battle-field">
        <MonsterThumb 
          class="monster-area" 
          :monster="battlefieldStore.currentMonster"
          :battlefield="battlefieldStore"
        />
        <div class="heroes-area" @drop="handleHeroDrop" @dragover.prevent>
          <h3>Assigned Heroes</h3>
          <div class="heroes-grid">
            <div v-for="(hero, index) in heroes">
              <HeroThumb 
                v-if="hero.isWorkingThere(battlefieldStore.index)"
                :key="index" 
                :hero="hero"
                class="hero-container"
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

    const handleHeroDrop = (event: DragEvent) => {
      const heroIndex = event.dataTransfer?.getData('heroIndex');
      if (heroIndex) {
        const hero = HeroManager.getHeroStore(heroIndex);
        hero.location = battlefieldStore.index;
        heroes.value = HeroManager.getHeroes();
      }
    };

    const backgroundStyle = computed(() => ({
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('${battlefieldStore.getImage()}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#000',
    }));

      /* const monsterStore = useMonsterStore(battlefieldStore.index);
      const heroStore = useHeroStores();
      const itemStore = useItemStore(); */
  
      /* const localMonster = ref(monsterStore.getCurrentMonster());
      const heroes = ref(heroStore.getHeroesByArea(battlefieldStore.index)); */
  
      const battlefieldId = computed(() => `battlefield-${battlefieldStore.index}`);
  
      /* const handleHeroDrop = (event: DragEvent) => {
        const heroData = event.dataTransfer?.getData('heroData');
        if (!heroData) return;
        const hero = JSON.parse(heroData);
        heroStore.moveHero(hero.index, battlefieldStore.index);
      }; */
  
      /* const attackMonster = (event: MouseEvent) => {
        let manualDamageAmount = 1;
        const weapon = itemStore.getEquippedItem('Weapon');
        if (weapon) {
          manualDamageAmount += weapon.effect();
        }
        monsterStore.damageCreature(localMonster.value.battlefieldIndex, manualDamageAmount, null, event);
        localMonster.value = monsterStore.getCurrentMonster();
      }; */
  
      /* onMounted(() => {
        eventBus.on('hero-moved', () => {
          heroes.value = heroStore.getHeroesByArea(battlefieldStore.index);
        });
      }); */
  
      /* onBeforeUnmount(() => {
        eventBus.off('hero-moved');
      }); */
  
      return {
        battlefieldStore,
        heroes,
        handleHeroDrop,
        backgroundStyle,


        /* localMonster,
        heroes, */
        battlefieldId,
        /* handleHeroDrop,
        attackMonster, */
      };
    },
  });
  </script>
  

<style scoped>
.battlefieldContainer {
    width: 100%;
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
}
  
.monster-area {
    background-color: #ffe6e6;
    border: 3px solid #9c1616;
    padding: 10px;
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
  