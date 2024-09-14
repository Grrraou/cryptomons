import { defineStore } from 'pinia';
import { heroesEnum, Hero } from "@/enums/HeroesEnum";
import { useGoalStores } from './useGoals';
import UXManager from '@/managers/UXManager';

type HeroStoreType = {
    index: string;
    name: string;
    requirement: string;
    baseBattlePower: number;
    baseMiningPower: number;
    battlePower: number;
    miningPower: number;
    location: string;
    xp: number;
    level: number;
    gainXp: (amount: number|null) => void;
    levelUp: () => void;
    getPicture: () => string;
    isWorkingThere: (areaIndex: string) => boolean,
    isFree: () => boolean;
    isUnlocked: () => boolean;
    getDOMid: () => string;
  };
  
  // Create a map of store functions
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
          amount = amount ?? parseInt((Math.random() * (5 - 1) + 1).toFixed(0));
          this.xp += amount;
          UXManager.showFlyingTextOnElement(amount.toString(), '/public/xp.png', this.getDOMid(), 50);
        },
        levelUp() {
            this.xp = 0;
            this.battlePower += this.baseBattlePower;
            this.miningPower += this.baseMiningPower;
            this.level += 1;
        },
        getPicture() {
            const imgPath = `/public/heroes/${this.index}.png`;
            return new URL(imgPath, import.meta.url).href;
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
  
    // Return the store with type assertion for autocompletion
    acc[hero.index] = store as unknown as () => HeroStoreType;
    return acc;
  }, {} as Record<string, () => HeroStoreType>);