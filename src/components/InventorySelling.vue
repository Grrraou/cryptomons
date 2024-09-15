<template>
    <div class="selling-container" @drop="handleDrop" @dragover.prevent>
      <h3>Drag Items to Sell</h3>
      <div id="sell-area" class="sell-area">Drop here to sell</div>
    </div>
  </template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useItemsStore } from '@/stores/useItems';
import TokenManager from '@/managers/TokenManager';
import ItemManager from '@/managers/ItemManager';
import UXManager from '@/managers/UXManager';
  
  export default defineComponent({
    setup() {
        const itemsStore = useItemsStore();
        const tokenStore = TokenManager.getTokenStore('cryptodollar');
  
        const handleDrop = (event: DragEvent) => {
            event.preventDefault();
    
            const inventoryIndex = event.dataTransfer?.getData('inventoryIndex');
            const slotType = event.dataTransfer?.getData('slotType') as 'Head' | 'Chest' | 'Weapon';
            let item = null;
            console.log('selling: ' + inventoryIndex)

            if (inventoryIndex) {
                item = itemsStore.getItemFromInventory(parseInt(inventoryIndex));
                if (item) {
                    itemsStore.removeItemFromInventory(parseInt(inventoryIndex));
                }
            } else if (slotType) {
                item = itemsStore[slotType];
                itemsStore.unequipItem(slotType, false);
            }
            if (item) {
                tokenStore.updateBalance(item.value);
                UXManager.showFlyingTextOnElement(item.value.toString(), tokenStore.getIcon(), 'sell-area', 50);
            }
        };
  
      return {
        handleDrop,
      };
    },
  });
  </script>
  
  <style scoped>
  .selling-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 10px;
    border: 2px solid #444;
    border-radius: 10px;
  }
  
  .sell-area {
    width: 80%;
    height: 50px;
    border: 2px dashed #444;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  </style>
  