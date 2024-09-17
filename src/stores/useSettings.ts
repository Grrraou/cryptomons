import { defineStore } from 'pinia';

export type SettingsStore = {
  soundOn: boolean;
  musicOn: boolean;
  referenceTokenIndex: string;
  decimals: number;

  /* debug settings */
  miningPower: number;
  battlePower: number;
  lootPower: number;
  toggleSound: () => boolean;
  toggleMusic: () => boolean;
};

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    soundOn: true,
    musicOn: true,
    referenceTokenIndex: 'cryptodollar',
    decimals: 5,
    miningPower: 1,
    battlePower: 1,
    lootPower: 1,
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
