import { useMinesStores } from "@/stores/useMines";

class MineManager {
    construct() {}

    static getMines() {
        return Object.keys(useMinesStores).map(key => useMinesStores[key]());
    }

    static getMineStore = (mineIndex: string) => {
        return useMinesStores[mineIndex]?.();
    };
}

export default MineManager;
