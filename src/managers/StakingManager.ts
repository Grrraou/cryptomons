import { useStakingsStores } from '@/stores/useStakings';
import TokenManager from './TokenManager';
import UXManager from './UXManager';
import AudioManager from './AudioManager';
import SettingsManager from './SettingsManager';

class StakingManager {
    private autoClickerIntervals: number | null = null;

    static getStakings() {
        return Object.keys(useStakingsStores).map(key => useStakingsStores[key]());
    }

    static getStakingStore = (stakingIndex: string) => {
        return useStakingsStores[stakingIndex]?.();
    };

    startAutoStaking(interval: number = 10000) {
        // Clear the existing interval if it exists
        if (this.autoClickerIntervals !== null) {
            clearInterval(this.autoClickerIntervals);
        }
    
        // Set a new interval and store its ID
        this.autoClickerIntervals = setInterval(() => {
            let isThereStaked = false;
            StakingManager.getStakings().forEach(stakingStore => {
                if (stakingStore.staked > 0 && stakingStore.getEstimatedGains() > 0) {
                    isThereStaked = true;
                    const tokenStore = TokenManager.getTokenStore(stakingStore.token);
                    const amount = stakingStore.getEstimatedGains();
                    tokenStore.balance += amount;
                    UXManager.showFlyingTextOnElement(
                        amount.toFixed(SettingsManager.getSettings().decimals).toString(), tokenStore.getIcon(), stakingStore.getDOMid(), 150
                    );
                }
            });
            if (window.location.hash === '#/staking' && isThereStaked) {
                AudioManager.play('staking.wav');
            }
        }, interval) as unknown as number;
    }
}

export default StakingManager;
