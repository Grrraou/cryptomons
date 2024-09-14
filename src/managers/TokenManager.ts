import { useTokenStores } from '@/stores/useTokens';

class TokenManager {
    construct() {}

    getTokens() {
        return Object.keys(useTokenStores).map(key => useTokenStores[key]());
    }

    getTotalAssetsValue() {
        this.getTokens().reduce((total, store) => {
            return total + (store.balance * store.price);
        }, 0);
    }
}

export default TokenManager;
