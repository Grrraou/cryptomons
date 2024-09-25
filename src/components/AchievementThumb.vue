<template>
    <div v-if="achievementStore.isCompleted" class="achievement-box unlocked" :style="backgroundStyle">
        <div class="achievement-content">
            <h3>{{ achievement.title }}</h3>
            <span class="achievement-meta">
            <p>{{ achievement.description }}</p>
            <p v-if="achievement.loot">{{ achievement.loot }}</p>
            <p v-if="!achievementStore.isCompleted">Locked</p>
            </span>
        </div>
    </div>
  
    <div v-else class="achievement-box" :style="backgroundStyle">
        <div class="achievement-content content-locked" style="">
                <p style="font-size: 1.3em;">{{ achievementStore.description }}</p>
        </div>
        <div class="progress-overlay" :style="overlayStyle">
            <h3 style="color: #ffa500">{{ achievement.title }}</h3>
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

    // Compute the size of the black overlay based on the progress toward the achievement
    const overlayStyle = computed(() => {
      const target = achievementStore.target;
      const reference = achievementStore.getReference();
      const backgroundUrl = achievementStore.getImage();

      // Ensure reference is valid
      if (reference <= 0) {
        return {
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            transition: 'height 0.3s ease',
            background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
                url(${backgroundUrl}) center/cover no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        };
      }

      // Normalize the target value
      const normalizedTarget = Math.min(target, reference);
      const progress =  reference / target;

      // Calculate the overlay height
      const overlayHeight = `${100 - progress * 100}%`;

      // Return a strict style object
      const style: Record<string, string> = {
            height: overlayHeight,
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            transition: 'height 0.3s ease',
            background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
                url(${backgroundUrl}) center/cover no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
      };

      return style;
    });

    return {
      achievementStore,
      backgroundStyle,
      overlayStyle,
    };
  },
});
</script>
  
<style scoped>
.achievement-box {
  margin: 10px;
  padding: 20px;
  width: 10%;
  border: 4px solid #444;
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
  position: relative;
  box-sizing: border-box;
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
  border: 4px solid #ffa500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
}

.achievement-content {
  font-size: 1.2em;
  height: 170px;
  
}

.progress-overlay {
    border-radius: 10px;
    font-size: 1.2em;
    text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: height 0.3s ease;
}
</style>
