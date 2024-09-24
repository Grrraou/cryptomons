import { useSettingsStore } from "@/stores/useSettings";
import UXManager from "./UXManager";
import SettingsManager from "./SettingsManager";

class AudioManager {

    private static currentMusic: HTMLAudioElement | null = null;

    static isSoundOn() {
        return useSettingsStore().soundOn;
    }

    static toggleSound() {
        useSettingsStore().soundOn = !useSettingsStore().soundOn;
        this.toggleMusic();
    }

    static silentMode() {
        useSettingsStore().soundOn = false;
        this.currentMusic.muted = true;
    }

    static play(soundFileName: string): Promise<void> {
        return new Promise<void>((resolve) => {
            const audioPath = `sounds/${soundFileName}`;
            const sound = new Audio(UXManager.getImagePath(audioPath));
            
            if (this.isSoundOn()) {
                sound.volume = SettingsManager.getSettings().soundVolume;
                sound.play();
                sound.onended = () => resolve();
            } else {
                resolve();
            }
        });
    }

    static playRandom(soundsArray: string[]) {
        const randomIndex = Math.floor(Math.random() * soundsArray.length);
        this.play(soundsArray[randomIndex]);
    }
    
    static playMusic(soundFileName: string | null = null, volume = 1): void {
        if (!this.currentMusic) {
            const musics = [
                'music.aac',
                'music2.aac',
                'music3.aac',
            ];
            soundFileName = soundFileName ?? musics[Math.floor(Math.random() * musics.length)];
            const audioPath = `sounds/${soundFileName}`;
            this.currentMusic = new Audio(UXManager.getImagePath(audioPath));
            this.currentMusic.volume = SettingsManager.getSettings().musicVolume;
            this.currentMusic.loop = true;
            this.currentMusic.play();
    
            if (!this.isSoundOn()) {
                this.toggleMusic();
            }
        }
    }

    static changeMusicVolume(volume: number) {
        this.currentMusic.volume = volume;
    }

    static toggleMusic(): void {
        if (!this.currentMusic) {
            this.playMusic();
        }
        if (this.currentMusic && !this.currentMusic.paused) {
            this.currentMusic.play();
        }
        if (this.currentMusic) {
            this.currentMusic.muted = !this.currentMusic.muted;
        }
    }
}

export default AudioManager;
