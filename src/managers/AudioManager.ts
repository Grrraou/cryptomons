import { useSettingsStore } from "@/stores/useSettings";
import UXManager from "./UXManager";

class AudioManager {

    private static currentSound: HTMLAudioElement | null = null;

    static isSoundOn() {
        return useSettingsStore().soundOn;
    }

    static toggleSound() {
        const isOn = !useSettingsStore().soundOn;
        useSettingsStore().soundOn = isOn;
        this.muteCurrentSound(isOn);
    }

    static play(soundFileName: string, volume = 1): Promise<void> {
        return new Promise<void>((resolve) => {
            const audioPath = `sounds/${soundFileName}`;
            const sound = new Audio(UXManager.getImagePath(audioPath));
            
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
    
    static playLoop(soundFileName: string, volume = 1): void {
        const audioPath = `sounds/${soundFileName}`;
        const sound = new Audio(UXManager.getImagePath(audioPath));
        this.currentSound = sound;

        if (this.isSoundOn()) {
            sound.volume = volume;
            sound.loop = true;
            sound.play();
        }
    }

    static muteCurrentSound(mute: boolean): void {
        if (this.currentSound) {
            this.currentSound.muted = !mute;
        }
    }
}

export default AudioManager;
