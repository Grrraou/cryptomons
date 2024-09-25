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
}

export default AchievementManager;
