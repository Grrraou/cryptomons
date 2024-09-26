import { useRocketStore } from "@/stores/useRocket";

class RocketManager {

    static getRocket() {
        return useRocketStore();
    }
}

export default RocketManager;
