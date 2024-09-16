import { defineStore } from 'pinia';

export type SettingsStore = {
  soundOn: boolean;
  musicOn: boolean;
  referenceTokenIndex: string;
  toggleSound: () => boolean;
  toggleMusic: () => boolean;
};

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    soundOn: true,
    musicOn: true,
    referenceTokenIndex: 'cryptodollar',
  }),
  actions: {
    toggleSound() {
      this.soundOn = !this.soundOn;
      return this.soundOn;
    },
    toggleMusic() {
      this.musicOn = !this.musicOn;
      return this.musicOn;
    },
  },
  persist: true,
});
