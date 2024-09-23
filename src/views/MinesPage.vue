<template>
    <h1 class="page-title">Mines <InfoBubble page="mines" /></h1>
    <TutorialComponent name="minesTutorial"></TutorialComponent>
    <div class="mine-page">
            <div class="areas-container">
                <div class="areas-grid">
                    <div v-for="mine in mines" :key="mine.index">
                        <MineWidget
                            v-if="mine.isUnlocked()"
                            ref="mineWidget"
                            :mine="mine"
                        />
                    </div>
                </div>
            </div>
          <HeroList class="hero-list" />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import MineWidget from '@/components/MineWidget.vue';
import HeroList from '@/components/HeroList.vue';
import MineManager from '@/managers/MineManager';
import InfoBubble from '@/components/InfoBubble.vue';
import TutorialComponent from '@/components/TutorialComponent.vue';
  
export default defineComponent({
    components: {
    MineWidget,
    HeroList,
    InfoBubble,
    TutorialComponent,
    },
    setup() {
      const mines = MineManager.getMines();

      return {
          mines,
      };
    },
});
</script>
  

<style scoped>
.mine-page {
  display: flex;
  justify-content: space-between;
}

.areas-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
}

.row {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

.area-wrapper {
  flex-basis: 30%;
}

.hero-list {
  flex-basis: 20%;
  margin-left: 20px;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
