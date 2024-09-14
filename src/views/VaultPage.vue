<template>
    <div class="vault-page game-container">
      <h1 class="page-title">Crypto Vault</h1>
      <p>Total Value of Assets in Cryptocredits: {{ totalAssetsValue.toFixed(2) }}</p>
  
      <!-- Filter and Sort UI -->
      <div class="filter-sort">
        <input
          v-model="filterText"
          type="text"
          placeholder="Filter by token name or index"
          class="filter-input"
        />
        <select v-model="sortOption" class="sort-select">
          <option value="default">Sort by Default</option>
          <option value="amount">Sort by Current Amount</option>
          <option value="price">Sort by Price</option>
          <option value="totalValue">Sort by Total Value</option>
        </select>
      </div>
  
      <!-- Token List -->
      <div class="vault-list">
        <TokenThumb v-for="token in filteredTokens" 
          :key="token.index" 
          :token="token"
          :sortOption="sortOption"
          class="vault-item" 
        />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, ref } from 'vue';
  import { useTokenStores } from '@/stores/useTokens';
  import TokenThumb from '@/components/TokenThumb.vue';
import TokenManager from '@/managers/TokenManager';
  
  export default defineComponent({
    name: 'VaultPage',
    components: {
      TokenThumb,
    },
    setup() {
      // Get all token stores
      const tokenStores = TokenManager.getTokens();
      
      const filterText = ref('');
      const sortOption = ref('default');
  
      // Compute the total value of all assets in Cryptocredits
      const totalAssetsValue = computed(() => {
        return tokenStores.reduce((total, store) => {
          return total + (store.balance * store.price);
        }, 0);
      });
  
      // Filter and sort tokens based on the user's input
      const filteredTokens = computed(() => {
        let filtered = tokenStores.filter(store => {
          const tokenAmount = store.balance;
          return (
            tokenAmount > 0 &&
            (store.name.toLowerCase().includes(filterText.value.toLowerCase()) ||
            store.index.toLowerCase().includes(filterText.value.toLowerCase()))
          );
        });
  
        if (sortOption.value === 'amount') {
          filtered.sort((a, b) => b.balance - a.balance);
        } else if (sortOption.value === 'price') {
          filtered.sort((a, b) => b.price - a.price);
        } else if (sortOption.value === 'totalValue') {
          filtered.sort((a, b) => (b.balance * b.price) - (a.balance * a.price));
        }
  
        return filtered;
      });
  
      return {
        filterText,
        sortOption,
        totalAssetsValue,
        filteredTokens,
      };
    },
  });
</script>
  
<style scoped>
  .filter-sort {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .filter-input {
    padding: 10px;
    width: 60%;
    border: 2px solid #ffa500;
    border-radius: 8px;
    font-size: 1.2em;
  }
  
  .sort-select {
    padding: 10px;
    border: 2px solid #ffa500;
    border-radius: 8px;
    font-size: 1.2em;
  }
  
  .page-title {
    position: relative;
    font-size: 28px;
    font-weight: bold;
    color: #444;
    text-align: center;
    top: 0;
    margin-bottom: 20px;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 2px solid #ffa500;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .vault-page {
    padding-left: 220px;
    margin-top: 50px;
  }
  
  .vault-list {
    margin-top: 20px;
  }
  
  .vault-item {
    margin: 10px;
    padding: 20px;
    width: 10%;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
  }
  </style>
  