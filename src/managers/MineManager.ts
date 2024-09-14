import { useMinesStores } from "@/stores/useMines";
import HeroManager from "./HeroManager";

class MineManager {
    private autoClickerIntervals: number | null = null;

    static getMines() {
        return Object.keys(useMinesStores).map(key => useMinesStores[key]());
    }

    static getMineStore(mineIndex: string) {
        return useMinesStores[mineIndex]?.();
    };

    startAutoMining() {
        // Clear the existing interval if it exists
        if (this.autoClickerIntervals !== null) {
            clearInterval(this.autoClickerIntervals);
        }
    
        // Set a new interval and store its ID
        this.autoClickerIntervals = setInterval(() => {
            MineManager.getMines().forEach(mineStore => {
                mineStore.getHeroes().forEach(hero => {
                    const heroStore = HeroManager.getHeroStore(hero.index);
                    let amount = heroStore.miningPower * mineStore.getDefaultMiningAmount();
                    mineStore.mine(amount);
                    heroStore.gainXp(null);
                });
            });
        }, 10000);
    }
}

export default MineManager;
