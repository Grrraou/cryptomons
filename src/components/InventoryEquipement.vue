<template>
  <div class="equipement-container">
    <div style="height: 10px;"></div>
    <div id="equipement-stats">
      <!-- {{ equipementStats }} -->
      <span>Equipement stats: </span>  
      <span v-if="equipementStats.xp"><img style="width: 12px;" src="/xp.png"> +{{ equipementStats.xp }}%</span>
      <span v-if="equipementStats.damage">⚔️ +{{ equipementStats.damage }}%</span>
      <span v-if="equipementStats.mining">⛏️ +{{ equipementStats.mining }}%</span>
    </div>
    <div class="equipement-spacing"></div>
    <!-- Head Slot -->
    <div
      class="slot"
      id="headSlot"
      @dragover.prevent
      @drop="handleDrop($event, 'Head')"
      @dragenter.prevent
    >
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
      id="chestSlot"
      @dragover.prevent
      @drop="handleDrop($event, 'Chest')"
      @dragenter.prevent
    >
      <ItemThumb
        class="equip-slot"
        :class="{ occupied: itemsStore.Chest }"
        :item="itemsStore.Chest"
        v-if="itemsStore.Chest"
        draggable="true"
        @dragstart="dragItem('Chest', $event)"
      />
    </div>

    <!-- Hands Slot -->
    <div
      class="slot"
      id="handsSlot"
      @dragover.prevent
      @drop="handleDrop($event, 'Hands')"
      @dragenter.prevent
    >
      <ItemThumb
        class="equip-slot"
        :class="{ occupied: itemsStore.Hands }"
        :item="itemsStore.Hands"
        v-if="itemsStore.Hands"
        draggable="true"
        @dragstart="dragItem('Hands', $event)"
      />
    </div>

    <!-- Pants Slot -->
    <div
      class="slot"
      id="pantsSlot"
      @dragover.prevent
      @drop="handleDrop($event, 'Pants')"
      @dragenter.prevent
    >
      <ItemThumb
        class="equip-slot"
        :class="{ occupied: itemsStore.Pants }"
        :item="itemsStore.Pants"
        v-if="itemsStore.Pants"
        draggable="true"
        @dragstart="dragItem('Pants', $event)"
      />
    </div>

    <!-- Boots Slot -->
    <div
      class="slot"
      id="bootsSlot"
      @dragover.prevent
      @drop="handleDrop($event, 'Boots')"
      @dragenter.prevent
    >
      <ItemThumb
        class="equip-slot"
        :class="{ occupied: itemsStore.Boots }"
        :item="itemsStore.Boots"
        v-if="itemsStore.Boots"
        draggable="true"
        @dragstart="dragItem('Boots', $event)"
      />
    </div>
  
    <!-- Weapon Slot -->
    <div
      class="slot"
      id="weaponSlot"
      @dragover.prevent
      @drop="handleDrop($event, 'Weapon')"
      @dragenter.prevent
    >
      <ItemThumb
        class="equip-slot"
        :class="{ occupied: itemsStore.Weapon }"
        :item="itemsStore.Weapon"
        v-if="itemsStore.Weapon"
        draggable="true"
        @dragstart="dragItem('Weapon', $event)"
      />
    </div>
    <div class="spacer"></div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ItemThumb from './ItemThumb.vue';
import ItemManager from '@/managers/ItemManager';
import { EquipementSlotType } from '@/stores/useItems';
  
export default defineComponent({
  components: {
    ItemThumb,
  },
  setup() {
    const itemsStore = ItemManager.getItemStore();
    const equipementStats = ref(itemsStore.getEquipementStats());

    watch(() => itemsStore, () => {
      equipementStats.value = itemsStore.getEquipementStats();
    }, { deep: true });

    const dragItem = (slotType: EquipementSlotType, event: DragEvent) => {
      if (event.dataTransfer) {
        event.dataTransfer.setData('slotType', slotType);
      }
    };
  
    const handleDrop = (event: DragEvent, slotType: EquipementSlotType) => {
      event.preventDefault();
      const inventoryIndex = event.dataTransfer?.getData('inventoryIndex');

      if (inventoryIndex && slotType) {
        itemsStore.equipItem(slotType, parseInt(inventoryIndex));
      }
    };
  
    return {
      itemsStore,
      equipementStats,
      dragItem,
      handleDrop,
    };
  },
});
</script>
  
<style scoped>
.equipement-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-y: auto;
  align-items: center;
  padding: 10px;
  scrollbar-width: none;
  width: 100%;
}

.slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #444;
  border-radius: 10px;
  background-color: #fff;
  width: 140px;
  height: 140px;
  margin: 0 15px;
  position: relative;
}

.slot-name {
  margin: 0;
}

.slot-info-icon {
  position: absolute;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #ffa500;
  border-radius: 50%;
  border: 1px solid #444;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  top: 5px;
  right: 5px;
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

.spacer {
  width: 100%;
  height: 300px; /* This height acts as padding-bottom */
}

.equipement-spacing {
  height: 50px;
  width: 100%;
}



/* CUSTOM SLOTS */
#chestSlot {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('/items/chestSlot.png');
  background-size: cover;
  background-position: center;
  background-color: #000;
}

#headSlot {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('/items/headSlot.png');
  background-size: cover;
  background-position: center;
  background-color: #000;
}

#handsSlot {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('/items/handsSlot.png');
  background-size: cover;
  background-position: center;
  background-color: #000;
}

#pantsSlot {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('/items/pantsSlot.png');
  background-size: cover;
  background-position: center;
  background-color: #000;
}

#bootsSlot {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('/items/bootsSlot.png');
  background-size: cover;
  background-position: center;
  background-color: #000;
}

#weaponSlot {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('/items/weaponSlot.png');
  background-size: cover;
  background-position: center;
  background-color: #000;
}

#equipement-stats {
  position: absolute;
  top: 10px;
  border: 2px solid #444;
  border-radius: 10px;
  background: #fff;
  padding: 0 5px;
}

#equipement-stats span {
  margin: 2px 5px;
}
</style>
  