import { defineStore } from 'pinia';

export interface TutorialStoreType {
    minesTutorial: boolean;
    [key: string]: boolean; // Index signature for dynamic properties
}

export const useTutorialStore = defineStore('tutorial', {
  state: (): TutorialStoreType => ({
    minesTutorial: false,
  }),
  actions: {
    completeTutorial(tutorialIndex: string): void {
      this[tutorialIndex] = true;
    },
    resetTutorial(tutorialIndex: string): void {
        this[tutorialIndex] = false;
    },
  },
  persist: true,
});
