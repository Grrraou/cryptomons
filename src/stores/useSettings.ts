import { defineStore } from 'pinia';

export type SettingsStore = {
  soundOn: boolean;
  musicOn: boolean;
  referenceTokenIndex: string;
  miningPower: number;
  battlePower: number;
  toggleSound: () => boolean;
  toggleMusic: () => boolean;
};

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    soundOn: true,
    musicOn: true,
    referenceTokenIndex: 'cryptodollar',
    miningPower: 1,
    battlePower: 1,
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
