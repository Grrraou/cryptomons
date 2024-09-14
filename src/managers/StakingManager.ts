import { useStakingsStores } from '@/stores/useStakings';
import TokenManager from './TokenManager';
import UXManager from './UXManager';
import AudioManager from './AudioManager';

class StakingManager {
    private autoClickerIntervals: number | null = null;

    static getStakings() {
        return Object.keys(useStakingsStores).map(key => useStakingsStores[key]());
    }

    static getStakingStore = (stakingIndex: string) => {
        return useStakingsStores[stakingIndex]?.();
    };

    startAutoStaking() {
        // Clear the existing interval if it exists
        if (this.autoClickerIntervals !== null) {
            clearInterval(this.autoClickerIntervals);
        }
    
        // Set a new interval and store its ID
        this.autoClickerIntervals = setInterval(() => {
            StakingManager.getStakings().forEach(stakingStore => {
                if (stakingStore.staked > 0 && stakingStore.getEstimatedGains() > 0) {
                    const tokenStore = TokenManager.getTokenStore(stakingStore.token);
                    const amount = stakingStore.getEstimatedGains();
                    tokenStore.balance += amount;
                    UXManager.showFlyingTextOnElement(amount.toString(), tokenStore.getIcon(), stakingStore.getDOMid(), 150);
                }
            });
            if (window.location.pathname === '/staking') {
                AudioManager.play('staking.wav', 0.2);
            }
        }, 10000);
    }
}

export default StakingManager;
