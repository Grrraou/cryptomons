<template>
  <div class="goals-page">
    <h1 class="page-title">Goals /* <InfoBubble page="goals" /> */</h1>
    <div class="goals-container">
      <div v-for="goal in goals" :key="goal.index">
        <GoalWidget :goal="goal" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGoalStores } from '@/stores/useGoals';
import GoalWidget from '@/components/GoalWidget.vue';
//import InfoBubble from '@/components/InfoBubble.vue';

export default defineComponent({
  components: {
    GoalWidget,
    //InfoBubble,
  },
  setup() {
    // Retrieve all goal stores
    const goals = computed(() => Object.keys(useGoalStores).map(key => useGoalStores[key]()));

    return {
      goals,
    };
  },
});
</script>

<style scoped>
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

.goals-page {
  padding: 20px;
}

.goals-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0 70px;
  align-items: flex-start;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
