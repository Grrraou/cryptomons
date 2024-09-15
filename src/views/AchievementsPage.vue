<template>
    <div class="game-container">
        <h1 class="page-title">Achievements <InfoBubble page="achievements" /></h1>
        <AchievementThumb
            v-for="achievement in achievements"
            :key="achievement.index"
            :achievement="achievement"
        />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import AchievementThumb from '@/components/AchievementThumb.vue';
import InfoBubble from '@/components/InfoBubble.vue';
import AchievementManager from '@/managers/AchievementManager';
  
export default defineComponent({
    components: {
        AchievementThumb,
        InfoBubble,
    },
    setup() {
        const achievements = AchievementManager.getAchievements();
  
        return {
            achievements,
        };
    },
});
</script>
  
<style scoped>
.page-title {
    position: relative;
    font-size: 28px;
    font-weight: bold;
    color: #444;
    text-align: center;
    top: 0;
    margin-bottom: 20px;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 2px solid #ffa500;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
  