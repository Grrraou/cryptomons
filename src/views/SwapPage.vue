<template>
  <div class="swap-page game-container">
    <h1 class="page-title">SWAP <InfoBubble page="swap" /></h1>
    <TutorialComponent name="swapTutorial"></TutorialComponent>

    <SwapBox />

  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import InfoBubble from '@/components/InfoBubble.vue';
import SwapBox from '@/components/SwapBox.vue';
import TutorialComponent from '@/components/TutorialComponent.vue';
  
export default defineComponent({
  name: 'SwapPage',
  components: {
    SwapBox,
    InfoBubble,
    TutorialComponent,
  },
});
</script>
  
<style scoped>
.swap-page {
  padding: 20px;
}
</style>
  