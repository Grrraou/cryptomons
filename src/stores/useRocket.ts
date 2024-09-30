import { defineStore } from 'pinia';

export type PlanetType = {
  name?: string, 
  style?: string, 
  description?: string,
}

export type RocketStoreType = {
  isActive: boolean;
  rocketDistance: number;
  planet: PlanetType | null;
};

export const useRocketStore = defineStore('rocket', {
  state: () => ({
    isActive: false,
    distance: 0,
    planet: null,
  }),
  actions: {
    incrementRocketDistance() {
      this.distance += 7.9;
    }
  },
  persist: true,
});
