import { useSettingsStore } from '@/stores/useSettings';
import { useSwapStore } from '@/stores/useSwap';
import { TokenStoreType, useTokenStores } from '@/stores/useTokens';

class TokenManager {
    construct() {}

    static getTokens() {
        return Object.keys(useTokenStores).map(key => useTokenStores[key]());
    }

    static getTokenStore(tokenIndex: string): TokenStoreType  {
        return useTokenStores[tokenIndex]?.();
    };

    static getReferenceTokenStore() {
        const settings = useSettingsStore();
        return TokenManager.getTokenStore(settings.referenceTokenIndex);
    }

    static getSwapStore() {
        const swapStore = useSwapStore();
        swapStore.amount = 0;
        swapStore.swapResult = 0;
        return swapStore;
    }

    static getTokensOrderedByBalance() {
        return this.getTokens().slice().sort((a, b) => b.balance - a.balance);
    }

    static getAssetValue(tokenIndex: string) {
        const tokenStore = this.getTokenStore(tokenIndex);
        const totalInCryptoDollars = tokenStore.balance * tokenStore.price;
        return totalInCryptoDollars / TokenManager.getReferenceTokenStore().price;
    }
    
    static getTotalAssetsValue() {
        return this.getTokens().reduce((total, store) => {
            return total + this.getAssetValue(store.index);
        }, 0);
    }

    static getTokenIcon(tokenIndex: string) {
        const tokenStore = this.getTokenStore(tokenIndex);
        return tokenStore ? tokenStore.getIcon() : '';
    }
}

export default TokenManager;
