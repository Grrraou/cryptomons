import { defineStore } from 'pinia';
import { heroesEnum, Hero } from "@/enums/HeroesEnum";
import { useGoalStores } from './useGoals';
import UXManager from '@/managers/UXManager';
import TokenManager from '@/managers/TokenManager';
import ItemManager from '@/managers/ItemManager';
import SettingsManager from '@/managers/SettingsManager';

export type HeroStoreType = {
  index: string;
  name: string;
  token: string;
  requirement: string;
  baseBattlePower: number;
  baseMiningPower: number;
  battlePower: number;
  miningPower: number;
  location: string;
  xp: number;
  level: number;
  gainXp: (amount: number|null) => void;
  getXpToLevel: () => number;
  levelUp: () => void;
  canLevelUp: () => boolean;
  canBuyLevelUp: () => boolean;
  getLevelUpCost: () => number;
  getPicture: () => string;
  isWorkingThere: (areaIndex: string) => boolean,
  isFree: () => boolean;
  isUnlocked: () => boolean;
  getDOMid: () => string;
};
  
export const useHeroStores: Record<string, () => HeroStoreType> = heroesEnum.reduce((acc, hero) => {
  const store = defineStore(`hero_${hero.index}`, {
    state: (): Omit<Hero, 'xp' | 'level'> & { battlePower: number; miningPower: number; location: string; xp: number; level: number } => ({
      ...hero,
      battlePower: hero.baseBattlePower,
      miningPower: hero.baseMiningPower,
      location: 'free',
      xp: 0,
      level: 1,
    }),
    actions: {
      gainXp(amount: number|null = null) {
        if (!this.canLevelUp()) {
          amount = amount ?? 1;
          amount *= 1 + (ItemManager.getItemStore().getEquipementStats().xp / 100);
          amount *= SettingsManager.getSettings().xpPower;
          this.xp += amount;
          if (this.xp > this.getXpToLevel()) {
            this.xp = this.getXpToLevel();
          }
          UXManager.showFlyingTextOnElement(amount.toString(), '/xp.png', this.getDOMid(), 50);
        }
      },
      getXpToLevel() {
        return this.level * this.level * 100;
      },
      canBuyLevelUp() {
        const tokenStore = TokenManager.getTokenStore(this.token);
        return this.getLevelUpCost() <= tokenStore.balance;
      },
      levelUp() {
        if (this.canLevelUp() && this.canBuyLevelUp()) {
          const tokenStore = TokenManager.getTokenStore(this.token);
          tokenStore.updateBalance(-this.getLevelUpCost());
          this.xp = 0;
          this.battlePower += this.baseBattlePower;
          this.miningPower += this.baseMiningPower;
          this.level += 1;
          UXManager.showFlyingTextOnElement('↑ level up ↑', null, this.getDOMid(), 50);
        }
      },
      canLevelUp() {
        return this.getXpToLevel() <= this.xp;
      },
      getLevelUpCost() {
        return this.level * this.level;
      },
      getPicture() {
        const imgPath = `heroes/${this.index}.png`;
        return UXManager.getImagePath(imgPath);
      },
      isWorkingThere(areaIndex: string) {
        return this.location === areaIndex;
      },
      isFree() {
        return this.location === 'free';
      },
      isUnlocked() {
        const goalStore = useGoalStores[this.requirement]();
        return goalStore.isCompleted;
      },
      getDOMid() {
        return `hero-thumb-${this.index}`;
      }
    },
    persist: true,
  });

  acc[hero.index] = store as unknown as () => HeroStoreType;
  return acc;
}, {} as Record<string, () => HeroStoreType>);