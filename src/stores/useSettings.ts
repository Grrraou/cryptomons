import { defineStore } from 'pinia';

// Define the type for the store
export type SettingsStore = {
  soundOn: boolean;
  musicOn: boolean;
  toggleSound: () => boolean;
  toggleMusic: () => boolean;
};

// Define the Pinia store
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    soundOn: true,
    musicOn: true,
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
  persist: true, // Enable persistence for the store
});
