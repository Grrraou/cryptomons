<template>
  <div class="item infoboxed" :style="backgroundStyle"  :class="itemRarityClass">

    <!-- Consumable Button: Visible only for consumable items -->
    <button v-if="item.type === 'Consumable'" class="consume-btn" @click="consumeItem(item.index)">
      Use
    </button>

    <!-- Info Box -->
    <div class="infobox" @dragstart.prevent>
      <p>{{ item.name }}</p>
      <p>Type: {{ item.type }}</p>
      <p v-if="item.description">{{ item.description }}</p>
      <p v-if="item.xp"><img style="width: 12px;" src="/xp.png"> +{{ item.xp }}%</p>
      <p v-if="item.damage">⚔️ +{{ item.damage }}%</p>
      <p v-if="item.mining">⛏️ +{{ item.mining }}%</p>
      <p>{{ ItemManager.getItemPrice(item).toFixed(SettingsManager.getSettings().decimals) }}<img class="token-icon" :src="TokenManager.getReferenceTokenStore().getIcon()"></p>
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

    const itemRarityClass = `item-rarity-${props.item.rarity}`;

    return {
      inventoryIndex,
      backgroundStyle,
      ItemManager,
      TokenManager,
      SettingsManager,
      consumeItem,
      itemRarityClass,
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
    border: 5px solid #444;
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

.token-icon {
  width: 12px;
}

/** RARITY */
.item-rarity-1, .item-rarity-1 .infobox {
  border: 5px solid #9d9d9d; /* Common (grey) */
}

.item-rarity-2, .item-rarity-2 .infobox {
  border: 5px solid #5EC15E; /* Uncommon (green) */
}

.item-rarity-3, .item-rarity-3 .infobox {
  border: 5px solid #3B82F6; /* Rare (blue) */
}

.item-rarity-4, .item-rarity-4 .infobox {
  border: 5px solid #A871C1; /* Epic (purple) */
}

.item-rarity-5, .item-rarity-5 .infobox {
  border: 5px solid #FFA500; /* Legendary (orange/gold) */
}

</style>
  