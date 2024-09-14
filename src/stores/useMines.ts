// src/stores/mineStore.ts
import { defineStore } from 'pinia';
import { minesEnum, Mine } from '@/enums/MinesEnum'; // Adjust the import path accordingly
import { useGoalStores } from './useGoals';
import { useHeroStores } from './useHeroes';
import HeroManager from '@/managers/HeroManager';
import TokenManager from '@/managers/TokenManager';

type MineStoreType = {
  index: string;
  name: string;
  token: string;
  requirement: string | null;
  clicks: number;
  level: number;
  isUnlocked: () => boolean,
  getHeroes: () => any[];
  increaseClicks: (amount: number) => void;
  upgrade: () => void;
  canUpgrade: () => boolean;
  getUpgradeCost: () => number;
  getImage: () => string;
  mine: () => void;
};

// Create a map of store functions for mines
export const useMinesStores: Record<string, () => MineStoreType> = minesEnum.reduce((acc, mine) => {
    const store = defineStore(`mine_${mine.index}`, {
        state: (): Mine & { clicks: number; level: number } => ({
        ...mine,
        clicks: 0,   // Initialize clicks
        level: 1,    // Initialize level
        }),
        actions: {
            isUnlocked() {
                if (!this.requirement) return true;
                const goalStore = useGoalStores[this.requirement]();
                return goalStore.isCompleted;
            },
            getHeroes() {
                return HeroManager.getHeroByArea(this.index);
            },
            increaseClicks(amount: number) {
                this.clicks += amount;
            },
            upgrade() {
                if (this.canUpgrade()) {
                    const token = TokenManager.getTokenStore(this.token);
                    this.level += 1;
                    token.balance -= this.getUpgradeCost();
                }
            },
            canUpgrade(): boolean {
                const token = TokenManager.getTokenStore(this.token);
                return token.balance >= this.getUpgradeCost();
            },
            getUpgradeCost(): number {
                // Define the logic for calculating the upgrade cost
                return this.level * this.level * 100; // Example: cost increases with the level
            },
            getImage() {
                const imgPath = this.image ? `/public/mines/${this.index}.png` : '/public/mines/default.png';
                return new URL(imgPath, import.meta.url).href;
            },
            mine() {
                const token = TokenManager.getTokenStore(this.token);
                token.balance += 1;
            },
        },
        persist: true, // Enable persistence for each store if needed
    });

    // Return the store with type assertion for autocompletion
    acc[mine.index] = store as unknown as () => MineStoreType;
    return acc;
}, {} as Record<string, () => MineStoreType>);
