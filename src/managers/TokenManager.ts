import { TokenStoreType, useTokenStores } from '@/stores/useTokens';

class TokenManager {
    construct() {}

    static getTokens() {
        return Object.keys(useTokenStores).map(key => useTokenStores[key]());
    }
    
    static getTotalAssetsValue() {
        return this.getTokens().reduce((total, store) => {
            return total + (store.balance * store.price);
        }, 0);
    }

    static getTokenStore(tokenIndex: string): TokenStoreType  {
        return useTokenStores[tokenIndex]?.();
    };

    static getTokenIcon(tokenIndex: string) {
        const tokenStore = this.getTokenStore(tokenIndex);
        return tokenStore ? tokenStore.getIcon() : '';
    }

    static calculateSwapReturn(fromToken, toToken) {
        const swapFees = 0.05;
    }
}

export default TokenManager;
