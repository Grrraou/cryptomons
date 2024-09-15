import { useAchievementStores } from "@/stores/useAchievements";

class AchievementManager {

    static getAchievements() {
        return Object.keys(useAchievementStores).map(key => useAchievementStores[key]());
    }

    static getAchievementStore (achievementIndex: string) {
        return useAchievementStores[achievementIndex]?.();
    }

    static getAchievementsByPattern(pattern: string) {
        const regExp = new RegExp(pattern);
    
        // Filter the keys in useAchievementStores and return the matched stores
        return Object.keys(useAchievementStores)
          .filter(key => regExp.test(key))
          .map(key => useAchievementStores[key]());
    }

    static incrementClickAreaAchievements(areaIndex: string, amount: number) {
        const regex = `^clicks_area_${areaIndex}_\\d+$`;
        const achievements = this.getAchievementsByPattern(regex);
        achievements.forEach(achievementStore => {
            achievementStore.incrementProgress(amount);
        });
    }

    static incrementUpgradeAreaAchievements(areaIndex: string, amount: number) {
        const regex = `^upgrade_area_${areaIndex}_\\d+$`;
        const achievements = this.getAchievementsByPattern(regex);
        achievements.forEach(achievementStore => {
            achievementStore.incrementProgress(amount);
        });
    }
}

export default AchievementManager;
