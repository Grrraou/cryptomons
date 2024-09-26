<template>
  <div class="selling-container" @drop="handleDrop" @dragover.prevent>
    <h3>Drag Items to Sell</h3>
    <div id="sell-area" class="sell-area">SELL</div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TokenManager from '@/managers/TokenManager';
import ItemManager from '@/managers/ItemManager';
import UXManager from '@/managers/UXManager';
import SettingsManager from '@/managers/SettingsManager';
  
export default defineComponent({
  setup() {
    const itemsStore = ItemManager.getItemStore();
    const tokenStore = TokenManager.getReferenceTokenStore();
  
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();

      const inventoryIndex = event.dataTransfer?.getData('inventoryIndex');
      const slotType = event.dataTransfer?.getData('slotType') as 'Head' | 'Chest' | 'Weapon';
      let item = null;

      if (inventoryIndex) {
          item = itemsStore.getItemFromInventory(parseInt(inventoryIndex));
          if (item && !item.cannotSell) {
              itemsStore.removeItemFromInventory(parseInt(inventoryIndex));
          }
      } else if (slotType) {
          item = itemsStore[slotType];
          itemsStore.unequipItem(slotType, false);
      }
      if (item && !item.cannotSell) {
        const sellingPrice = ItemManager.getItemPrice(item);
        tokenStore.updateBalance(sellingPrice);
        UXManager.showFlyingTextOnElement(sellingPrice.toFixed(SettingsManager.getSettings().decimals).toString(), tokenStore.getIcon(), 'sell-area', 50);
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
  