import { useGoalStores } from '@/stores/useGoals';

class GoalManager {
    construct() {}

    static getGoals() {
        return Object.keys(useGoalStores).map(key => useGoalStores[key]());
    }

    static getGoalStore (goalIndex: string) {
        return useGoalStores[goalIndex]?.();
    }

    static isGoalReached(goalIndex: string) {
        const goalStore = this.getGoalStore(goalIndex);
        return goalStore ? goalStore.isCompleted : false;
    }
}

export default GoalManager;
