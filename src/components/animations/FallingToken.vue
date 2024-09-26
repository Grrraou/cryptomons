<template>
  <div ref="container" class="falling-container">
    <img
      v-if="token"
      :style="{ top: token.y + 'px', left: token.x + 'px' }"
      class="falling-token"
      :src="token.src"
      alt="Falling Token"
      @dragover.prevent
      @click="grabToken(token.index, $event)"
    />
  </div>
</template>

<script lang="ts">
import { TokenStoreType } from '@/stores/useTokens';
import TokenManager from '@/managers/TokenManager';
import { ref, onMounted } from 'vue';
import UXManager from '@/managers/UXManager';

export default {
  props: {
    tokens: {
      type: Array as () => TokenStoreType[],
    }
  },
  setup(props) {
    const token = ref<{ id: number; index: string; x: number; y: number; speed: number; src: string } | null>(null);

    const animateToken = () => {
      if (token.value) {
        token.value.y += token.value.speed;
        
        if (token.value.y > window.innerHeight) {
          respawnToken();
        } else {
          requestAnimationFrame(animateToken);
        }
      }
    };

    const createNewToken = () => {
      const tokenStore = props.tokens[Math.floor(Math.random() * props.tokens.length)];
      token.value = {
        id: Date.now(),
        index: tokenStore.index,
        x: Math.random() * window.innerWidth,
        y: -50,
        speed: 2 + Math.random() * 5,
        src: tokenStore.getIcon(),
      };
      requestAnimationFrame(animateToken);
    };

    const respawnToken = () => {
      const respawnDelay = Math.floor(Math.random() * (60000 - 1000 + 1)) + 1000;
          
      setTimeout(() => {
        createNewToken();
      }, respawnDelay); 
    }

    const grabToken = (tokenIndex: string, event: MouseEvent) => {
      const tokenStore = TokenManager.getTokenStore(tokenIndex);
      tokenStore.balance += 1;
      UXManager.showFlyingText('+1', tokenStore.getIcon(), event.clientX, event.clientY);
    };

    onMounted(() => {
      respawnToken();
    });

    return {
      token,
      grabToken,
    };
  },
};
</script>

<style scoped>
.falling-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}

.falling-container img {
  pointer-events: auto;
}

.falling-token {
  position: absolute;
  width: 50px;
  height: 50px;
  cursor: pointer;
  animation: flip 1s infinite linear;
  border-radius: 50%;
}

/* Keyframes for flipping animation */
@keyframes flip {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
