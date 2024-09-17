<template>
  <div class="item" :style="backgroundStyle">

    <!-- Consumable Button: Visible only for consumable items -->
    <button v-if="item.type === 'Consumable'" class="consume-btn" @click="consumeItem(item.index)">
      Use
    </button>

    <!-- Info Box -->
    <div class="infobox" @dragstart.prevent>
      <p>{{ item.name }}</p>
      <p>Type: {{ item.type }}</p>
      <p v-if="item.description">Description: {{ item.description }}</p>
      <p v-if="item.xp"><img style="width: 12px;" src="/xp.png"> +{{ item.xp }}%</p>
      <p v-if="item.damage">⚔️ +{{ item.damage }}%</p>
      <p v-if="item.mining">⛏️ +{{ item.mining }}%</p>
      <p>value: {{ ItemManager.getItemPrice(item).toFixed(SettingsManager.getSettings().decimals) }}<img class="token-icon" :src="TokenManager.getReferenceTokenStore().getIcon()"></p>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { useItemsStore } from '@/stores/useItems';
import { Item } from '@/enums/ItemsEnum';
import ItemManager from '@/managers/ItemManager';
import TokenManager from '@/managers/TokenManager';
import SettingsManager from '@/managers/SettingsManager';
  
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true
    },
    inventoryIndex: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    const itemsStore = useItemsStore();
    const inventoryIndex = props.inventoryIndex ?? 0;

    const consumeItem = (index: string) => {
      /* @todo */
      itemsStore.consumeItem(index);
    };

    const backgroundStyle = computed(() => ({
      backgroundImage: `url('${ItemManager.getItemImage(props.item.index)}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#000',
    }));

    return {
      inventoryIndex,
      backgroundStyle,
      ItemManager,
      TokenManager,
      SettingsManager,
      consumeItem,
    };
  },
});
</script>
  
  <style scoped>
  .item {
    position: relative;
    width: 150px;
    height: 150px;
    background-color: #ddd;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #444;
    border-radius: 5px;
    cursor: grab;
    text-align: center;
  }
  
  .item:hover {
    background-color: #ccc;
  }
  
  .consume-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 2px 6px;
    font-size: 12px;
    background-color: #ff5c5c;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .consume-btn:hover {
    background-color: #ff0000;
  }

/* INFOBOX */
.infobox {
  display: none;
  position: absolute;
  border-radius: 10%;
  border: 2px solid #444;
  top: 110%; /* Adjust as needed */
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
  width: 200px;
  pointer-events: none;
  opacity: 0; /* Initially invisible */
  transition: opacity 0.3s ease; /* Smooth transition */
  transform: translateY(-50%);
}

.item:hover .infobox, .item .infobox:hover {
  display: block;
  opacity: 1; /* Fade in */
  pointer-events: auto;
}

.token-icon {
  width: 12px;
}
</style>
  