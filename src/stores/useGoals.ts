import { defineStore } from 'pinia';
import { Goal, goalsEnum } from '@/enums/GoalsEnum';
import TokenManager from '@/managers/TokenManager';

// Define stores for each goal but do not create them yet
export type GoalStoreType = {
  index: string;
  name: string;
  description: string;
  costs: { token: string; value: number; isPaid: boolean }[];
  reward: string;
  isCompleted: boolean;
  canPayCost(tokenIndex: string): boolean;
  payCost: (tokenIndex: string) => void;
  completeGoal: () => void;
  getImage: () => string;
};

// Create a map of store functions
export const useGoalStores: Record<string, () => GoalStoreType> = goalsEnum.reduce((acc, goal) => {
  const store = defineStore(`goal_${goal.index}`, {
    state: (): Omit<Goal, 'completeGoal' | 'payCost'> & { isCompleted: boolean } => ({
      ...goal,
      isCompleted: false, // Initialize isCompleted to false
    }),
    actions: {
      completeGoal() {
        this.isCompleted = true;
        // Additional logic for when the goal is completed
      },
      isCostPaid(tokenIndex: string): boolean {
        // Check if the cost for the given token index is paid
        const cost = this.costs.find(cost => cost.token === tokenIndex);
        return cost ? cost.isPaid : false;
      },
      canPayCost (tokenIndex: string) {
        const tokenStore = TokenManager.getTokenStore(tokenIndex);
        const cost = this.costs.find(cost => cost.token === tokenIndex);
        return tokenStore && cost ? tokenStore.balance >= cost.value : false;
      },
      payCost(tokenIndex: string) {
        let isFullyPaid = true;
        // Mark the cost for the specified token as paid
        
        this.costs.forEach(cost => {
          if (cost.token === tokenIndex && !cost.isPaid && this.canPayCost(tokenIndex)) {
            cost.isPaid = true;
            const tokenStore = TokenManager.getTokenStore(tokenIndex);
            tokenStore.updateBalance(-cost.value)
          }
          if (!cost.isPaid) {
            isFullyPaid = false;
          }
        });

        // Check if all costs are paid
        if (isFullyPaid) {
          this.completeGoal();
        }
      },
      getImage() {
        const imgPath = this.image ? `/public/goals/${this.index}.png` : '/public/goals/default.png';
        return new URL(imgPath, import.meta.url).href;
      },
    },
    persist: true, // Enable persistence for each store
  });

  // Return the store with type assertion for autocompletion
  acc[goal.index] = store as unknown as () => GoalStoreType;
  return acc;
}, {} as Record<string, () => GoalStoreType>);