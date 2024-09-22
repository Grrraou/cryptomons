import { defineStore } from 'pinia';

export interface TutorialStoreType {
    minesTutorial: boolean;
    goalsTutorial: boolean;
    achievementsTutorial: boolean;
    stakingTutorial: boolean;
    vaultTutorial: boolean;
    battleTutorial: boolean;
    inventoryTutorial: boolean;
    swapTutorial: boolean;
    statsTutorial: boolean;
    settingsTutorial: boolean;
    [key: string]: boolean; // Index signature for dynamic properties
}

export const useTutorialStore = defineStore('tutorial', {
  state: (): TutorialStoreType => ({
    minesTutorial: false,
    goalsTutorial: false,
    achievementsTutorial: false,
    stakingTutorial: false,
    vaultTutorial: false,
    battleTutorial: false,
    inventoryTutorial: false,
    swapTutorial: false,
    statsTutorial: false,
    settingsTutorial: false,
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
