<template>
    <div class="equipement-container">
      <!-- Head Slot -->
      <div
        class="slot"
        @dragover.prevent
        @drop="handleDrop($event, 'Head')"
        @dragenter.prevent
      >
        <p>Head</p>
        <ItemThumb
          class="equip-slot"
          :class="{ occupied: itemsStore.Head }"
          :item="itemsStore.Head"
          v-if="itemsStore.Head"
          draggable="true"
          @dragstart="dragItem('Head', $event)"
        />
      </div>
  
      <!-- Chest Slot -->
      <div
        class="slot"
        @dragover.prevent
        @drop="handleDrop($event, 'Chest')"
        @dragenter.prevent
      >
        <p>Chest</p>
        <ItemThumb
          class="equip-slot"
          :class="{ occupied: itemsStore.Chest }"
          :item="itemsStore.Chest"
          v-if="itemsStore.Chest"
          draggable="true"
          @dragstart="dragItem('Chest', $event)"
        />
      </div>
  
      <!-- Weapon Slot -->
      <div
        class="slot"
        @dragover.prevent
        @drop="handleDrop($event, 'Weapon')"
        @dragenter.prevent
      >
        <p>Weapon</p>
        <ItemThumb
          class="equip-slot"
          :class="{ occupied: itemsStore.Weapon }"
          :item="itemsStore.Weapon"
          v-if="itemsStore.Weapon"
          draggable="true"
          @dragstart="dragItem('Weapon', $event)"
        />
      </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ItemThumb from './ItemThumb.vue';
import ItemManager from '@/managers/ItemManager';
  
export default defineComponent({
    components: {
      ItemThumb,
    },
    setup() {
      const itemsStore = ItemManager.getItemStore();
  
      const dragItem = (slotType: 'Head' | 'Chest' | 'Weapon', event: DragEvent) => {
        if (event.dataTransfer) {
          event.dataTransfer.setData('slotType', slotType);
        }
      };
  
      const handleDrop = (event: DragEvent, slotType: 'Head' | 'Chest' | 'Weapon') => {
        event.preventDefault();
        const inventoryIndex = event.dataTransfer?.getData('inventoryIndex');

        if (inventoryIndex && slotType) {
          const item = itemsStore.getItemFromInventory(parseInt(inventoryIndex)); 
          itemsStore.equipItem(slotType, item, parseInt(inventoryIndex));
        }
      };
  
      return {
        itemsStore,
        dragItem,
        handleDrop,
      };
    },
  });
  </script>
  
  <style scoped>
  .equipement-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 10px;
  }
  
  .slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #444;
    border-radius: 10px;
    background-color: #fff;
  }
  
  .equip-slot {
    width: 100px;
    height: 100px;
    background-color: #ddd;
    margin-top: 10px;
    border-radius: 5px;
  }
  
  .equip-slot.occupied {
    background-color: #ffeb3b;
  }
  </style>
  