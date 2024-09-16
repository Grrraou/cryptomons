import { defineStore } from 'pinia';
import { minesEnum, Mine, miningSoundsEnum } from '@/enums/MinesEnum';
import { useGoalStores } from './useGoals';
import { HeroStoreType, useHeroStores } from './useHeroes';
import HeroManager from '@/managers/HeroManager';
import TokenManager from '@/managers/TokenManager';
import AudioManager from '@/managers/AudioManager';
import AchievementManager from '@/managers/AchievementManager';

type MineStoreType = {
  index: string;
  name: string;
  token: string;
  requirement: string | null;
  clicks: number;
  level: number;
  isUnlocked: () => boolean,
  getHeroes: () => HeroStoreType[];
  increaseClicks: (amount: number) => void;
  upgrade: () => void;
  canUpgrade: () => boolean;
  getUpgradeCost: () => number;
  getImage: () => string;
  mine: (mount: number|null) => void;
  getDefaultMiningAmount: () => number;
};

export const useMinesStores: Record<string, () => MineStoreType> = minesEnum.reduce((acc, mine) => {
    const store = defineStore(`mine_${mine.index}`, {
        state: (): Mine & { clicks: number; level: number } => ({
        ...mine,
        clicks: 0,
        level: 1,
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
                AchievementManager.incrementClickAreaAchievements(this.index, amount);
            },
            upgrade() {
                if (this.canUpgrade()) {
                    const token = TokenManager.getTokenStore(this.token);
                    this.level += 1;
                    AchievementManager.incrementUpgradeAreaAchievements(this.index, 1);
                    token.balance -= this.getUpgradeCost();
                }
            },
            canUpgrade(): boolean {
                const token = TokenManager.getTokenStore(this.token);
                return token.balance >= this.getUpgradeCost();
            },
            getUpgradeCost(): number {
                // Define the logic for calculating the upgrade cost
                return this.level * this.level * 10; // Example: cost increases with the level
            },
            getImage() {
                const imgPath = this.image ? `/mines/${this.index}.png` : '/mines/default.png';
                return new URL(imgPath, import.meta.url).href;
            },
            mine(amount: number|null) {
                const token = TokenManager.getTokenStore(this.token);
                token.balance += amount ?? this.getDefaultMiningAmount();
                if (window.location.pathname === '/mines') {
                    AudioManager.playRandom(miningSoundsEnum);
                }
            },
            getDefaultMiningAmount() {
                return (Math.random() * (this.level) * (0.0009 - 0.000001) + 0.000001);
            },
        },
        persist: true,
    });

    acc[mine.index] = store as unknown as () => MineStoreType;
    return acc;
}, {} as Record<string, () => MineStoreType>);
