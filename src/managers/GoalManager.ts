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

    static isThereGoalCostToPay() {
        return this.getGoals().filter(goalStore => {
            if (!goalStore.isCompleted) {
                return goalStore.costs.filter(cost => {
                    if (goalStore.canPayCost(cost.token) && !cost.isPaid) {
                        return true;
                    }
                    return false;
                }).length > 0;
            }
            return false;
        }).length > 0;
    }
}

export default GoalManager;
