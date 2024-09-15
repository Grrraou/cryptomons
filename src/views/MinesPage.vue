<template>
    <div class="clicker-game">
        <div class="game-container">
            <div class="areas-container">
                <h1 class="page-title">Mines <InfoBubble page="mines" /></h1>
  
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
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import MineWidget from '@/components/MineWidget.vue';
import HeroList from '@/components/HeroList.vue';
import MineManager from '@/managers/MineManager';
import InfoBubble from '@/components/InfoBubble.vue';
  
export default defineComponent({
    components: {
    MineWidget,
    HeroList,
    InfoBubble,
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
.game-container {
  display: flex;
}
.page-title {
  position: relative;
  font-size: 28px;
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
  border-bottom: 2px solid #ffa500;
  display:flex;
  justify-content: center;
  align-items: center;
}

.clicker-game {
  text-align: center;
}

.areas-container {
  width: 100%;
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
