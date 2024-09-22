import { defineStore } from 'pinia'; 
import { achievementsEnum, Achievement } from '@/enums/AchievementsEnum';// Assume the AchievementsEnum is updated as in the previous message
import UXManager from '@/managers/UXManager';

export type AchievementStoreType = {
    index: string;
    title: string;
    description: string;
    target: number;
    loot: string | null;
    image: boolean;
    progress: number;
    isCompleted: boolean;
    incrementProgress: (amount: number) => void;
    completeAchievement: () => void;
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
                UXManager.showSuccess(`🎉 ${this.title} achievement UNLOCKED 🎉`);
            },
            getImage() {
                const imgPath = this.image ? `achievements/${this.index}.png` : 'achievements/default.png';
                return UXManager.getImagePath(imgPath);
            },
        },
        persist: true,
    });

    acc[achievement.index] = store as unknown as () => AchievementStoreType;
    return acc;
}, {} as Record<string, () => AchievementStoreType>);
