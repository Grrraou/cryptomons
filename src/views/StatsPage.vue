<template>
    <div class="stats-page game-container">
        <h1 class="page-title">Stats Page <InfoBubble page="stats" /></h1>
        <p class="subtitle">View your game stats below.</p>
        <div class="menu">
        <button @click="resetStoredStats">Reset Stats</button>
    </div>
  
    <div class="stats-list">
        <div v-if="Object.keys(localStorageItems).length > 0">
            <div v-for="(value, key) in localStorageItems" :key="key" class="stat-item">
                <span class="stat-key">{{ key }}:</span>
                <span class="stat-value"><pre>{{ value }}</pre></span>
            </div>
        </div>
        <p v-else class="no-stats">No stats available. Start playing to generate stats!</p>
    </div>
</div>
</template>
  
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import InfoBubble from '@/components/InfoBubble.vue';

export default defineComponent({
    name: 'StatsPage',
    components: {
        InfoBubble,
    },
    setup() {
        const localStorageItems = reactive<{ [key: string]: string }>({});

        const loadLocalStorage = () => {
            const items: { [key: string]: string } = {};
            const keys = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) keys.push(key);
            }
            keys.sort();

            keys.forEach((key) => {
                items[key] = localStorage.getItem(key) || '';
            });
        
            Object.assign(localStorageItems, items);
        };

        const resetStoredStats = () => {
            localStorage.clear();
            window.location.reload();
        };

        loadLocalStorage();

        return {
            localStorageItems,
            resetStoredStats,
        };
    },
});
</script>

<style scoped>
.page-title {
    font-size: 28px;
    font-weight: bold;
    color: #444;
    text-align: center;
    margin-bottom: 10px;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
    border-bottom: 2px solid #ffa500;
    display: flex;
    justify-content: center;
    align-items: center;
}

.subtitle {
    text-align: center;
    color: #777;
    margin-bottom: 20px;
}

.stats-page {
    padding: 20px;
    max-width: 80%;
    margin: 0 auto;
}

.menu {
        text-align: center;
        margin-bottom: 20px;
}
  
button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #ff0000;
    color: white;
    border: none;
    cursor: pointer;
}
  
button:hover {
    background-color: #cc0000;
}

pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    overflow-x: auto;
    font-family: monospace;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 80%;
}

.stats-list {
    margin-top: 20px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.stat-key {
    font-weight: bold;
}

.stat-value {
    color: #333;
}

.no-stats {
    text-align: center;
    color: #777;
}
</style>
