<template>
    <div>
        <div>
            <label for="miningPower">Mining Power:</label>
            <input :value="SettingsManager.getSettings().miningPower" type="number" id="miningPower" />
        </div>
        <div>
            <label for="battlePower">Battle Power:</label>
            <input :value="SettingsManager.getSettings().battlePower" type="number" id="battlePower" />
        </div>
        <div>
            <label for="lootPower">Loot Power:</label>
            <input :value="SettingsManager.getSettings().lootPower" type="number" id="lootPower" />
        </div>

        <button @click="saveSettings">Save settings</button>
        <button @click="resetSettings">reset</button>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import SettingsManager from '@/managers/SettingsManager';
  
export default defineComponent({
    name: 'MiningBattlePower',
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
        };

        const resetSettings = () => {
            SettingsManager.getSettings().miningPower = 1;
            SettingsManager.getSettings().battlePower = 1;
            SettingsManager.getSettings().lootPower = 1;
        };
  
        return {
            saveSettings,
            resetSettings,
            SettingsManager,
        };
    },
});
</script>
  