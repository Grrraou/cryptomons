<template>
    <div v-if="achievementStore.isCompleted" class="achievement-box" :class="{ unlocked: achievementStore.isCompleted }" :style="backgroundStyle">
        <div class="achievement-content">
            <h3>{{ achievement.title }}</h3>
            <span class="achievement-meta">
                <p>{{ achievement.description }}</p>
                <p v-if="achievement.loot">{{ achievement.loot }}</p>
                <p v-if="!achievementStore.isCompleted">Locked</p>
                <p v-else>Unlocked!</p>
            </span>
        </div>
    </div>

    <div v-else="!achievementStore.isCompleted" class="achievement-box" :class="{ unlocked: achievementStore.isCompleted }" :style="backgroundStyle">
        <div class="achievement-content">
            <h3>{{ achievement.title }}</h3>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import AchievementManager from '@/managers/AchievementManager';
  
export default defineComponent({
    props: {
        achievement: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const achievementStore = AchievementManager.getAchievementStore(props.achievement.index);
        
        const backgroundStyle = computed(() => {
            const backgroundUrl = achievementStore.getImage();
  
            return {
                background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), 
                    url(${backgroundUrl}) center/cover no-repeat`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            };
        });
  
        return {
            achievementStore,
            backgroundStyle,
        };
    },
});
</script>
  
<style scoped>
.achievement-box {
    margin: 10px;
    padding: 20px;
    width: 10%;
    border: 2px solid #444;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.7em;
    font-weight: bold;
    color: #444;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    min-width: 150px;
}
  
.achievement-box:hover {
    transform: translateY(-4px);
}

.achievement-meta {
    display: none;
}

.achievement-box:hover .achievement-meta {
    display: block;
}
  
.achievement-box.unlocked {
    color: #ffa500;
    border: 6px solid #ffa500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
}
  
.achievement-content {
    font-size: 1.2em;
}
</style>
  