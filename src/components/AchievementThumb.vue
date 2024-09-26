<template>
    <div v-if="achievementStore.isCompleted" class="achievement-box unlocked" :style="backgroundStyle">
        <div class="achievement-content">
            <h3>{{ achievement.title }}</h3>
            <span class="achievement-meta">
            <p>{{ achievement.description }}</p>
            <p v-if="achievement.loot || achievement.nft">
              <img :src="lootItemSrc" class="loot-item">
            </p>
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
import ItemManager from '@/managers/ItemManager';
import NFTsManager from '@/managers/NFTsManager';

export default defineComponent({
  props: {
    achievement: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const achievementStore = AchievementManager.getAchievementStore(props.achievement.index);

    let lootItemSrc = null;
    if (achievementStore.loot) {
      const lootItem = ItemManager.getBaseItem(achievementStore.loot.split(':')[0]);
      lootItemSrc = `/items/${lootItem.type}/${lootItem.index}.png`;
    } else if (achievementStore.nft) {
      const nft = NFTsManager.getNFT(achievementStore.nft.split(':')[1]);
      lootItemSrc = `/nft/${nft.collection}/${nft.index}.png`;
    }
    

    const backgroundStyle = computed(() => {
      const backgroundUrl = achievementStore.getImage();

      return {
        background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), 
          url(${backgroundUrl}) center/cover no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    });

    /** HIDE LAYER */
    const overlayStyle = computed(() => {
      const target = achievementStore.target;
      const reference = achievementStore.getReference();
      const backgroundUrl = achievementStore.getImage();

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

      const progress =  reference / target;
      const overlayHeight = `${100 - progress * 100}%`;
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
      lootItemSrc,
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
  max-width: 100%;
}

.achievement-box.unlocked:hover .achievement-content {
  height: auto;
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

.loot-item {
  width: 70px;
  border: 5px solid #5EC15E;
}
</style>
