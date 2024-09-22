import { defineStore } from 'pinia';
import { battlefieldsEnum, Battlefield, attackSoundsEnum } from '@/enums/BattlefieldsEnum'; // Adjust the import path accordingly
import { useGoalStores } from './useGoals';
import { Monster } from '@/enums/MonstersEnum';
import BattlefieldManager from '@/managers/BattlefieldManager';
import AudioManager from '@/managers/AudioManager';
import HeroManager from '@/managers/HeroManager';
import { HeroStoreType } from './useHeroes';
import ItemManager from '@/managers/ItemManager';
import UXManager from '@/managers/UXManager';
import SettingsManager from '@/managers/SettingsManager';

type BattlefieldStoreType = {
    index: string;
    name: string;
    requirement: string | null;
    monsters: string[];
    image: boolean;
    currentMonster: Monster;
    defaultDamage: number,
    isUnlocked: () => boolean;
    getRequirementDescription: () => string | null;
    getImage: () => string;
    getHeroes: () => HeroStoreType[];
    setMonster: () => string;
    getRandomMonster: () => Object;
    getMonsterImage: () => string;
    damageMonster: (amount: number) => void;
    lootMonster: () => void;
    getDefaultDamage: () => number;
};

export const useBattlefieldsStores: Record<string, () => BattlefieldStoreType> = battlefieldsEnum.reduce((acc, battlefield) => {
    const store = defineStore(`battlefield_${battlefield.index}`, {
        state: (): Omit<Battlefield, 'currentMonster'> & { currentMonster: Monster, defaultDamage: number } => ({
            ...battlefield,
            currentMonster: BattlefieldManager.getMonster(battlefield.monsters[0]) as Monster,
            defaultDamage: 1,
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
                const imgPath = this.image === false ? 'battlefields/default.png' : `battlefields/${this.index}.png`;
                return UXManager.getImagePath(imgPath);
            },
            getHeroes() {
                return HeroManager.getHeroByArea(this.index);
            },
            setMonster() {
                const monster = this.getRandomMonster();
                const randomness = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
                monster.health = randomness * monster.power;
                this.currentMonster = monster;
            },
            getRandomMonster() {
                const randomIndex = Math.floor(Math.random() * this.monsters.length);
                const monster = BattlefieldManager.getMonster(this.monsters[randomIndex]);
                return { ...monster } as Monster;
            },
            getMonsterImage() {
                const imgPath = `monsters/${this.currentMonster.index}.png`;
                return UXManager.getImagePath(imgPath);
            },
            damageMonster(amount: number) {
                if (this.currentMonster.health) {
                    this.currentMonster.health -= amount;
                    AudioManager.playRandom(attackSoundsEnum, 0.5);
                    if (this.currentMonster.health <= 0) {
                        this.lootMonster();
                        this.setMonster();
                    }
                } else {
                    this.setMonster();
                }
            },
            lootMonster() {
                const loot = this.currentMonster.loot;
                if (loot) {
                    const chance = Math.random();
                    if (chance < (loot.ratio * SettingsManager.getSettings().lootPower)) {
                        const item = ItemManager.generateLoot(loot.index);
                        if (item) {
                            const itemStore = ItemManager.getItemStore();
                            itemStore.addItemToInventory(item);
                            UXManager.showSuccess(`🎁 looted: ${item.name}`);
                        }
                    }
                }
            },
            getDefaultDamage() {
                return SettingsManager.getSettings().battlePower;
            }
        },
        persist: true,
    });

    acc[battlefield.index] = store as unknown as () => BattlefieldStoreType;
    return acc;
}, {} as Record<string, () => BattlefieldStoreType>);
