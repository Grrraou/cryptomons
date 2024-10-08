import { useMinesStores } from "@/stores/useMines";
import SettingsManager from "./SettingsManager";
import UXManager from "./UXManager";
import TokenManager from "./TokenManager";
import NFTsManager from "./NFTsManager";

class MineManager {
    private autoClickerIntervals: number | null = null;

    static getMines() {
        return Object.keys(useMinesStores).map(key => useMinesStores[key]());
    }

    static getMineStore(mineIndex: string) {
        return useMinesStores[mineIndex]?.();
    };

    startAutoMining(interval: number = 5000) {
        // Clear the existing interval if it exists
        if (this.autoClickerIntervals !== null) {
            clearInterval(this.autoClickerIntervals);
        }
    
        // Set a new interval and store its ID
        this.autoClickerIntervals = setInterval(() => {
            MineManager.getMines().forEach(mineStore => {
                mineStore.getHeroes().forEach(heroStore => {
                    const tokenStore = TokenManager.getTokenStore(mineStore.token);
                    let amount = heroStore.miningPower * mineStore.getDefaultMiningAmount();
                    mineStore.mine(amount);
                    heroStore.gainXp(null);
                    UXManager.showFlyingTextOnElement(amount.toFixed(SettingsManager.getSettings().decimals).toString(), tokenStore.getIcon(), heroStore.getDOMid());
                });
            });
        }, interval / ((NFTsManager.isCollectionCompleted('crypto_hoboes')) ? 2 : 1)) as unknown as number;
    }
}

export default MineManager;
