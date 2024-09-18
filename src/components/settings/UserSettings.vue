<template>
    <div>
        <div>
            <label for="decimals">Number of decimals:</label>
            <input :value="SettingsManager.getSettings().decimals" type="number" id="decimals" />
        </div>

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
            console.log(input.value)
            if (input) {
                SettingsManager.getSettings().referenceTokenIndex = input.value;
            }
        };

        const resetSettings = () => {
            SettingsManager.getSettings().decimals = 5;
        };
  
        return {
            tokenList,
            saveSettings,
            resetSettings,
            SettingsManager,
        };
    },
});
</script>
  