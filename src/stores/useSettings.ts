import { defineStore } from 'pinia';

export type SettingsStore = {
  soundOn: boolean;
  soundVolume: number;
  musicOn: boolean;
  musicVolume: number;
  referenceTokenIndex: string;
  floatingEarningsOnClick: boolean;
  
  /* UX */
  decimals: number;
  goalsHideUnlocked: boolean;
  goalsHideUnpayable: boolean;
  
  /* debug settings */
  miningPower: number;
  battlePower: number;
  lootPower: number;
  xpPower: number;
  itemPower: number;
  toggleSound: () => boolean;
  toggleMusic: () => boolean;
};

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    soundOn: true,
    soundVolume: 0.5,
    musicOn: true,
    musicVolume: 0.5,
    referenceTokenIndex: 'cryptodollar',
    floatingEarningsOnClick: true,

    decimals: 5,
    goalsHideUnlocked: false,
    goalsHideUnpayable: false,

    miningPower: 1,
    battlePower: 1,
    lootPower: 1,
    xpPower: 1,
    itemPower: 1,
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
