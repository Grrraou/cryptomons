<template>
    <div class="staking-widget" :id="stakingStore.getDOMid()" :style="backgroundStyle">
        <div style="display: flex; justify-content: center;">
            <h3>{{ stakingStore.name }} Staking</h3>
            <div class="logs"></div>
        </div>
        <p>
            <strong>Staked Amount:</strong> {{ stakingStore.staked.toFixed(SettingsManager.getSettings().decimals) }} 
            <img :src="tokenStore.getIcon()" class="token-icon" :title="stakingStore.token" draggable="false">
        </p>
        <p>
            <strong>Stored Amount:</strong> {{ tokenStore.balance.toFixed(SettingsManager.getSettings().decimals) }} 
            <img :src="tokenStore.getIcon()" class="token-icon" :title="stakingStore.token" draggable="false">
        </p>
        <p><strong>APR:</strong> {{ stakingStore.apr * 100 }}%</p>
        <p>
            <strong>Estimated gains:</strong> {{ stakingStore.getEstimatedGains().toFixed(SettingsManager.getSettings().decimals) }} 
            <img :src="tokenStore.getIcon()" class="token-icon" :title="stakingStore.token" draggable="false">
        </p>
        <input type="number" v-model.number="stakeInput"  placeholder="Enter amount to stake" />
        <div class="quick-select-buttons">
          <button @click="selectPercentage(25)">25%</button>
          <button @click="selectPercentage(50)">50%</button>
          <button @click="selectPercentage(75)">75%</button>
          <button @click="selectPercentage(100)">100%</button>
        </div>
        <button @click="stakeTokens" class="staking-button">Stake</button>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStakingsStores } from '@/stores/useStakings';
import { useTokenStores } from '@/stores/useTokens';
import SettingsManager from '@/managers/SettingsManager';
  
export default defineComponent({
    name: 'StakingWidget',
    props: {
        staking: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const stakingStore = useStakingsStores[props.staking.index]();
        const tokenStore = useTokenStores[stakingStore.token]();
        const stakeInput = ref(0);
  
        const backgroundStyle = computed(() => {
            const backgroundUrl = stakingStore.getImage();
            return {
            background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), 
                url(${backgroundUrl}) center/cover no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            };
        });
  
        const stakeTokens = () => {
            if (stakeInput.value > 0 && stakeInput.value <= tokenStore.balance) {
                stakingStore.stakeTokens(stakeInput.value);
                stakeInput.value = 0;
            }
        };
  
        const selectPercentage = (percentage: number) => {
            stakeInput.value = (tokenStore.balance * percentage) / 100;
        };
  
        return {
            stakingStore,
            tokenStore,
            stakeInput,
            backgroundStyle,
            SettingsManager,
            stakeTokens,
            selectPercentage,
        };
    },
});
</script>
  

<style scoped>
.staking-widget {
    margin: 10px auto;
    padding: 20px;
    width: 25%;
    border: 4px solid #ffa500;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-blend-mode: 'lighten';
    font-size: 1.3em;
    font-weight: bold;
    color: #444;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.staking-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    background-color: #ffa500;
    border: 2px solid #444;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.staking-button:hover {
    background-color: #ff8c00;
    transform: translateY(-2px);
}

.token-icon {
    width: 16px;
    height: auto;
    transition: transform 0.3s ease;
}

.staking-widget:hover {
    border: 4px solid #5EC15E;
}

.staking-widget h3 {
    margin: 0 0 10px;
    font-size: 20px;
}

.staking-widget p {
    font-size: 16px;
    margin: 5px 0;
}

.staking-widget input {
    margin-top: 10px;
    padding: 5px;
    width: 100%;
}

.staking-widget button {
    margin-top: 10px;
    padding: 5px 10px;
}



/* PERCENT BUTTONS */
.quick-select-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
}

.quick-select-buttons button {
    background-color: #f0f0f0;
    color: #333;
    border: 2px solid #e0e0e0;
    border-radius: 30px;
    padding: 10px 30px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quick-select-buttons button:hover {
    background-color: #ffa500;
    color: #fff;
    border-color: #ffa500;
}

.quick-select-buttons button:active {
    transform: scale(0.95);
}

.quick-select-buttons button:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}
.convenience-buttons button {
    margin-right: 5px;
}
</style>
