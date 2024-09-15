import { defineStore } from 'pinia';
import { stakingsEnum } from '@/enums/StakingsEnum';
import GoalManager from '@/managers/GoalManager';
import TokenManager from '@/managers/TokenManager';

export type StakingStoreType = {
    index: string;
    name: string;
    token: string;
    apr: number;
    requirement: string | null;
    staked: number;
    isUnlocked: () => boolean;
    stakeTokens: (amount: number) => void;
    getEstimatedGains: () => number;
    getImage: () => string;
    getDOMid: () => string;
};

// Create a map of store functions
export const useStakingsStores: Record<string, () => StakingStoreType> = stakingsEnum.reduce((acc, staking) => {
    const store = defineStore(`staking_${staking.index}`, {
        state: () => ({
            ...staking,
            staked: 0,
        }),
        actions: {
            isUnlocked() {
                if (!this.requirement) return true;

                const goal = GoalManager.getGoalStore(this.requirement);
                return goal && goal.isCompleted;
            },
            stakeTokens(amount: number) {
                const token = TokenManager.getTokenStore(this.token);
                if (token.balance >= amount) {
                    token.balance -= amount;
                    this.staked += amount;
                }
            },
            getEstimatedGains() {
                return this.apr * this.staked;
            },
            getImage() {
                const imgPath = this.image ? `/stakings/${this.index}.png` : '/stakings/default.png';
                return new URL(imgPath, import.meta.url).href;
            },
            getDOMid() {
                return `staking-widget-${this.index}`;
            }
        },
        persist: true,
    });

  // Return the store with type assertion for autocompletion
  acc[staking.index] = store as unknown as () => StakingStoreType;
  return acc;
}, {} as Record<string, () => StakingStoreType>);
