<template>
  <div class="nft-collection" :style="collectionStyle">
    <div
      class="nft-item"
      v-for="nft in collection?.nfts"
      :key="nft.index"
      :style="nftItemStyle(nft.index)"
    >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { NFTsEnum } from '@/enums/NFTsEnum';

export default defineComponent({
  name: 'NFTsCollection',
  props: {
    collectionIndex: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const collection = computed(() =>
      NFTsEnum.find((col) => col.index === props.collectionIndex)
    );

    const collectionStyle = computed(() => {
      if (collection.value) {
        return {
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/nft/${collection.value.index}/${collection.value.index}.png')`,
          backgroundSize: 'cover',
          padding: '20px',
          display: 'flex',
          flexWrap: 'wrap', // Allow wrapping to new lines
          gap: '10px',
        };
      }
      return {};
    });

    const nftItemStyle = (nftIndex: string) => {
      if (collection.value) {
        return {
          width: '100px',
          height: '100px',
          border: '5px solid #ffa500',
          background: `url('/nft/${collection.value.index}/${nftIndex}.png')`,
          backgroundSize: 'cover',
        };
      }
      return {};
    };

    return {
      collection,
      collectionStyle,
      nftItemStyle,
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
  border: 10px solid #444;
  padding: 50px;
  margin: 20px;
}

.nft-item {
  margin: 20px;
  width: 100px;
  height: 100px;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
