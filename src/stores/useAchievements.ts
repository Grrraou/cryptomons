import { defineStore } from 'pinia'; 
import { achievementsEnum, Achievement } from '@/enums/AchievementsEnum';// Assume the AchievementsEnum is updated as in the previous message
import UXManager from '@/managers/UXManager';
import MineManager from '@/managers/MineManager';

export type AchievementStoreType = {
    index: string;
    title: string;
    description: string;
    reference: string;
    target: number;
    loot: string | null;
    image: boolean;
    progress: number;
    isCompleted: boolean;
    incrementProgress: (amount: number) => void;
    completeAchievement: () => void;
    getReference: () => number;
    getImage: () => string;
};

export const useAchievementStores: Record<string, () => AchievementStoreType> = achievementsEnum.reduce((acc, achievement) => {
    const store = defineStore(`achievement_${achievement.index}`, {
        state: (): Omit<Achievement, 'incrementProgress' | 'completeAchievement'> & { progress: number; isCompleted: boolean } => ({
            ...achievement,
            progress: 0,
            isCompleted: false,
        }),
        actions: {
            incrementProgress(amount: number) {
                if (!this.isCompleted) {
                    this.progress = Math.min(this.progress + amount, this.target);
                    if (this.progress >= this.target) {
                        this.completeAchievement();
                    }
                }
            },
            completeAchievement() {
                this.isCompleted = true;
                UXManager.showSuccess(`🎉 Achievement UNLOCKED 🎉\n ${this.title}`);
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
