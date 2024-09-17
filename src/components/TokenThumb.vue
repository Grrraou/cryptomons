<template>
  <div class="token-thumb">
    <h2>
      <img class="tokenSymbol" :src="tokenStore.getIcon()" draggable="false" />
      {{ token.name }}
    </h2>
    
    <!-- Current Amount with dynamic class binding for highlighting -->
    <p :class="{'highlight-amount': sortOption === 'amount'}">
      <span class='label'>Current Amount:</span> 
      <br>
      <span class="tokenSum">{{ tokenStore.balance.toFixed(SettingsManager.getSettings().decimals) }} <img class="token-icon" :src="tokenStore.getIcon()" draggable="false" /></span>
    </p>

    <!-- Price per token with dynamic class binding for highlighting -->
    <p :class="{'highlight-price': sortOption === 'price'}">
      <span class='label'>Price per {{ tokenStore.name }}:</span>
      <br>
      <span class="tokenSum">{{ tokenStore.price.toFixed(SettingsManager.getSettings().decimals) }} <img class="token-icon" :src="TokenManager.getReferenceTokenStore().getIcon()" draggable="false" /></span>
    </p>
    
    <!-- Total Value in Cryptocredits with dynamic class binding for highlighting -->
    <p :class="{'highlight-total-value': sortOption === 'totalValue'}">
      <span class='label'>Total Value in {{ TokenManager.getReferenceTokenStore().name }}:</span>
      <br>
      <span class="tokenSum">{{ tokenStore.getBalanceInCrypto().toFixed(SettingsManager.getSettings().decimals) }} <img class="token-icon" :src="TokenManager.getReferenceTokenStore().getIcon()" draggable="false" /></span>
    </p>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useTokenStores } from '@/stores/useTokens';
import TokenManager from '@/managers/TokenManager';
import SettingsManager from '@/managers/SettingsManager';
  
export default defineComponent({
  name: 'TokenThumb',
  props: {
    token: {
      type: Object as () => { index: string; name: string },
      required: true,
    },
    sortOption: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const tokenStore = useTokenStores[props.token.index](); // Create store instance

    return {
      tokenStore,
      TokenManager,
      SettingsManager,
    };
  },
});
</script>
  
<style scoped>
.token-thumb {
  margin: 10px;
  padding: 20px;
  width: 10%;
  border: 4px solid #ffa500;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fdfdfd;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-weight: bold;
  color: #444;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.token-thumb:hover {
  border: 4px solid #5EC15E;
}

.token-thumb h2 {
  margin: 0 0 10px;
  font-size: 22px;
}

.token-thumb p {
  font-size: 18px;
  margin: 5px 0;
}

.tokenSum {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.label {
  font-size: 12px;
}

.highlight-amount {
  background-color: #fff4e5;
  font-weight: bold;
  color: #ff8c00;
}

.highlight-price {
  background-color: #e5f4ff;
  font-weight: bold;
  color: #007bff;
}

.highlight-total-value {
  background-color: #e5ffe5;
  font-weight: bold;
  color: #28a745;
}

.token-icon {
  width: 16px;
  height: auto;
  transition: transform 0.3s ease;
  margin-bottom: -2px;
}

.tokenSymbol {
  width: 16px;
}
</style>
  