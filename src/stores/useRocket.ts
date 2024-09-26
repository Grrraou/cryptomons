import { defineStore } from 'pinia';

export type RocketStoreType = {
  rocketDistance: number;
};

export const useRocketStore = defineStore('rocket', {
  state: () => ({
    distance: 0,
  }),
  actions: {
    incrementRocketDistance() {
      this.distance += 7.9;
    }
  },
  persist: true,
});
