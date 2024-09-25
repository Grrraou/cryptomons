<template>
  <div class="inventory-container" @dragover.prevent @drop="handleDrop">
    <h3>Chest ( {{ inventoryItems.length }} / {{ itemsStore.itemSlots }} )</h3>
    <div v-for="(item, index) in inventoryItems">
      <ItemThumb 
        class="item" 
        :key="index"
        :item="item"
        :inventoryIndex="index"
        draggable="true"
        @dragstart="dragItem(index, $event)"
      /> 
    </div>
    <div class="spacer"></div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useItemsStore } from '@/stores/useItems';
import ItemThumb from './ItemThumb.vue';

export default defineComponent({
  components: {
    ItemThumb,
  },
  setup() {
    const itemsStore = useItemsStore();
    let inventoryItems = ref(itemsStore.inventory);

    const dragItem = (inventoryIndex: number, event: DragEvent) => {
      if (event.dataTransfer) {
        event.dataTransfer.setData('inventoryIndex', inventoryIndex.toString());
      }
    };
  
    const handleDrop = (event: DragEvent) => {
      const slotType = event.dataTransfer?.getData('slotType') as 'Head' | 'Chest' | 'Weapon';
      
      if (slotType) {
        const item = itemsStore[slotType];
        if (item) {
          itemsStore.unequipItem(slotType, true);
        }
      }
    };
  
    return {
      inventoryItems,
      itemsStore,
      dragItem,
      handleDrop,
    };
  },
});
</script>
  
<style scoped>
.inventory-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  padding-right: 10%;
  overflow-y: auto;
  height: 100%;
  border: 2px solid #ccc;
  border-radius: 5px;
}

.inventory-container h3 {
  width: 100%;
  text-align: center;
}

.spacer {
  width: 100%;
  height: 300px;
}
</style>
  