<template>
    <div>
        <div>
            <label for="decimals">Number of decimals:</label>
            <input :value="SettingsManager.getSettings().decimals" type="number" id="decimals" />
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
            input = document.getElementById('decimals') as HTMLInputElement;
            if (input) {
                const value = parseInt(input.value, 10);
                SettingsManager.getSettings().decimals = value;
            }
        };

        const resetSettings = () => {
            SettingsManager.getSettings().decimals = 5;
        };
  
        return {
            saveSettings,
            resetSettings,
            SettingsManager,
        };
    },
});
</script>
  