<template>
  <div class="staking-page game-container">
    <h1 class="page-title">Crypto Staking <InfoBubble page="staking" /></h1>
    <TutorialComponent name="stakingTutorial"></TutorialComponent>

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
import TutorialComponent from '@/components/TutorialComponent.vue';
  
export default defineComponent({
  name: 'StakingPage',
  components: {
    StakingWidget,
    InfoBubble,
    TutorialComponent,
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