<template>
  <div :style="backgroundStyle" class="goal-box" :id="refId">
    <div class="goal-header">
      <div class="goal-info">
        <h3 class="goal-name">{{ goal.name }}</h3>
        <p class="goal-description">{{ goal.description }}</p>
        <p class="goal-reward">🏅 {{ goal.reward }}</p>
      </div>
      <div>
        <img :src="goalStore.getImage()" class="goal-logo" draggable="false">
      </div>
    </div>
  
    <div v-if="!goalStore.isCompleted" class="goal-costs">
      <div v-for="(cost, index) in goal.costs" :key="index" class="cost">
        <div v-if="cost.isPaid">
          <p class="paid-message">✅ Paid</p>
        </div>
        <button
          v-else
          @click="goalStore.payCost(cost.token)"
          :disabled="!goalStore.canPayCost(cost.token)"
          class="pay-button"
        >
          <div class="cost-details">
            <p>{{ cost.value }} <img :src="getTokenIcon(cost.token)" class="token-icon" alt="Token Icon" draggable="false" /></p>
          </div>
        </button>
      </div>
    </div>
  
    <div v-else class="goal-unlocked-message goal-costs">
      <p class="unlocked-text">🎉 This Goal is Unlocked! 🎉</p>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGoalStores } from '@/stores/useGoals';
import TokenManager from '@/managers/TokenManager';
  
export default defineComponent({
  props: {
    goal: {
      type: Object as () => { 
        index: string; 
        name: string; 
        description: string; 
        costs: { token: string; value: number, isPaid: boolean }[];
        reward: string;
      },
      required: true,
    },
  },
  setup(props) {
    const goalStore = useGoalStores[props.goal.index]();
    const refId = `goal_${props.goal.index}`;
  
    const getTokenIcon = (tokenIndex: string) => {
      const tokenStore = TokenManager.getTokenStore(tokenIndex);;
      return TokenManager.getTokenIcon(tokenIndex);
    };
  
    const backgroundStyle = computed(() => ({
      backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('${goalStore.getImage()}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }));
  
    return {
      goalStore,
      getTokenIcon,
      backgroundStyle,
      refId,
    };
  },
});
</script>
  
<style scoped>
.goal-box {
  border-radius: 15px;
  border: 2px solid #ffa500;
  padding: 20px;
  margin: 15px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: black;
  text-align: center;
  min-width: 100%;
  width: 50%; /* Update this to make it full width */
}

.goal-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
}

.goal-logo {
  width: 160px;
  height: 160px;
  border: 3px solid #ffa500;
  border-radius: 33%;
  margin-left: 15px;
}

.goal-logo:hover {
  transform: scale(3);
}

.goal-header h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.goal-header p {
  font-size: 16px;
}

.goal-costs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
}

.cost-details {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  font-size: 20px;
}

.cost-details img {
  width: 20px;
  height: 20px;
  margin-bottom: -2px;
}

.token-icon {
  width: 30px;
  height: 30px;
}

.pay-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pay-button p {
  margin: 0;
}

.pay-button:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.pay-button:hover:not(:disabled) {
  background-color: #45a049;
}

.goal-unlocked {
  margin-top: 20px;
  font-size: 20px;
  color: #ffd700;
}

.paid-message {
  color: green;
  font-weight: bold;
  margin-top: 5px;
}

.goal-unlocked-message, .goal-costs {
  text-align: center;
  padding: 20px;
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 10px;
  border: 2px solid #444;
}

.unlocked-text {
  font-size: 22px;
  color: #28a745;
}

.unlocked-description {
  font-size: 16px;
  color: #333;
}

.goal-info {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 15px;
  font-weight: bold;
  border: 2px solid #444;
}

.goal-name {
  text-transform: uppercase;
}
  
.goal-reward {
  font-style: italic;
  color: #177EB2;
  font-weight: bold;
}
</style>
  