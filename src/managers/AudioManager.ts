import { useSettingsStore } from "@/stores/useSettings";
import UXManager from "./UXManager";

class AudioManager {

    private static currentMusic: HTMLAudioElement | null = null;

    static isSoundOn() {
        return useSettingsStore().soundOn;
    }

    static toggleSound() {
        const isOn = !useSettingsStore().soundOn;
        useSettingsStore().soundOn = isOn;
        this.toggleMusic();
    }

    static play(soundFileName: string, volume = 1): Promise<void> {
        return new Promise<void>((resolve) => {
            const audioPath = `sounds/${soundFileName}`;
            const sound = new Audio(UXManager.getImagePath(audioPath));
            
            if (this.isSoundOn()) {
                console.log(this.isSoundOn)
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
    
    static playMusic(soundFileName: string | null = null, volume = 1): void {
        const musics = [
            'music.aac',
            'music2.aac',
            'music3.aac',
        ];
        soundFileName = soundFileName ?? musics[Math.floor(Math.random() * musics.length)];
        const audioPath = `sounds/${soundFileName}`;
        this.currentMusic = new Audio(UXManager.getImagePath(audioPath));
        this.currentMusic.volume = volume;
        this.currentMusic.loop = true;
        this.currentMusic.play();

        if (!this.isSoundOn()) {
            this.toggleMusic();
        }
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
