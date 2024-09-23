<template>
    <div class="hero-list-wrapper">
      <div class="hero-container" @dragover.prevent @drop="handleHeroDrop">
        <div class="hero-actions">
          <div class="recall-all" @click="recallAll">📯</div>
        </div>
        <div class="hero-list-container">
            <div v-if="heroes.some(hero => hero.location === 'free')" class="hero-grid">
                <div v-for="(hero, index) in heroes" :key="index">
                <HeroThumb
                    v-if="hero.isFree() && hero.isUnlocked()"
                    class="hero"
                    :hero="hero"
                    draggable="true"
                />
                </div>
            </div>
            <p v-else class="no-heroes">No heroes available</p>
            </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import HeroManager from '@/managers/HeroManager';
  import HeroThumb from '@/components/HeroThumb.vue';
import MineManager from '@/managers/MineManager';

  
  export default defineComponent({
    components: {
      HeroThumb,
    },
    setup() {
        const heroes = ref(HeroManager.getHeroes());

        /* const filteredHeroes = computed(() => {
          let filtered = tokenStores.filter(store => {
            const tokenAmount = store.balance;
            return (
              tokenAmount > 0 &&
              (store.name.toLowerCase().includes(filterText.value.toLowerCase()) ||
              store.index.toLowerCase().includes(filterText.value.toLowerCase()))
            );
          });
        }); */
  
        const handleHeroDrop = (event: DragEvent) => {
            const heroIndex = event.dataTransfer?.getData('heroIndex');
            if (heroIndex) {
                const hero = HeroManager.getHeroStore(heroIndex);
                const mineStore = MineManager.getMineStore(hero.location)
                hero.location = 'free';
                heroes.value = HeroManager.getHeroes();
            }
        };

        const recallAll = () => {
          HeroManager.recallAllHeroes();
        };

        return {
            heroes,
            handleHeroDrop,
            recallAll,
        };
    },
});
</script>
  


<style scoped>
.hero-list-wrapper {
  position: relative;
  max-width: 190px;
  margin: 0 auto;
}

.hero-list-title {
  position: fixed;
  font-size: 15px;
  font-weight: bold;
  color: #444;
  text-align: center;
  top: 0;
  margin-bottom: 20px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 2px solid #444;
}

.hero-actions {
  top: 10px;
  border: 2px solid #444;
  border-radius: 10px;
  background: #fff;
  padding: 5px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.hero-container {
  text-align: center;
  padding: 20px;
  position: fixed;
  background-image: linear-gradient(rgba(255, 255, 255, 0.2), rgba(240, 240, 240, 0.3)), url(/heroes/workersMenuBG.png);
  background-size: cover;
  background-position: center center;
  border: 2px solid #444;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: calc(80vh);
  overflow-y: auto;
  width: 120px;
}

.hero-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-heroes {
  font-size: 18px;
  color: #bbb;
  margin-top: 20px;
}

.hero-list {
    max-height: 80vh;
    overflow-y: auto;
    max-height: 80vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.recall-all {
  cursor: pointer;
}
</style>
  