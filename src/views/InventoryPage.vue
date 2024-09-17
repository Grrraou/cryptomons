<template>
    <h1 class="page-title">Inventory <InfoBubble page="inventory" /></h1>
    <div class="inventory-page">
        <!-- Top Section: Equipment and Selling -->
        <div class="top-section">
            <div class="equipement-section">
                <InventoryEquipement />
            </div>
            <div class="selling-section">
                <InventorySelling />
            </div>
        </div>
  
        <!-- Bottom Section: Inventory Component (Full Width) -->
        <div class="inventory-section">
            <InventoryChest />
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import InventoryEquipement from '@/components/InventoryEquipement.vue';
import InventorySelling from '@/components/InventorySelling.vue';
import InventoryChest from '@/components/InventoryChest.vue';
import InfoBubble from '@/components/InfoBubble.vue';
  
export default defineComponent({
    components: {
        InventoryEquipement,
        InventorySelling,
        InventoryChest,
        InfoBubble,
    },
});
</script>


<style scoped>
.inventory-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding: 10px;
    box-sizing: border-box;
}
  
.top-section {
    display: flex;
    width: 100%;
    height: 40%;
    margin-bottom: 10px;
}
  
.equipement-section {
    width: 90%;
    border: 2px solid #444;
    border-radius: 10px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    background-size: cover;
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)) center center / cover, url('/inventory/equipementBG.png');
    background-size: cover;
    overflow: hidden;
}
  
.selling-section {
    width: 10%;
    border: 2px solid #444;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)) center center / cover, url('/inventory/sellingBG.png');
    background-size: cover;
}
  
.inventory-section {
    width: 100%;
    height: 50%;
    border: 2px solid #444;
    border-radius: 10px;
    background-color: #e0f7fa;
    overflow-y: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
    background-size: cover;
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)) center center / cover, url('/inventory/inventoryBG.png');
    background-size: cover;
    overflow: hidden;
}
</style>
  