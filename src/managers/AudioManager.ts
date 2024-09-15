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

    static play(soundFileName: string, volume = 1): Promise<void> {
        return new Promise<void>((resolve) => {
            const sound = new Audio(`/sounds/${soundFileName}`);
            
            if (this.isSoundOn()) {
                sound.volume = volume;
                sound.play();
                sound.onended = () => resolve();
            } else {
                resolve();
            }
        });
    }

    static playRandom(soundsArray: string[], volume = 1) {
        const randomIndex = Math.floor(Math.random() * soundsArray.length);
        this.play(soundsArray[randomIndex], volume);
    }
    
}

export default AudioManager;
