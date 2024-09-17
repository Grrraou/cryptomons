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

</style>
  