import { useTokenStores } from '@/stores/useTokens';

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

    static getTokenStore = (tokenIndex: string) => {
        return useTokenStores[tokenIndex]?.();
    };

    static getTokenIcon(tokenIndex: string) {
        const tokenStore = this.getTokenStore(tokenIndex);
        return tokenStore ? tokenStore.getIcon() : '';
    }
}

export default TokenManager;
