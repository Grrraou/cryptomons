<template>
    <div style="width: 100%; height: 100vh;">
      <canvas ref="candleChart"></canvas>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial'; // Import both the controller and element
  import 'chartjs-adapter-date-fns'; // Import the date adapter
  
  // Register all chart.js components and the financial chart components
  Chart.register(...registerables, CandlestickController, CandlestickElement); // Register both the controller and element
  
  export default defineComponent({
    name: 'CandleChart',
    setup() {
      const candleChart = ref<HTMLCanvasElement | null>(null);
      let chartInstance: Chart | null = null;
      
  
      // Generate random candle data (OHLC format) based on the previous candle
      const getRandomCandle = (previousClose: number, timestamp: Date) => {
        const open = previousClose + (Math.random() - 0.5) * 10; // Slightly randomize around the previous close
        const close = open + (Math.random() - 0.5) * 10; // Randomly move up or down from open
        const high = Math.max(open, close) + Math.random() * 5; // High is above both open and close
        const low = Math.min(open, close) - Math.random() * 5; // Low is below both open and close
        return { x: timestamp, o: open, h: high, l: low, c: close };
      };
  
      // Generate an initial dataset with 100 random candles
      const generateInitialDataset = () => {
        const initialData = [];
        const now = new Date();
        let previousClose = Math.random() * 100; // Start with a random price
  
        for (let i = 0; i < 100; i++) {
          const timestamp = new Date(now.getTime() - (99 - i) * 1000); // Spread candles over the past 100 seconds
          const candle = getRandomCandle(previousClose, timestamp);
          initialData.push(candle);
          previousClose = candle.c; // Update the previous close to current candle close
        }
        return initialData;
      };
  
      // Initialize the chart
      const initChart = () => {
        if (candleChart.value) {
          const ctx = candleChart.value.getContext('2d');
          if (ctx) {
            chartInstance = new Chart(ctx, {
              type: 'candlestick',
              data: {
                datasets: [
                  {
                    label: 'Candlestick Data',
                    data: generateInitialDataset(), // Start with 100 candles
                    borderColor: 'black',
                    barThickness: 10, // Control the width of the candles
                  },
                ],
              },
              options: {
                scales: {
                  x: {
                    type: 'time', // To handle time on the X-axis
                    time: {
                      unit: 'second', // Adjust based on how frequently data is updated
                      displayFormats: {
                        second: 'HH:mm:ss', // Display format for the time
                      },
                    },
                  },
                  y: {
                    beginAtZero: false, // No starting from zero
                  },
                },
                plugins: {
                        tooltip: {
                        enabled: false,  // Disable tooltips
                    },
                    legend: {
                        display: false,  // Hide the Candlestick Data label
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
              },
            });
          }
        }
      };
  
      // Update chart with new random data, and maintain only 100 candles
      const updateChart = () => {
        if (chartInstance) {
          const dataset = chartInstance.data.datasets[0].data as any[];
          const previousCandle = dataset[dataset.length - 1]; // Get the last candle
          const now = new Date();
          const newCandle = getRandomCandle(previousCandle.c, now); // Use previous close for new open
  
          // Add new candle
          dataset.push(newCandle);
  
          // Remove the oldest candle if there are more than 100 candles
          if (dataset.length > 100) {
            dataset.shift(); // Remove the oldest candle
          }
  
          chartInstance.update();
        }
      };
  
      // Start updating chart indefinitely
      let intervalId: number;
      
      const startChartUpdate = () => {
        intervalId = window.setInterval(updateChart, 1000) as unknown as number; // Update every second
      };
  
      // Stop updating the chart
      const stopChartUpdate = () => {
        clearInterval(intervalId);
      };
  
      onMounted(() => {
        initChart();
        startChartUpdate();
      });
  
      onUnmounted(() => {
        stopChartUpdate();
      });
  
      return {
        candleChart,
      };
    },
  });
  </script>
  
  <style scoped>
 canvas {
  width: 100%;   /* Full width */
  height: 100vh; /* Full viewport height */
}
  </style>
  