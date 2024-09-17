import { useSettingsStore } from "@/stores/useSettings";

class SettingsManager {

    static getSettings() {
        return useSettingsStore();
    }
}

export default SettingsManager;
