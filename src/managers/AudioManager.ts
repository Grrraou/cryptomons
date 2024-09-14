import { useSettingsStore } from "@/stores/useSettings";

class AudioManager {
    construct() {
    }

    static isSoundOn() {
        return useSettingsStore().soundOn;
    }

    static toggleSound() {
        useSettingsStore().soundOn = !useSettingsStore().soundOn;
    }
}

export default AudioManager;
