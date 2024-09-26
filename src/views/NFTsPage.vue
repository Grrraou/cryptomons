<template>
  <h1 class="page-title">NFTs <InfoBubble page="nfts" /></h1>
  <TutorialComponent name="nftTutorial"></TutorialComponent>
  <div class="nft-page">
    <div class="areas-container">
      <div 
        class="row"
        v-for="collection in collections" 
        :key="collection.index"
      >
        <NFTsCollection :collectionIndex="collection.index" />
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import InfoBubble from '@/components/InfoBubble.vue';
import TutorialComponent from '@/components/TutorialComponent.vue';
import NFTsCollection from '@/components/NFTsCollection.vue';
import { NFTsEnum } from '@/enums/NFTsEnum';
  
export default defineComponent({
  components: {
    InfoBubble,
    TutorialComponent,
    NFTsCollection,
  },
  setup() {
    const collections = NFTsEnum;

    return {
      collections,
    };
  },
});
</script>
  
<style scoped>
.nft-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

.areas-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.row {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}
</style>
