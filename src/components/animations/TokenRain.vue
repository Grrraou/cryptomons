<template>

      <div
        v-for="(coin, index) in coins"
        :key="index"
        class="coin"
        :style="coin.style"
      ></div>

</template>

<script lang="ts">
import TokenManager from '@/managers/TokenManager';
import { defineComponent, reactive } from 'vue';
import { TokenStoreType } from '@/stores/useTokens';



export default defineComponent({
  name: 'TokenRain',
  props: {
    tokens: {
      type: Array as () => TokenStoreType[],
    }
  },
  setup: (props) => {
    const tokens = props.tokens || TokenManager.getTokens();
    let images = [];
    tokens.forEach(tokenStore => {
        images.push(tokenStore.getIcon());
      });

    const randomPosition = (min: number, max: number): number => Math.random() * (max - min) + min;

    const randomCoinImage = (): string => {
      //const images = []
      return images[Math.floor(Math.random() * images.length)];
    };

    const randomDuration = (): number => randomPosition(1, 4); // Random speed between 3s and 7s
    const randomInclination = (): number => randomPosition(-30, 30); // Random inclination between -30 and 30 degrees

    const coins = reactive(
      Array.from({ length: 10 }).map(() => ({
        style: {
          top: '-100px',
          left: `${Math.random() * window.innerWidth}px`,
          animationDuration: `${randomDuration()}s`,
          animationDirection: 'normal',
          backgroundImage: `url(${randomCoinImage()})`,
          transform: `rotate(${randomInclination()}deg)`,
        },
      }))
    );

    

    const animateCoins = () => {
      coins.forEach((coin, index) => {
        const startX = randomPosition(0, window.innerWidth - 100); // Random X start position
        const slightMovement = randomPosition(-10, 10); // Slight horizontal drift (small movement)

        // Delay for each coin based on index
        setTimeout(() => {
          // Ensure the coin starts from the top
          coin.style.left = `${startX}px`;
          coin.style.top = `-100px`; // Always start above the screen
          
          // Apply the animation for falling down
          //coin.style.transition = `top ${randomDuration()}s linear, left ${randomDuration()}s linear`; // Linear fall and slight horizontal movement
          coin.style.top = `100vh`; // Move to the bottom of the screen
          coin.style.left = `${startX + slightMovement}px`; // Slight movement left or right
        }, index * 300); // Delay each coin's fall
      });
    };


    return {
      coins,
    }
  }
});
</script>

<style scoped>
.coin {
  width: 100px;
  height: 100px;
  background-size: cover;
  border-radius: 50%;
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  animation: fall 5s linear infinite, flip 1.5s infinite;
  box-shadow: inset -5px 0 10px rgba(0,0,0,0.5),
              0 5px 10px rgba(0,0,0,0.2);
}

.coin::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(90deg, rgba(200,200,200,0.6), transparent);
  transform: translateZ(-5px);
}

@keyframes fall {
  0% {
    top: -100px;
    left: random-start();
  }
  100% {
    top: 100vh;
    left: random-end();
  }
}

@keyframes flip {
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

</style>
