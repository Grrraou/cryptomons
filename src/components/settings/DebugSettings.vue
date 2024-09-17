<template>
    <div>
        <div>
            <label for="miningPower">Mining Power:</label>
            <input :value="SettingsManager.getSettings().miningPower" type="number" id="miningPower" />
            <button @click="saveMiningPower">Save Mining Power</button>
        </div>
  
        <div>
            <label for="battlePower">Battle Power:</label>
            <input :value="SettingsManager.getSettings().battlePower" type="number" id="battlePower" />
            <button @click="saveBattlePower">Save Battle Power</button>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import SettingsManager from '@/managers/SettingsManager';
  
export default defineComponent({
    name: 'MiningBattlePower',
    setup() {
        const saveMiningPower = () => {
            const input = document.getElementById('miningPower') as HTMLInputElement;
            if (input) {
                const value = parseInt(input.value, 10);
                SettingsManager.getSettings().miningPower = value;
            }
        };
  
        const saveBattlePower = () => {
            const input = document.getElementById('battlePower') as HTMLInputElement;
            if (input) {
                const value = parseInt(input.value, 10);
                SettingsManager.getSettings().battlePower = value;
            }
        };
  
        return {
            saveMiningPower,
            saveBattlePower,
            SettingsManager,
        };
    },
});
</script>
  