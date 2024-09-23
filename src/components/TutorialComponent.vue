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
                /* ENABLE PREVIOUSLY DISABLED MENU */
                const elements = document.querySelectorAll('.main-menu-nav ul li a') as NodeListOf<HTMLElement>;
                elements.forEach(element => {
                    element.style.pointerEvents = 'auto';
                });
            },
            onFinish: () => {
                tutorialStore.completeTutorial(props.name);
                /* ENABLE PREVIOUSLY DISABLED MENU */
                const elements = document.querySelectorAll('.main-menu-nav ul li a') as NodeListOf<HTMLElement>;
                elements.forEach(element => {
                    element.style.pointerEvents = 'auto';
                });
            },
            onStop: () => {
                tutorialStore.completeTutorial(props.name);
                /* ENABLE PREVIOUSLY DISABLED MENU */
                const elements = document.querySelectorAll('.main-menu-nav ul li a') as NodeListOf<HTMLElement>;
                elements.forEach(element => {
                    element.style.pointerEvents = 'auto';
                });
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

.v-step__header {
    background-color: #C0C0C0 !important;
    color: black !important;
    font-weight: bold !important;
    padding: 5px !important;
    font-family: "Tahoma", sans-serif !important;
    font-size: 12px !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    border-bottom: 2px solid #808080 !important;
}

.v-step {
    background-color: black !important;
    color: green !important;
    font-family: "Courier New", Courier, monospace !important;
    font-size: 16px !important;
    padding: 10px !important;
    border: 2px solid #808080 !important;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5) !important;
    font-weight: bold !important;
}

.v-step__arrow {
    display: none;
}
</style>