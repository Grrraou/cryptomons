import { defineStore } from 'pinia';
import { minesEnum, Mine, miningSoundsEnum } from '@/enums/MinesEnum';
import { useGoalStores } from './useGoals';
import { HeroStoreType } from './useHeroes';
import HeroManager from '@/managers/HeroManager';
import TokenManager from '@/managers/TokenManager';
import AudioManager from '@/managers/AudioManager';
import AchievementManager from '@/managers/AchievementManager';
import SettingsManager from '@/managers/SettingsManager';
import UXManager from '@/managers/UXManager';


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
  mineManually: (Event: MouseEvent) => void;
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
                    AchievementManager.incrementUpgradeAreaAchievements(this.index, 1);
                    token.updateBalance(-this.getUpgradeCost());
                    this.level += 1;
                }
            },
            canUpgrade(): boolean {
                const token = TokenManager.getTokenStore(this.token);
                return token.balance >= this.getUpgradeCost();
            },
            getUpgradeCost(): number {
                return ((this.level - 1) + this.level * 3);
            },
            getImage() {
                const imgPath = this.img === false ? 'mines/default.png' : `mines/${this.index}.png`;
                return UXManager.getImagePath(imgPath);
            },
            mine(amount: number|null) {
                const token = TokenManager.getTokenStore(this.token);
                token.balance += amount ?? this.getDefaultMiningAmount();

                if (window.location.hash === '#/mines') {
                    AudioManager.playRandom(miningSoundsEnum);
                }
            },
            mineManually(event: MouseEvent) {
                this.increaseClicks(1);
                const minedAmount = this.getDefaultMiningAmount();
                const tokenStore = TokenManager.getTokenStore(this.token);
                this.mine(minedAmount);
                const x = event.clientX;
                const y = event.clientY;
                UXManager.showFlyingText(minedAmount.toFixed(SettingsManager.getSettings().decimals).toString(), tokenStore.getIcon(), x, y);
            },
            getDefaultMiningAmount() {
                const randomFactor = Math.random() * 0.000001;
                const levelFactor = this.level * 0.0009;
                const miningPower = SettingsManager.getSettings().miningPower;
                const result = (randomFactor + levelFactor) * miningPower;
                return result;
            },
        },
        persist: true,
    });

    acc[mine.index] = store as unknown as () => MineStoreType;
    return acc;
}, {} as Record<string, () => MineStoreType>);
