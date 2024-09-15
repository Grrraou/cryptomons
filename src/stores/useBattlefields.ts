import { defineStore } from 'pinia';
import { battlefieldsEnum, Battlefield, attackSoundsEnum } from '@/enums/BattlefieldsEnum'; // Adjust the import path accordingly
import { useGoalStores } from './useGoals';
import { Monster } from '@/enums/MonstersEnum';
import BattlefieldManager from '@/managers/BattlefieldManager';
import AudioManager from '@/managers/AudioManager';
import HeroManager from '@/managers/HeroManager';
import { Hero } from '@/enums/HeroesEnum';
import { HeroStoreType } from './useHeroes';

type BattlefieldStoreType = {
    index: string;
    name: string;
    requirement: string | null;
    image: boolean;
    currentMonster: Monster;
    isUnlocked: () => boolean;
    getRequirementDescription: () => string | null;
    getImage: () => string;
    getHeroes: () => HeroStoreType[];
    setMonster: () => string;
    damageMonster: (amount: number) => void;
    getDefaultDamage: () => number;
};

export const useBattlefieldsStores: Record<string, () => BattlefieldStoreType> = battlefieldsEnum.reduce((acc, battlefield) => {
    const store = defineStore(`battlefield_${battlefield.index}`, {
        state: (): Omit<Battlefield, 'currentMonster'> & { currentMonster: Monster } => ({
            ...battlefield,
            currentMonster: BattlefieldManager.getRandomMonster(),
        }),
        actions: {
            isUnlocked() {
                if (!this.requirement) return true;
                const goalStore = useGoalStores[this.requirement]();
                return goalStore.isCompleted;
            },
            getRequirementDescription() {
                if (!this.requirement) return null;
                const goalStore = useGoalStores[this.requirement]();
                return goalStore ? goalStore.name : null;
            },
            getImage() {
                const imgPath = this.image ? `/battlefields/${this.index}.png` : '/battlefields/default.png';
                return new URL(imgPath, import.meta.url).href;
            },
            getHeroes() {
                return HeroManager.getHeroByArea(this.index);
            },
            setMonster() {
                const monster = BattlefieldManager.getRandomMonster();
                monster.health = 100 * monster.power;
                this.currentMonster = monster;
            },
            damageMonster(amount: number) {
                if (this.currentMonster.health) {
                    this.currentMonster.health -= amount;
                    AudioManager.playRandom(attackSoundsEnum, 0.5);
                    if (this.currentMonster.health <= 0) {
                        this.setMonster();
                    }
                } else {
                    this.setMonster();
                }
            },
            getDefaultDamage() {
                return 1;
            }
        },
        persist: true,
});

    // Return the store with type assertion for autocompletion
    acc[battlefield.index] = store as unknown as () => BattlefieldStoreType;
    return acc;
}, {} as Record<string, () => BattlefieldStoreType>);
