<template>
  <div class="staking-page game-container">
    <h1 class="page-title">Crypto Staking <InfoBubble page="staking" /></h1>
    <div class="staking-list">
      <StakingWidget v-for="staking in unlockedStakings" :key="staking.index"
        :staking="staking"
      />
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import InfoBubble from '@/components/InfoBubble.vue';
import StakingWidget from '@/components/StakingWidget.vue';
import StakingManager from '@/managers/StakingManager';
  
export default defineComponent({
  name: 'StakingPage',
  components: {
    StakingWidget,
    InfoBubble,
  },
  setup() {
    const stakings = StakingManager.getStakings();
    const unlockedStakings = computed(() => {
      return stakings.filter(staking => staking.isUnlocked());
    });

    return {
      unlockedStakings,
    };
  },
});
</script>


<style scoped>
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

.staking-page {
  padding-left: 220px;
  margin-top: 50px;
}

.staking-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0 70px;
  align-items: center;
  justify-content: center;
}
</style>