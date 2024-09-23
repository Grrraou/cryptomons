<template>
  <TokenRain />
  <div class="home-page game-container">
    <h1 class="title">
      <span>C</span><span>r</span><span>y</span><span>p</span><span>t</span><span>o</span><span>m</span><span>o</span><span>n</span><span>s</span> 
      <span>C</span><span>l</span><span>i</span><span>c</span><span>k</span><span>e</span><span>r</span>
    </h1>
    <InfoBubble page="home" class="home-info-bubble" />

   

    <CandleChart></CandleChart>

    <div class="start-button">
      <div class="hand">👆</div>
      <router-link to="/mines" draggable="false">START</router-link>
    </div>

  </div>
</template>

<script lang="ts">
import CandleChart from '@/components/animations/CandleChart.vue';
import TokenRain from '@/components/animations/TokenRain.vue';
import InfoBubble from '@/components/InfoBubble.vue';
import { defineComponent } from 'vue';



export default defineComponent({
  name: 'HomePage',
  components: {
    TokenRain,
    CandleChart,
    InfoBubble,
  },
  setup: () => {

    return {
    }
  }
});
</script>

<style scoped>
.home-info-bubble {
  position: absolute;
  right: 20px;
  top: 20px;
}
/** TITLE */
.title {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4rem;
  font-family: 'Arial', sans-serif;
  color: #ffcc00;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: inline-block;
}

.title span {
  display: inline-block;
  animation: colorChange 2s infinite ease-in-out, sizeChange 1.5s infinite ease-in-out;
}

.title span:nth-child(odd) {
  animation-delay: 0.2s; /* Delay for alternate letters */
}

.title span:nth-child(even) {
  animation-delay: 0.4s; /* Delay for alternate letters */
}

@keyframes colorChange {
  0%, 100% {
    color: #ffcc00;
  }
  50% {
    color: #444;
  }
}

@keyframes sizeChange {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2); /* Slight size increase */
  }
}

/** CLICKING HAND */
.hand {
  position: absolute;
  font-size: 5rem;
  z-index: 999;
  cursor: pointer;
  opacity: 0;
  animation: handAppear 4s infinite ease-in-out;
}

@keyframes handAppear {
  0%, 80% {
    opacity: 0; /* Hidden most of the time */
  }
  85% {
    opacity: 1; /* Hand appears */
    transform: scale(1); /* Normal size */
  }
  90% {
    transform: scale(0.95); /* Clicking animation */
  }
  95% {
    transform: scale(1); /* Return to normal size */
  }
  100% {
    opacity: 0; /* Hide again */
  }
}


/** START BUTTON */
.start-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Perfectly center the button */
  z-index: 999;
  padding: 20px 0;
  font-size: 2rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: idle-bounce 2s infinite ease-in-out; /* Idle animation */
}


.start-button:hover {
  background-color: #218838;
  transform: translate(-50%, -50%) scale(1.05); /* Slightly enlarge on hover */
}

.start-button a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-family: Arial, sans-serif;
  z-index: 1000;
  position: relative;
  padding: 20px 50px;
}

@keyframes idle-bounce {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1); /* Normal scale */
  }
  50% {
    transform: translate(-50%, -50%) scale(1.03); /* Slightly grow and shrink */
  }
}

</style>
