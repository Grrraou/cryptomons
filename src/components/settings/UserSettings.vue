<template>
    <div class="user-settings-block">
        <div class="user-settings">

            <div class="settings-group">
                <label for="decimals" class="setting-label">Number of decimals:</label>
                <input 
                    :value="SettingsManager.getSettings().decimals" 
                    type="number" 
                    id="decimals" 
                    min="0" 
                    class="setting-input" 
                />
            </div>

            <div class="settings-group">
                <label for="referenceToken" class="setting-label">Reference Token:</label>
                <select id="referenceToken" class="setting-select">
                    <option
                    v-for="token in tokenList" 
                    :value="token.index" 
                    :selected="token.index === SettingsManager.getSettings().referenceTokenIndex"
                    >
                    {{ token.name }} ({{ token.index }})
                    </option>
                </select>
            </div>

            <div class="settings-group">
                <label for="floating-numbers" class="setting-label">Display floating texts ?</label>
                <input 
                    type="checkbox" 
                    id="floating-numbers" 
                    class="setting-input" 
                    :checked="SettingsManager.getSettings().floatingEarningsOnClick" 
                    @change="SettingsManager.getSettings().floatingEarningsOnClick = !SettingsManager.getSettings().floatingEarningsOnClick"
                />
            </div>

            <div class="settings-group">
                <label for="soundVolume" class="setting-label">Sound Volume:</label>
                <input 
                    v-model="soundVolume" 
                    type="range" 
                    id="soundVolume" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    class="volume-slider" 
                />
                <span class="slider-value">{{ soundVolume }}</span>
            </div>

            <div class="settings-group">
                <label for="musicVolume" class="setting-label">Music Volume:</label>
                <input 
                    v-model="musicVolume" 
                    type="range" 
                    id="musicVolume" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    class="volume-slider" 
                />
                <span class="slider-value">{{ musicVolume }}</span>
            </div>


            <br>
            <button @click="saveSettings">Save settings</button>
            <button @click="defaultSettings">Default settings</button>
            <br><br>
            <div class="reset-datas">
                <button @click="resetStoredStats">Reset Stats</button>
            </div>

        </div>

        <div class="discord">
            <a href="https://discord.gg/FHnyJu7g" target="_Blank"><img src="/ui/discord.png"></a>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import SettingsManager from '@/managers/SettingsManager';
import TokenManager from '@/managers/TokenManager';
import AudioManager from '@/managers/AudioManager';
  
export default defineComponent({
    name: 'MiningBattlePower',
    setup() {
        const tokenList = TokenManager.getTokens();
        const settingsStore = SettingsManager.getSettings();
        
        const soundVolume = computed({
            get() {
                return settingsStore.soundVolume;
            },
            set(value: number) {
                settingsStore.soundVolume = value;
            }
        });

        const musicVolume = computed({
            get() {
                return settingsStore.musicVolume;
            },
            set(value: number) {
                settingsStore.musicVolume = value;
                AudioManager.changeMusicVolume(value);
            }
        });

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

            input = document.getElementById('soundVolume') as HTMLSelectElement;
            if (input) {
                SettingsManager.getSettings().soundVolume = input.value;
            }

            input = document.getElementById('musicVolume') as HTMLSelectElement;
            if (input) {
                SettingsManager.getSettings().musicVolume = input.value;
            }
        };

        const defaultSettings = () => {
            SettingsManager.getSettings().decimals = 5;
            SettingsManager.getSettings().referenceTokenIndex = 'cryptodollar'
            SettingsManager.getSettings().soundVolume = 1;
            SettingsManager.getSettings().musicVolume = 1;
        };

        const resetStoredStats = () => {
            localStorage.clear();
            AudioManager.silentMode();
            window.location.reload();
        };
  
        return {
            tokenList,
            soundVolume,
            musicVolume,
            saveSettings,
            defaultSettings,
            resetStoredStats,
            SettingsManager,
        };
    },
});
</script>
  
<style scoped>
.user-settings-block {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.user-settings {
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

.setting-input, .setting-select {
    flex-grow: 1;
    padding: 8px 12px;
    font-size: 16px;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.setting-input:focus, .setting-select:focus {
    outline: none;
    border-color: #2b8a3e;
    box-shadow: 0 0 5px rgba(43, 138, 62, 0.3);
}

.setting-select {
    appearance: none;
    background-color: #fff;
    cursor: pointer;
}

.setting-select:focus {
    outline: none;
}

.settings-group:nth-child(odd) {
    background-color: #f0f0f0;
}

/** SLIDERS */
.volume-slider {
  flex-grow: 1;
  margin: 0 10px;
  height: 8px;
  -webkit-appearance: none;
  background-color: #ddd;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #2b8a3e;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #2b8a3e;
  cursor: pointer;
}

.slider-value {
  font-size: 16px;
  color: #333;
  width: 40px;
  text-align: center;
}

/** CHECKBOXES */
/* Default checkbox style */
input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  appearance: none; /* Removes default styles */
  background-color: #fff;
  border: 2px solid #999;
  border-radius: 2px; /* Keeps it as a box with slightly rounded corners */
  position: relative;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  flex-grow: 0;
}

/* Checked state */
input[type="checkbox"]:checked {
  background-color: #5EC15E; /* Green when checked */
  border-color: #5EC15E;
}

/* Checkmark inside the box */
input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 4px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}


</style>