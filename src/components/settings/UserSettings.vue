<template>
    <div class="user-settings">
        <div>
            <label for="decimals">Number of decimals:</label>
            <input :value="SettingsManager.getSettings().decimals" type="number" id="decimals" />
        </div>
        <br>
        <div>
            <label for="referenceToken">Reference Token:</label>
            <select id="referenceToken">
                <option
                    v-for="token in tokenList" 
                    :value="token.index" 
                    :selected="token.index === SettingsManager.getSettings().referenceTokenIndex"
                >
                    {{ token.name }} ({{ token.index }})
                </option>
            </select>
        </div>
        <br>
        <button @click="saveSettings">Save settings</button>
        <button @click="resetSettings">reset</button>
        <br><br>
        <div class="reset-datas">
            <button @click="resetStoredStats">Reset Stats</button>
        </div>

        <div class="discord">
            <a href="https://discord.gg/FHnyJu7g" target="_Blank"><img src="/ui/discord.png"></a>
        </div>

    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import SettingsManager from '@/managers/SettingsManager';
import TokenManager from '@/managers/TokenManager';
  
export default defineComponent({
    name: 'MiningBattlePower',
    setup() {
        const tokenList = TokenManager.getTokens();

        const saveSettings = () => {
            let input = null;
            input = document.getElementById('decimals') as HTMLInputElement;
            if (input) {
                SettingsManager.getSettings().decimals = parseInt(input.value, 10);
            }

            input = document.getElementById('referenceToken') as HTMLSelectElement;
            if (input) {
                SettingsManager.getSettings().referenceTokenIndex = input.value;
            }
        };

        const resetSettings = () => {
            SettingsManager.getSettings().decimals = 5;
        };

        const resetStoredStats = () => {
            localStorage.clear();
            window.location.reload();
        };
  
        return {
            tokenList,
            saveSettings,
            resetSettings,
            resetStoredStats,
            SettingsManager,
        };
    },
});
</script>
  
<style scoped>
.user-settings {
    text-align: center;
}

.reset-datas {
    text-align: center;
     margin-bottom: 20px;
}
  
.reset-datas button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #ff0000;
    color: white;
    border: none;
    cursor: pointer;
}
  
.reset-datas button:hover {
    background-color: #cc0000;
}

.discord img {
    width: 100px;
}
</style>