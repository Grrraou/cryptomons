<template>
  <div class="item" :style="backgroundStyle">
    <p>{{ item.name }} ({{ item.type }})</p>

    <!-- Consumable Button: Visible only for consumable items -->
    <button v-if="item.type === 'Consumable'" class="consume-btn" @click="consumeItem(item.index)">
      Use
    </button>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { useItemsStore } from '@/stores/useItems';
import { Item } from '@/enums/ItemsEnum';
import ItemManager from '@/managers/ItemManager';
  
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
    const item = ItemManager.getBaseItem(props.item.index);
    const itemsStore = useItemsStore();
    const inventoryIndex = props.inventoryIndex ?? 0;

    const consumeItem = (index: string) => {
      /* @todo */
      itemsStore.consumeItem(index);
    };

    const backgroundStyle = computed(() => ({
      backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('${ItemManager.getItemImage(item.index)}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#000',
    }));

    return {
      inventoryIndex,
      backgroundStyle,
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
  </style>
  