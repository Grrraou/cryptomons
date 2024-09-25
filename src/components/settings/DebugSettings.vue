<template>
    <div class="debug-settings">
        <div class="settings">

            <div class="settings-group">
                <label for="miningPower" class="setting-label">Mining Power:</label>
                <input 
                    :value="SettingsManager.getSettings().miningPower" 
                    type="number" 
                    id="miningPower" 
                    min="0" 
                    class="setting-input" 
                />
            </div>

            <div class="settings-group">
                <label for="battlePower" class="setting-label">Battle Power:</label>
                <input 
                    :value="SettingsManager.getSettings().battlePower" 
                    type="number" 
                    id="battlePower" 
                    min="0" 
                    class="setting-input" 
                />
            </div>

            <div class="settings-group">
                <label for="lootPower" class="setting-label">Loot Power:</label>
                <input 
                    :value="SettingsManager.getSettings().lootPower" 
                    type="number" 
                    id="lootPower" 
                    min="0" 
                    class="setting-input" 
                />
            </div>

            <div class="settings-group">
                <label for="xpPower" class="setting-label">XP Power:</label>
                <input 
                    :value="SettingsManager.getSettings().xpPower" 
                    type="number" 
                    id="xpPower" 
                    min="0" 
                    class="setting-input" 
                />
            </div>

            <div class="settings-group">
                <label for="itemPower" class="setting-label">Item Power:</label>
                <input 
                    :value="SettingsManager.getSettings().itemPower" 
                    type="number" 
                    id="itemPower" 
                    min="0" 
                    class="setting-input" 
                />
            </div>

            <br>
            <button @click="saveSettings">Save settings</button>
            <button @click="resetSettings">Reset</button>
            <br><br>
            <button @click="completeGoals">Complete all goals</button>
            <button @click="iNeedMoney">I need Money</button>

        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import SettingsManager from '@/managers/SettingsManager';
import GoalManager from '@/managers/GoalManager';
import TokenManager from '@/managers/TokenManager';
  
export default defineComponent({
    name: 'DegubSettings',
    setup() {
        const saveSettings = () => {
            let input = null;
            input = document.getElementById('miningPower') as HTMLInputElement;
            if (input) {
                const value = parseInt(input.value, 10);
                SettingsManager.getSettings().miningPower = value;
            }

            input = document.getElementById('battlePower') as HTMLInputElement;
            if (input) {
                const value = parseInt(input.value, 10);
                SettingsManager.getSettings().battlePower = value;
            }

            input = document.getElementById('lootPower') as HTMLInputElement;
            if (input) {
                const value = parseInt(input.value, 10);
                SettingsManager.getSettings().lootPower = value;
            }

            input = document.getElementById('xpPower') as HTMLInputElement;
            if (input) {
                const value = parseInt(input.value, 10);
                SettingsManager.getSettings().xpPower = value;
            }

            input = document.getElementById('itemPower') as HTMLInputElement;
            if (input) {
                const value = parseInt(input.value, 10);
                SettingsManager.getSettings().itemPower = value;
            }
        };

        const resetSettings = () => {
            SettingsManager.getSettings().miningPower = 1;
            SettingsManager.getSettings().battlePower = 1;
            SettingsManager.getSettings().lootPower = 1;
            SettingsManager.getSettings().xpPower = 1;
            SettingsManager.getSettings().itemPower = 1;
        };

        const completeGoals = () => {
            GoalManager.getGoals().forEach(goalStore => goalStore.completeGoal());
            TokenManager.getTokens().forEach(tokenStore => tokenStore.updateBalance(1));
        };

        const iNeedMoney = () => {
            TokenManager.getTokenStore(SettingsManager.getSettings().referenceTokenIndex).updateBalance(1000000);
        };
  
        return {
            saveSettings,
            resetSettings,
            completeGoals,
            iNeedMoney,
            SettingsManager,
        };
    },
});
</script>

<style scoped>
.debug-settings {
    text-align: center;
    display: flex;
    justify-content: center; /* Horizontally center the divs */
    align-items: center;     /* Vertically center the divs */
    flex-direction: column;  /* If you want them stacked vertically */
}

.settings {
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

.settings-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.setting-label {
    font-size: 16px;
    font-weight: bold;
    color: #555;
    width: 150px;
}

.setting-input {
    flex-grow: 1;
    padding: 8px 12px;
    font-size: 16px;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.setting-input:focus {
    outline: none;
    border-color: #2b8a3e;
    box-shadow: 0 0 5px rgba(43, 138, 62, 0.3);
}

.settings-group:nth-child(odd) {
    background-color: #f0f0f0;
}
</style>
  