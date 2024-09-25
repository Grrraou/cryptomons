import { useSwapStore } from '@/stores/useSwap';

class SwapManager {

    static getSwap() {
        return useSwapStore();
    }
}

export default SwapManager;
