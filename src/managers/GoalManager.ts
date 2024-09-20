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
        //let thereAre = false;
        return this.getGoals().filter(goalStore => {
            if (!goalStore.isCompleted) {
                //console.log('not completeted' + goalStore.index)
                return goalStore.costs.filter(cost => {
                    //console.log(cost.token + ': ' + goalStore.canPayCost(cost.token) + ' - ' + !cost.isPaid)
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
