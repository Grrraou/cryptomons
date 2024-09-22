import { tutorialsEnum } from "@/enums/TutorialsEnum";
import { useTutorialStore } from "@/stores/useTutorials";

class TutorialManager {
    static getTutorialStore () {
        return useTutorialStore();
    }

    static getTutorialSteps(tutorialIndex: string) {
        return tutorialsEnum[tutorialIndex];
    }
}

export default TutorialManager;
