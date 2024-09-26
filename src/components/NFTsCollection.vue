<template>
  <div class="nft-collection" :style="collectionStyle">
    <div class="collection-title">
      <h3 :class="titleClass">
        {{ collection.name }} ( {{ NFTsManager.getCollectionCompletion(collection.index) }}% )
      </h3>
      <p>{{ (NFTsManager.getCollectionCompletion(collection.index) > 50) ? collection.description : '???' }}</p>
    </div>
    <div class="nft-container">
      <div
        class="nft-item"
        :class="nft.isFound ? 'infoboxed' : ''"
        v-for="nft in NFTsManager.getNFTbyCollection(collection.index)"
        :key="nft.index"
        :style="nftItemStyle(nft.index, nft.isFound)"
      >
        <div class="infobox">
          <h4>{{ nft.name }}</h4>
          <p>{{ nft.description }}</p>
          <p>rarity: {{  nft.rarity }}</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { NFTsEnum } from '@/enums/NFTsEnum';
import type { CSSProperties } from 'vue';
import NFTsManager from '@/managers/NFTsManager';

export default defineComponent({
  name: 'NFTsCollection',
  props: {
    collectionIndex: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const collection = NFTsEnum.find((col) => col.index === props.collectionIndex);

    const collectionStyle = computed<CSSProperties>(() => {
      const borderColor = (NFTsManager.isCollectionCompleted(collection.index)) ? '#ffa500' : '#444';
      if (collection) {
        return {
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/nft/${collection.index}/${collection.index}.png')`,
          backgroundSize: 'cover',
          border: `10px solid ${borderColor}`,
          padding: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
        };
      }
      return {};
    });

    let titleClass = computed(() => {
      return NFTsManager.isCollectionCompleted(collection.index) ? 'shiny' : '';
    });

    const nftItemStyle = (nftIndex: string, isFound: boolean): CSSProperties => {
      if (collection) {
        return {
          width: '100px',
          height: '100px',
          border: '5px solid #ffa500',
          background: `url('${isFound ? `/nft/${collection.index}/${nftIndex}.png` : '/nft/default.png'}')`,
          backgroundSize: 'cover',
        };
      }
      return {};
    };

    return {
      collection,
      collectionStyle,
      titleClass,
      nftItemStyle,
      NFTsManager,
    };
  },
});
</script>


<style scoped>
.nft-collection {
  display: flex;
  flex-wrap: wrap; /* Ensures items wrap into new rows */
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 10px;
  padding: 50px;
  margin: 20px;
}

.collection-title {
  color: #fff;
  font-size: 2em;
  margin: 10px;
  text-align: center;
}

.nft-container {
  display: flex;
  flex-wrap: wrap; /* Ensures items wrap into new rows */
  align-items: center;
  justify-content: center;
}

.nft-item {
  margin: 20px;
  width: 100px;
  height: 100px;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shiny {
  animation: shinyAnimation 2s infinite alternate;
}

@keyframes shinyAnimation {
  0% {
    color: #444;
    text-shadow: 0 0 10px #444;
  }
  100% {
    color: #ffa500;
    text-shadow: 0 0 10px #ffa500;
  }
}
</style>
