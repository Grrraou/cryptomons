<template>
  <div class="goals-page">
    <h1 class="page-title">Goals <InfoBubble page="goals" /></h1>
    <TutorialComponent name="goalsTutorial"></TutorialComponent>

    <div class="filters">
      <label>
        <input type="checkbox" v-model="hideUnlocked" @click="SettingsManager.getSettings().goalsHideUnlocked = !hideUnlocked" /> Hide Unlocked Goals
      </label>
      <label>
        <input type="checkbox" v-model="hideUnpayable" @click="SettingsManager.getSettings().goalsHideUnpayable = !hideUnpayable" /> Hide Unpayable Goals
      </label>
    </div>

    <div class="goals-container">
      <div v-for="goal in filteredGoals" :key="goal.index">
        <GoalWidget :goal="goal" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useGoalStores } from '@/stores/useGoals';
import GoalWidget from '@/components/GoalWidget.vue';
import InfoBubble from '@/components/InfoBubble.vue';
import SettingsManager from '@/managers/SettingsManager';
import TutorialComponent from '@/components/TutorialComponent.vue';

export default defineComponent({
  components: {
    GoalWidget,
    InfoBubble,
    TutorialComponent,
  },
  setup() {
    const goals = computed(() => Object.keys(useGoalStores).map(key => useGoalStores[key]()));

    // Filters
    const hideUnlocked = ref(SettingsManager.getSettings().goalsHideUnlocked);
    const hideUnpayable = ref(SettingsManager.getSettings().goalsHideUnpayable);

    // Computed goals list with filters applied
    const filteredGoals = computed(() => {
      return goals.value.filter(goal => {
        const isUnpayable = goal.costs.some(cost => !goal.canPayCost(cost.token));
        if (hideUnlocked.value && goal.isCompleted) {
          return false;
        }
        if (hideUnpayable.value && isUnpayable) {
          return false;
        }
        return true;
      });
    });

    return {
      filteredGoals,
      hideUnlocked,
      hideUnpayable,
      SettingsManager,
    };
  },
});
</script>

<style scoped>
input {
  margin: 0;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.filters label {
  font-size: 14px;
  color: #333;
}

.filters input[type="checkbox"] {
  margin-right: 8px;
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
