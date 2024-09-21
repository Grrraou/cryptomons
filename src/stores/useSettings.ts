import { defineStore } from 'pinia';

export type SettingsStore = {
  soundOn: boolean;
  musicOn: boolean;
  referenceTokenIndex: string;
  /* UX */
  decimals: number;
  goalsHideUnlocked: boolean;
  goalsHideUnpayable: boolean;
  
  /* debug settings */
  miningPower: number;
  battlePower: number;
  lootPower: number;
  xpPower: number;
  toggleSound: () => boolean;
  toggleMusic: () => boolean;
};

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    soundOn: true,
    musicOn: true,
    referenceTokenIndex: 'cryptodollar',
    decimals: 5,
    goalsHideUnlocked: false,
    goalsHideUnpayable: false,
    miningPower: 1,
    battlePower: 1,
    lootPower: 1,
    xpPower: 1,
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
