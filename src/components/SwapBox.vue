<template>
    <div class="swap-box">
      <h2>Crypto Swap (fees: {{ fromToken.swapFees * 100 }}%)</h2>
      <div class="swap-interface">
        <!-- From Token -->
        <label for="from-token">From:</label>
        <VueSelect
          v-model="fromToken"
          :options="fromTokenOptions"
          label="label"
          placeholder="Select or search token"
          :filterBy="customFilter"
          :clearable="false"
        >
          <!-- Option template to display each option with an icon -->
          <template #option="{ option }">
            <div class="option-content">
              <img :src="option.icon" alt="Token Logo" class="token-logo" />
              <span class="option-label">{{ option.label }} ( {{ option.balance }} )</span>
            </div>
          </template>
        </VueSelect>
  
        <!-- Swap Button (Switch From and To Tokens) -->
        <div class="swap-tokens-button-container">
          <button class="swap-tokens-button" @click="switchTokens">
            <img src="/swap/switch.png" alt="Switch Tokens" class="swap-icon" />
          </button>
        </div>
  
        <!-- To Token -->
        <label for="to-token">To:</label>
        <VueSelect
          v-model="toToken"
          :options="toTokenOptions"
          label="label"
          placeholder="Select or search token"
          :customFilter="customFilter"
        >
          <template #option="{ option }">
            <div class="option-content">
              <img :src="option.icon" alt="Token Logo" class="token-logo" />
              <span class="option-label">{{ option.label }} ( {{ option.balance }} )</span>
            </div>
          </template>
        </VueSelect>
  
        <!-- Swap Amount -->
        <div class="swap-amount">
          <input 
            v-model="amount" 
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
          <img src="/swap/swapButton.png" alt="Swap Logo" class="button-logo" />
          Swap!
        </button>
      </div>
  
      <!-- Swap Result -->
      <div v-if="swapResult" class="swap-result">
        <p><span style="color: #444;">You will receive approximately:</span><br>{{ swapResult }} <img :src="toToken.getIcon()" class="token-icon"></p>
      </div>
      <div v-else class="swap-result">
        <p><img :src="fromToken.getIcon()" class="token-icon"> = {{ fromToken.price }}<img src="/tokens/cryptodollar.png" class="token-icon"></p>
        <p><img :src="toToken.getIcon()" class="token-icon"> = {{ toToken.price }}<img src="/tokens/cryptodollar.png" class="token-icon"></p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import VueSelect from "vue3-select-component";
  import TokenManager from '@/managers/TokenManager';
  import { TokenStoreType } from '@/stores/useTokens';
import AudioManager from '@/managers/AudioManager';
import UXManager from '@/managers/UXManager';
  
  export default defineComponent({
    name: 'SimpleSwapBox',
    components: {
      VueSelect,
    },
    setup() {
      // Initialize token stores
      const rawTokenStores = TokenManager.getTokens();

        interface SimpleTokenOption {
            label: string;
            value: TokenStoreType;
            icon: string;
            balance: number;
            price: number;
            index: string;
            updateBalance: (amount: number) => void;
        }
      
      let simpleTokenOptions: SimpleTokenOption[] = rawTokenStores.slice().map(token => ({
        label: token.name,
        value: token,
        icon: token.getIcon(),
        balance: token.balance,
        price: token.price,
        index: token.index,
        updateBalance: token.updateBalance,
      }));

      let fromTokenOptions: SimpleTokenOption[] = simpleTokenOptions.slice().sort((a, b) => b.balance - a.balance);
      let toTokenOptions: SimpleTokenOption[] = simpleTokenOptions.slice().sort((a, b) => b.price - a.price);
  
        // State for the selected tokens
        const cryptodollarToken = rawTokenStores.find(token => token.index === "cryptodollar")

        const highestBalanceToken = rawTokenStores.reduce((prev, current) => {
            if (current.index === 'cryptodollar') return prev;
            return (current.balance > prev.balance) ? current : prev;
        }, rawTokenStores[1]);
        const fromToken = ref(highestBalanceToken);

        const toToken = ref(cryptodollarToken || rawTokenStores[0]);
        const amount = ref(0);
        const swapResult = ref<number>(0);
        
  
      // Custom filter method for VueSelect
      const customFilter = (option: SimpleTokenOption, label: string, search: string) => {
        //console.log(search)
        if (!search) return true;
        const searchLower = search.toLowerCase();
        
        return option.label.toLowerCase().includes(searchLower) || option.index.toLowerCase().includes(searchLower);
      };
  
      const updateBalances = () => {
        //console.log()
        fromToken.value.balance = fromToken.value.balance;
        toToken.value.balance = toToken.value.balance;
        calculatePotentialSwap();
      };
  
      const switchTokens = () => {
        const tempToken = fromToken.value;
        fromToken.value = toToken.value;
        toToken.value = tempToken;
        updateBalances();
      };
  
      const calculatePotentialSwap = () => {
        const fromTokenValue = fromToken.value.price;
        const toTokenValue = toToken.value.price;
        const fees = amount.value * fromToken.value.swapFees;

        if (amount.value > 0 && fromTokenValue > 0 && toTokenValue > 0) {
          const fromTokenValueInDollar = ((amount.value - fees) * fromTokenValue);
          swapResult.value = (fromTokenValueInDollar / toTokenValue);
        } else {
          swapResult.value = 0;
        }
      };
  
      const selectPercentage = (percentage: number) => {
        amount.value = (fromToken.value.balance * percentage) / 100;
        calculatePotentialSwap();
      };
  
      const swapTokens = () => {
        if (amount.value <= 0) {
          alert(`Can't swap 0.`);
          return;
        }

        if (fromToken.value.balance < amount.value) {
          alert(`Insufficient ${fromToken.value.index.toUpperCase()} balance.`);
          return;
        }

        const priceChangeFactor = 0.01; // Control the price change sensitivity
        // Adjust the fromToken price
        if (fromToken.value.index !== 'cryptodollar') {
            // Decrease fromToken price, proportional to its current price and the amount being swapped
            const priceDecrease = fromToken.value.price * (priceChangeFactor * (amount.value / (amount.value + fromToken.value.price)));
            fromToken.value.price = Math.max(fromToken.value.price - priceDecrease, 0.01);
        }

        // Adjust the toToken price
        if (toToken.value.index !== 'cryptodollar') {
            // Increase toToken price, proportional to its current price and the amount being swapped
            const priceIncrease = toToken.value.price * (priceChangeFactor * (amount.value / (amount.value + toToken.value.price)));
            toToken.value.price = Math.max(toToken.value.price + priceIncrease, 0.01);
        }
        
        fromToken.value.updateBalance(-amount.value);
        toToken.value.updateBalance(swapResult.value);
        UXManager.showSuccess(`Swapped ${amount.value} ${fromToken.value.index.toUpperCase()} to ${swapResult.value} ${toToken.value.index.toUpperCase()}`);
        AudioManager.play('swap.wav');
        updateBalances();
        swapResult.value = 0;
        amount.value = 0;
        //window.location.reload();
      };
  
      return {
        rawTokenStores,
        fromToken,
        fromTokenOptions,
        toToken,
        toTokenOptions,
        amount,
        swapResult,
        customFilter,
        selectPercentage,
        switchTokens,
        swapTokens,
        updateBalances,
      };
    },
    mounted() {
      this.updateBalances();
    },
  });
  </script>

<style scoped>
.token-icon {
  width: 16px;
  height: auto;
  transition: transform 0.3s ease;
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

.quick-select-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
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
