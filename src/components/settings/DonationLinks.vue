<template>
    <div class="user-settings-block">
        <div class="user-settings">
            <h3>Send me your shitcoins</h3>
      
            <div class="settings-group">
                <img class="token-icon" :src="TokenManager.getTokenStore('sol').getIcon()">
                <p>{{ solanaWallet }} <button @click="copyToClipboard(solanaWallet)">📋</button></p>
            </div>

            <div class="settings-group">
                <img class="token-icon" :src="TokenManager.getTokenStore('osmo').getIcon()">
                <p>{{ osmosisWallet }} <button @click="copyToClipboard(osmosisWallet)">📋</button></p>
            </div>

        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TokenManager from '@/managers/TokenManager';
  
export default defineComponent({
    name: 'DonationLinks',
    setup() {
        const solanaWallet = 'B4gXwwawYixf3uXYrbSmZuo5koNH4pGdw5RYZm4kzdBt';
        const osmosisWallet = 'osmo16xcevd8j6peq39cmtgw05h06adyaa63ku5yqun';

        const copyToClipboard = (wallet: string) => {
            navigator.clipboard.writeText(wallet);
        };

        return {
            TokenManager,
            solanaWallet,
            osmosisWallet,
            copyToClipboard,
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
</style>