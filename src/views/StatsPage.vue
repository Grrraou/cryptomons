<template>
    <div class="stats-page game-container">
        <h1 class="page-title">Stats Page <InfoBubble page="stats" /></h1>
  
        <div class="stats">

            <div class="stats-group">
                <div class="stat"><span class="stat-label">🖱️ Total mine click: </span><span class="stat-value">{{ totalMineClick }}</span></div>
                <div class="stat"><span class="stat-label">🔼 Total mine upgrades:</span> <span class="stat-value">{{ totalMineUpgrades }}</span></div>
                <div v-for="(mine, index) in MineManager.getMines()" class="stat">
                    <span class="stat-label">Total <img class="token-icon" :src="TokenManager.getTokenStore(mine.token).getIcon()"> Mined:</span>
                    <span class="stat-value">{{ mine.totalMined }}</span>
                </div>
            </div>

            <div class="stats-group">
                <div class="stat"><span class="stat-label">🐲 Unlocked Heroes: </span><span class="stat-value">{{ unlockedHeroes }} / {{ totalHeroes }}</span></div>
                <div class="stat"><span class="stat-label">🔼Total heroes levels: </span><span class="stat-value">{{ totalHeroesLevel }}</span></div>
            </div>

            <div class="stats-group">
                <div class="stat"><span class="stat-label">🔒 Total Staked: </span><span class="stat-value">{{ totalStakedValue }} <img class="token-icon" src='/tokens/cryptodollar.png'></span></div>
            </div>

            <div class="stats-group">
                <div class="stat"><span class="stat-label">🏆 Achievements: </span><span class="stat-value">{{ unlockedAchievements }} / {{ totalAchievements }}</span></div>
            </div>

            <div class="stats-group">
                <div class="stat"><span class="stat-label">🎯 Goals: </span><span class="stat-value">{{ unlockedGoals }} / {{ totalGoals }}</span></div>
            </div>

        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import InfoBubble from '@/components/InfoBubble.vue';
import MineManager from '@/managers/MineManager';
import HeroManager from '@/managers/HeroManager';
import StakingManager from '@/managers/StakingManager';
import AchievementManager from '@/managers/AchievementManager';
import TokenManager from '@/managers/TokenManager';
import GoalManager from '@/managers/GoalManager';

export default defineComponent({
    name: 'StatsPage',
    components: {
        InfoBubble,
    },
    setup() {
        /** MINES */
        const mineStores = MineManager.getMines();

        let totalMineClick = 0
        let totalMineUpgrades = 0;
        mineStores.forEach(mineStore => {
            totalMineClick += mineStore.clicks;
            totalMineUpgrades += mineStore.level;
        });

        /** HEROES */
        const heroStores = HeroManager.getHeroes();

        let unlockedHeroes = 0;
        const totalHeroes = heroStores.length;
        let totalHeroesLevel = 0;
        heroStores.forEach(heroStore => {
            totalHeroesLevel += heroStore.level;
            if (heroStore.isUnlocked()) {
                unlockedHeroes += 1;
            }
        });

        /** STAKINGS */
        const stakingStores = StakingManager.getStakings();

        let totalStakedValue = 0;
        stakingStores.forEach(stakingStore => {
            /** use refence token */
            totalStakedValue += stakingStore.staked * TokenManager.getTokenStore(stakingStore.token).price;
        });

        /** ACHIEVEMENTS */
        const achievementStores = AchievementManager.getAchievements();

        let unlockedAchievements = 0;
        const totalAchievements = achievementStores.length;
        achievementStores.forEach(achievementStore => {
            if (achievementStore.isCompleted) {
                unlockedAchievements += 1;
            }
        });

        /** GOALS */
        const goalStores = GoalManager.getGoals();

        let unlockedGoals = 0;
        const totalGoals = goalStores.length;
        goalStores.forEach(goalStore => {
            unlockedGoals += 1;
        });

        return {
            totalMineClick,
            totalMineUpgrades,

            unlockedHeroes,
            totalHeroes,
            totalHeroesLevel,

            totalStakedValue,

            unlockedAchievements,
            totalAchievements,

            unlockedGoals,
            totalGoals,

            MineManager,
            TokenManager,
        };
    },
});
</script>

<style scoped>
.stats {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #ddd;
  max-width: 600px;
  margin: 0 auto;
}

.stats-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #333;
}

.stat-label {
  font-weight: bold;
  color: #555;
}

.stat-value {
  color: #2b8a3e;
  font-weight: bold;
}

.stats-group:nth-child(odd) {
  background-color: #f0f0f0;
}

.token-icon {
    width: 20px;
    margin-bottom: -4px;
}
</style>
