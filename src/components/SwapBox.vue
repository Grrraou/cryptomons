<template>
  <div class="swap-box">
    <h2>Crypto Swap <span class="swap-fees">(fees: {{ fromToken.swapFees * 100 }}%)</span></h2>
    <div class="swap-interface">

      <!-- From Token -->
      <label for="from-token">From:</label>
      <VueSelect
        v-model="fromToken"
        :options="swapStore.getFromTokenSwapOptions()"
        label="label"
        class="swap-fromtoken"
        placeholder="Select or search token"
        :clearable=false
      >
        <!-- Option template to display each option with an icon -->
        <template #option="{ option }">
          <div class="option-content">
            <img :src="(option as any).icon" alt="Token Logo" class="token-logo" draggable="false" />
            <span class="option-label">{{ option.label }} ( {{ (option as any).balance }} )</span>
          </div>
        </template>
      </VueSelect>
  
      <!-- Swap Button (Switch From and To Tokens) -->
      <div class="swap-tokens-button-container">
        <button class="swap-tokens-button" @click="swapStore.switchTokens()">
          <img src="/swap/switch.png" alt="Switch Tokens" class="swap-icon" draggable="false" />
        </button>
      </div>
  
      <!-- To Token -->
      <label for="to-token">To:</label>
      <VueSelect
        v-model="toToken"
        :options="swapStore.getToTokenSwapOptions()"
        label="label"
        class="swap-totoken"
        placeholder="Select or search token"
      >
        <template #option="{ option }">
          <div class="option-content">
            <img :src="(option as any).icon" alt="Token Logo" class="token-logo" draggable="false" />
            <span class="option-label">{{ option.label }}  at {{ (option as any).price }}<img src="/tokens/cryptodollar.png" alt="Token Logo" class="token-logo" /></span>
          </div>
        </template>
      </VueSelect>
  
      <!-- Swap Amount -->
      <div class="swap-amount">
        <input 
          v-model="swapStore.amount" 
          type="number" 
          placeholder="Amount" 
          class="amount-input" 
        />
        <div class="quick-select-buttons">
          <button @click="selectPercentage(25)">25%</button>
          <button @click="selectPercentage(50)">50%</button>
          <button @click="selectPercentage(75)">75%</button>
          <button @click="selectPercentage(100)">100%</button>
        </div>
      </div>
  
      <!-- Swap Button -->
      <button class="swap-button" @click="swapTokens">
        <img src="/swap/swapButton.png" alt="Swap Logo" class="button-logo" draggable="false" />
        Swap!
      </button>
    </div>
  
    <!-- Swap Result -->
    <div v-if="swapResult" class="swap-result">
      <p><span style="color: #444;">You will receive approximately:</span><br>{{ swapResult.toFixed(SettingsManager.getSettings().decimals) }} <img :src="toToken.getIcon()" class="token-icon"></p>
    </div>
    <div v-else class="swap-result">
      <p>1<img :src="fromToken.getIcon()" class="token-icon" draggable="false"> = {{ fromToken.price }}<img src="/tokens/cryptodollar.png" class="token-icon" draggable="false"></p>
      <p>1<img :src="toToken.getIcon()" class="token-icon" draggable="false"> = {{ toToken.price }}<img src="/tokens/cryptodollar.png" class="token-icon" draggable="false"></p>
    </div>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';
import VueSelect from "vue3-select-component";
import TokenManager from '@/managers/TokenManager';
import SettingsManager from '@/managers/SettingsManager';
import { TokenStoreType } from '@/stores/useTokens';
  
export default defineComponent({
  name: 'SimpleSwapBox',
  components: {
    VueSelect,
  },
  setup() {
    const swapStore = TokenManager.getSwapStore();

    const fromToken: Ref<TokenStoreType> = computed({
      get: () => swapStore.getFromTokenStore(),
      set: (value) => swapStore.fromToken = value.index,
    });
    const toToken: Ref<TokenStoreType> = computed({
      get: () => swapStore.getToTokenStore(),
      set: (value) => swapStore.toToken = value.index,
    });
    const swapResult = computed({
      get: () => swapStore.calculatePotentialSwap(),
      set: (value) => swapStore.swapResult = value,
    });
  
    const selectPercentage = (percentage: number) => {
      let selectedAmount = (fromToken.value.balance * percentage) / 100;
      selectedAmount = (selectedAmount > fromToken.value.balance) ? fromToken.value.balance : selectedAmount;
      swapStore.setAmount(selectedAmount);
    };
  
    const swapTokens = () => {
      swapResult.value = swapStore.swapTokens();
    };
  
    return {
      swapStore,
      fromToken,
      toToken,
      swapResult,
      SettingsManager,
      selectPercentage,
      swapTokens,
    };
  },
});
</script>

<style scoped>
.token-icon {
  width: 16px;
  height: auto;
  transition: transform 0.3s ease;
  margin-bottom: -2px;
}
.option-content {
  display: flex;
  align-items: center;
}

.token-logo {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.amount-input {
  width: 94%;
  padding: 10px;
  border: 2px solid #ffa500;
  border-radius: 8px;
  font-size: 1.2em;
  color: #444;
  background-color: #fdfdfd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.amount-input:focus {
  border-color: #ff8c00;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  outline: none;
}


.swap-box {
  margin: 10px auto;
  padding: 20px;
  border: 2px solid #ffa500;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fdfdfd;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-blend-mode: lighten;
  font-size: 1.3em;
  font-weight: bold;
  color: #444;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  width: 500px;
}

.swap-interface {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.swap-amount {
  margin: 16px 0;
}

/* PERCENT BUTTONS */
.quick-select-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.quick-select-buttons button {
  background-color: #f0f0f0;
  color: #333;
  border: 2px solid #e0e0e0;
  border-radius: 30px;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quick-select-buttons button:hover {
  background-color: #ffa500;
  color: #fff;
  border-color: #ffa500;
}

.quick-select-buttons button:active {
  transform: scale(0.95);
}

.quick-select-buttons button:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}




.swap-result {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}

.swap-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #ffa500;
  border: 2px solid #444;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.swap-button:hover {
  background-color: #ff8c00;
  transform: translateY(-2px);
}

.button-logo {
  width: 50px;
  height: 50px;
  margin-right: 8px;
}

.swap-tokens-button-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.swap-tokens-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.swap-icon {
  width: 32px;
  height: 32px;
  transition: transform 0.3s ease;
}

.swap-tokens-button:hover .swap-icon {
  transform: rotate(180deg);
}
</style>
