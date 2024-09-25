<template>
  <div class="item infoboxed" :style="backgroundStyle"  :class="itemRarityClass">

    <!-- Consumable Button: Visible only for consumable items -->
    <button v-if="item.type === 'Consumable'" class="consume-btn" @click="consumeItem(item, inventoryIndex)">
      USE
    </button>

    <!-- Info Box -->
    <div class="infobox" @dragstart.prevent>
      <p>{{ item.name }}</p>
      <p>Type: {{ item.type }}</p>
      <p v-if="item.description">{{ item.description }}</p>
      <br>
      <p v-if="item.xp"><img style="width: 12px;" src="/xp.png"> +{{ item.xp }}%</p>
      <p v-if="item.damage">⚔️ +{{ item.damage }}%</p>
      <p v-if="item.mining">⛏️ +{{ item.mining }}%</p>
      <p v-if="item.index === 'good_news'">
        <img class="token-icon" :src="TokenManager.getTokenStore(item.token).getIcon()"> price +{{ item.power.toFixed(2) }}%
      </p>
      <br>
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

    const consumeItem = (item: Item, inventoryIndex: number) => {
      itemsStore.consumeItem(item, inventoryIndex);
    };

    const backgroundStyle = computed(() => ({
      backgroundImage: `url('${ItemManager.getItemImage(props.item.index)}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#000',
    }));

    const itemRarityClass = computed(() => `item-rarity-${props.item.rarity}`);

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
    left: 5px;
    padding: 4px 12px;
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
  margin-bottom: -2px;
}

/** RARITY */
.item-rarity-0, .item-rarity-0 .infobox {
  border: 5px solid #000;
}

.item-rarity-1, .item-rarity-1 .infobox {
  border: 5px solid #9d9d9d;
}

.item-rarity-2, .item-rarity-2 .infobox {
  border: 5px solid #5EC15E;
}

.item-rarity-3, .item-rarity-3 .infobox {
  border: 5px solid #3B82F6;
}

.item-rarity-4, .item-rarity-4 .infobox {
  border: 5px solid #A871C1;
}

.item-rarity-5, .item-rarity-5 .infobox {
  border: 5px solid #FFA500;
}

</style>
  