import { defineStore } from 'pinia';
import { Goal, goalsEnum } from '@/enums/GoalsEnum';
import TokenManager from '@/managers/TokenManager';
import AudioManager from '@/managers/AudioManager';
import UXManager from '@/managers/UXManager';

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

export const useGoalStores: Record<string, () => GoalStoreType> = goalsEnum.reduce((acc, goal) => {
  const store = defineStore(`goal_${goal.index}`, {
    state: (): Omit<Goal, 'completeGoal' | 'payCost'> & { isCompleted: boolean } => ({
      ...goal,
      isCompleted: false,
    }),
    actions: {
      completeGoal() {
        this.isCompleted = true;
        AudioManager.play('goal.wav');
      },
      isCostPaid(tokenIndex: string): boolean {
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
        
        if (isFullyPaid) {
          this.completeGoal();
        }
      },
      getImage() {
        const imgPath = this.img === false ? 'goals/default.png' : `goals/${this.index}.png`;
        return UXManager.getImagePath(imgPath);
      },
    },
    persist: true,
  });

  acc[goal.index] = store as unknown as () => GoalStoreType;
  return acc;
}, {} as Record<string, () => GoalStoreType>);