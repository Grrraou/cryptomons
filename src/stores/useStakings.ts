import { defineStore } from 'pinia';
import { Staking, stakingsEnum } from '@/enums/StakingsEnum';
import GoalManager from '@/managers/GoalManager';
import TokenManager from '@/managers/TokenManager';
import UXManager from '@/managers/UXManager';

export type StakingStoreType = {
    index: string;
    name: string;
    token: string;
    apr: number;
    requirement: string | null;
    staked: number;
    earned: number,
    isUnlocked: () => boolean;
    stakeTokens: (amount: number) => void;
    getEstimatedGains: () => number;
    getImage: () => string;
    getDOMid: () => string;
};

export const useStakingsStores: Record<string, () => StakingStoreType> = stakingsEnum.reduce((acc, staking) => {
    const store = defineStore(`staking_${staking.index}`, {
        state: (): Staking & { staked: number; earned: number } => ({
            ...staking,
            staked: 0,
            earned: 0,
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
                const imgPath = this.img === false ? 'stakings/default.png' : `stakings/${this.index}.png`;
                return UXManager.getImagePath(imgPath);
            },
            getDOMid() {
                return `staking-widget-${this.index}`;
            },
        },
        persist: true,
    });

  acc[staking.index] = store as unknown as () => StakingStoreType;
  return acc;
}, {} as Record<string, () => StakingStoreType>);
