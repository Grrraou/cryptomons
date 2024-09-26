import { defineStore } from 'pinia'; 
import { achievementsEnum, Achievement } from '@/enums/AchievementsEnum';
import UXManager from '@/managers/UXManager';
import MineManager from '@/managers/MineManager';
import ItemManager from '@/managers/ItemManager';
import BattlefieldManager from '@/managers/BattlefieldManager';
import NFTsManager from '@/managers/NFTsManager';
import SwapManager from '@/managers/SwapManager';

export type AchievementStoreType = {
    index: string;
    title: string;
    description: string;
    reference: string;
    target: number;
    loot?: string | null;
    nft?: string | null;
    image: boolean;
    progress: number;
    isCompleted: boolean;
    completeAchievement: () => void;
    getReference: () => number;
    getImage: () => string;
};

export const useAchievementStores: Record<string, () => AchievementStoreType> = achievementsEnum.reduce((acc, achievement) => {
    const store = defineStore(`achievement_${achievement.index}`, {
        state: (): Omit<Achievement, 'completeAchievement'> & { progress: number; isCompleted: boolean } => ({
            ...achievement,
            progress: 0,
            isCompleted: false,
        }),
        actions: {
            completeAchievement() {
                this.isCompleted = true;
                UXManager.showSuccess(`🎉 Achievement UNLOCKED 🎉\n ${this.title}`);
                if (this.loot) {
                    const split = this.loot.split(':');
                    ItemManager.getItemStore().lootItem(split[0], split[1]);
                }
                if (this.nft) {
                    const split = this.nft.split(':');
                    NFTsManager.getNFT(split[1]).findNFT();
                }
            },
            getReference() {
                const exploded = this.reference.split(':');
                const type = exploded[0];
                const object = exploded[1];
                const stat = exploded[2];
                switch (type) {
                    case 'mines':
                        return MineManager.getMineStore(object)[stat];
                        break;
                    case 'battlefields':
                        return BattlefieldManager.getBattlefieldStore(object)[stat];
                        break;
                    case 'swap':
                        return SwapManager.getSwap()[stat];
                        break;
                }
                return 0;
            },
            getImage() {
                let imgPath = 'achievements/locked.png';
                if (this.isCompleted) {
                    imgPath = this.image ? `achievements/${this.index}.png` : 'achievements/default.png';
                }
                
                return UXManager.getImagePath(imgPath);
            },
        },
        persist: true,
    });

    acc[achievement.index] = store as unknown as () => AchievementStoreType;
    return acc;
}, {} as Record<string, () => AchievementStoreType>);
