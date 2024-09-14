import { defineStore } from 'pinia';
import { heroesEnum, Hero } from "@/enums/HeroesEnum";
import { useGoalStores } from './useGoals';

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
    gainXp: (amount: number) => void;
    levelUp: () => void;
    getPicture: () => string;
    isWorkingThere: (areaIndex: string) => boolean,
    isFree: () => boolean;
    isUnlocked: () => boolean;
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
        gainXp(amount: number) {
          this.xp += amount;
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
      },
      persist: true, // Enable persistence for each store
    });
  
    // Return the store with type assertion for autocompletion
    acc[hero.index] = store as unknown as () => HeroStoreType;
    return acc;
  }, {} as Record<string, () => HeroStoreType>);