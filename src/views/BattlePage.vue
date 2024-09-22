<template>
    <h1 class="page-title">BattleFields <InfoBubble page="battle" /></h1>
    <TutorialComponent name="battleTutorial"></TutorialComponent>

    <div class="battle-page game-container">
        <div class="battlefields-container">
            <div v-for="(battlefield, index) in battlefields" 
                :key="battlefield.index" 
            >
                <BattlefieldWidget :battlefield="battlefield" />
            </div>
        </div>
        <HeroList class="hero-list" />
    </div>

</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import BattlefieldWidget from '@/components/BattlefieldWidget.vue';
import HeroList from '@/components/HeroList.vue';
import InfoBubble from '@/components/InfoBubble.vue';
import BattlefieldManager from '@/managers/BattlefieldManager';
import TutorialComponent from '@/components/TutorialComponent.vue';

export default defineComponent({
    components: {
        BattlefieldWidget,
        HeroList,
        InfoBubble,
        TutorialComponent,
    },
    setup() {
        const battlefields = BattlefieldManager.getAvailableBattlefields();

        return {
            battlefields,
        };
    },
});
</script>
  
<style scoped>
.battle-page {
    display: flex;
    justify-content: space-between;
}
  
.battlefields-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
}
  
.battlefield-block {
    margin: 10px auto;
    padding: 20px;
    width: 90%;
    border: 2px solid #ffa500;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-blend-mode: lighten;
    font-size: 1.3em;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}
  
.hero-list {
    width: 200px;
    max-height: 80vh;
    overflow-y: auto;
}
</style>
  