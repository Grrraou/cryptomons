<template>
  <div class="goals-page">
    <h1 class="page-title">Goals <InfoBubble page="goals" /></h1>
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
import InfoBubble from '@/components/InfoBubble.vue';

export default defineComponent({
  components: {
    GoalWidget,
    InfoBubble,
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
.goals-page {
  padding: 20px;
}

.goals-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0 70px;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
