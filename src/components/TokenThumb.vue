<template>
  <div class="token-thumb infoboxed" :style="backgroundStyle">
    <h2 class="token-name">
      <img class="tokenSymbol" :src="tokenStore.getIcon()" draggable="false" />
      {{ token.name }}
    </h2>
    
    <!-- Current Amount with dynamic class binding for highlighting -->
    <p :class="{'highlight-amount': sortOption === 'amount'}" class="current-amount">
      <span class='label'>Current Amount:</span> 
      <br>
      <span class="tokenSum">{{ tokenStore.balance.toFixed(SettingsManager.getSettings().decimals) }} <img class="token-icon" :src="tokenStore.getIcon()" draggable="false" /></span>
    </p>

    <!-- Price per token with dynamic class binding for highlighting -->
    <p :class="{'highlight-price': sortOption === 'price'}" class="current-price">
      <span class='label'>Price per {{ tokenStore.name }}:</span>
      <br>
      <span class="tokenSum">{{ tokenStore.price.toFixed(SettingsManager.getSettings().decimals) }} <img class="token-icon" :src="TokenManager.getReferenceTokenStore().getIcon()" draggable="false" /></span>
    </p>
    
    <!-- Total Value in Cryptocredits with dynamic class binding for highlighting -->
    <p :class="{'highlight-total-value': sortOption === 'totalValue'}" class="current-reference-value">
      <span class='label'>Total Value in {{ TokenManager.getReferenceTokenStore().name }}:</span>
      <br>
      <span class="tokenSum">{{ tokenStore.getBalanceInCrypto().toFixed(SettingsManager.getSettings().decimals) }} <img class="token-icon" :src="TokenManager.getReferenceTokenStore().getIcon()" draggable="false" /></span>
    </p>
    
    <div v-if="GoalManager.getGoalStore('centralize_decentralization').isCompleted" class="infobox" @dragstart.prevent>
      <button v-if="!chartInit" @click="initChart($event)">📊 View graph for {{ graphPrice.toFixed(2) }} <img :src="TokenManager.getTokenStore('grt').getIcon()" class="token-icon"></button>
      <canvas ref="candleChart"></canvas>
    </div>
    
  </div>
</template>
  
<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { TokenStoreType, useTokenStores } from '@/stores/useTokens';
import TokenManager from '@/managers/TokenManager';
import SettingsManager from '@/managers/SettingsManager';
import GoalManager from '@/managers/GoalManager';

import { Chart, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial'; // Import both the controller and element
import 'chartjs-adapter-date-fns'; // Import the date adapter
import UXManager from '@/managers/UXManager';
  
// Register all chart.js components and the financial chart components
Chart.register(...registerables, CandlestickController, CandlestickElement); // Register both the controller and element
  
export default defineComponent({
  name: 'TokenThumb',
  props: {
    token: {
      type: Object as () => TokenStoreType,
      required: true,
    },
    sortOption: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const tokenStore = useTokenStores[props.token.index]();
    const grtStore = TokenManager.getTokenStore('grt');
    const graphPrice = ref(1 + tokenStore.history.length * 0.01);

    const backgroundStyle = computed(() => ({
      backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.9)), url('${tokenStore.getIcon()}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }));

    /** CHART */
    const candleChart = ref<HTMLCanvasElement | null>(null);
    let chartInstance: Chart | null = null;
    let chartInit = ref(false);

    // Initialize the chart
    const initChart = (event) => {
      if (grtStore.balance < graphPrice.value) {
        return;
      }
      grtStore.balance -= graphPrice.value;
      UXManager.showFlyingText(`-${graphPrice.value.toFixed(2)}`, grtStore.getIcon(), event.clientX, event.clientY, 'red');
      chartInit.value = true;
      if (candleChart.value) {
        const ctx = candleChart.value.getContext('2d');

        if (ctx) {
          chartInstance = new Chart(ctx, {
            type: 'candlestick',
            data: {
              datasets: [
                {
                  label: 'Candlestick Data',
                  data: tokenStore.history,
                  borderColor: 'black',
                  barThickness: 3,
                },
              ],
            },
            options: {
              scales: {
                x: {
                  type: 'linear',
                  beginAtZero: false,
                  ticks: {
                    autoSkip: false,
                    stepSize: 1,
                  },
                },
                y: {
                  beginAtZero: false,
                },
              },
              plugins: {
                      tooltip: {
                      enabled: false,
                  },
                  legend: {
                      display: false,
                  },
              },
              responsive: true,
              maintainAspectRatio: true,
            },
          });
        }
      }
    };

    /** add a new goal to make all the graphs free */
   /*  onMounted(() => {
      initChart();
    }); */

    return {
      tokenStore,
      backgroundStyle,
      candleChart,
      chartInit,
      graphPrice,
      initChart,
      TokenManager,
      SettingsManager,
      GoalManager,
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

/** CHART */
canvas {
  width: 300px;
  height: 300px;
}

.infobox {
  height: auto;
  max-height: 100%;
}
</style>
  