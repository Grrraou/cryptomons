<template>
    <div class="inventory-container" @dragover.prevent @drop="handleDrop">
      <ItemThumb 
        class="item" 
        v-for="(item, index) in inventoryItems"
        :key="index"
        :item="item"
        :inventoryIndex="index"
        draggable="true"
        @dragstart="dragItem(index, $event)"
      /> 
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useItemsStore } from '@/stores/useItems';
  import ItemThumb from './ItemThumb.vue';
  
  export default defineComponent({
    components: {
      ItemThumb,
    },
    setup() {
      const itemsStore = useItemsStore();
  
      // Computed property to get inventory items from the store
      const inventoryItems = computed(() => itemsStore.inventory);
  
      const dragItem = (inventoryIndex: number, event: DragEvent) => {
        if (event.dataTransfer) {
          event.dataTransfer.setData('inventoryIndex', inventoryIndex.toString());
          console.log('inventory2Chest: ' + event.dataTransfer?.getData('inventoryIndex'))
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
    justify-content: space-around;
    justify-content: flex-start;
    width: 100%;
    padding: 10px;
    overflow-y: auto;
    height: 100%;
    max-height: 400px;
    border: 2px solid #ccc;
    border-radius: 5px;
  }
  </style>
  