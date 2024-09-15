import { useGoalStores } from '@/stores/useGoals';

class GoalManager {
    construct() {}

    static getGoals() {
        return Object.keys(useGoalStores).map(key => useGoalStores[key]());
    }

    static getGoalStore (goalIndex: string) {
        return useGoalStores[goalIndex]?.();
    }
}

export default GoalManager;
