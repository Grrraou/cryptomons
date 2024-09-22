<template>
    <v-tour 
        :name="name" 
        :steps="steps" 
        :callbacks="tutoCallback"
        v-model="currentStep">
    </v-tour>
</template>
  
<script lang="ts">
import TutorialManager from '@/managers/TutorialManager';
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
  
/* 
https://github.com/pulsardev/vue-tour/wiki/ 
https://popper.js.org/popper-documentation.html#Popper.placements
*/
export default defineComponent({
    props: {
        /* steps: {
            type: Array,
            required: true,
        }, */
        name: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const tutorialStore = TutorialManager.getTutorialStore();
        const steps = TutorialManager.getTutorialSteps(props.name);
        const currentStep = ref(0);

        const tutoCallback = {
            onStart: () => {
                /* DISABLE MENU TO AVOID WEIRD BEHAVIORS */
                const elements = document.querySelectorAll('.main-menu-nav ul li a') as NodeListOf<HTMLElement>;
                elements.forEach(element => {
                    element.style.pointerEvents = 'none';
                });
            },
            onSkip: () => {
                tutorialStore.completeTutorial(props.name);
            },
            onFinish: () => {
                tutorialStore.completeTutorial(props.name);
            },
            onStop: () => {
                tutorialStore.completeTutorial(props.name);
            },
            onNextStep: (currentStep) => {},
            onPreviousStep: (currentStep) => {},
        };

        onMounted(() => {
            if (props.name && !tutorialStore[props.name]) {
                const instanceProxy: any = getCurrentInstance().proxy;
                instanceProxy.$tours[props.name].start();
            }
        });

        return {
            currentStep,
            tutoCallback,
            steps,
        };
    },
});
</script>
  

<style>
/* vue3-tour */
.v-tour__target--highlighted {
    box-shadow: 0 0 0 99999px rgba(0,0,0,.4) !important;
}
</style>