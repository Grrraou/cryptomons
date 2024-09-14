<template>
    <div class="staking-widget" :id="stakingStore.getDOMid()" :style="backgroundStyle">
        <div style="display: flex; justify-content: center;">
            <h3>{{ stakingStore.name }} Staking</h3>
            <div class="logs"></div>
        </div>
        <p>
            <strong>Staked Amount:</strong> {{ stakingStore.staked }} 
            <img :src="tokenStore.getIcon()" class="token-icon" :title="stakingStore.token">
        </p>
        <p>
            <strong>Stored Amount:</strong> {{ tokenStore.balance }} 
            <img :src="tokenStore.getIcon()" class="token-icon" :title="stakingStore.token">
        </p>
        <p><strong>APR:</strong> {{ stakingStore.apr * 100 }}%</p>
        <p>
            <strong>Estimated gains:</strong> {{ stakingStore.getEstimatedGains() }} 
            <img :src="tokenStore.getIcon()" class="token-icon" :title="stakingStore.token">
        </p>
        <input type="number" v-model.number="stakeInput"  placeholder="Enter amount to stake" />
        <div class="convenience-buttons">
            <button @click="setStakePercentage(25)">Stake 25%</button>
            <button @click="setStakePercentage(50)">Stake 50%</button>
            <button @click="setStakePercentage(75)">Stake 75%</button>
            <button @click="setStakePercentage(100)">Stake 100%</button>
        </div>
        <button @click="stakeTokens" class="staking-button">Stake</button>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStakingsStores } from '@/stores/useStakings';
import { useTokenStores } from '@/stores/useTokens';
  
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
                console.log('yaya')
                stakingStore.stakeTokens(stakeInput.value);
                stakeInput.value = 0;
            }
        };
  
        const setStakePercentage = (percentage: number) => {
            stakeInput.value = (tokenStore.balance * percentage) / 100;
        };
  
        return {
            stakingStore,
            tokenStore,
            stakeInput,
            backgroundStyle,
            stakeTokens,
            setStakePercentage,
        };
    },
});
</script>
  

<style scoped>
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

.staking-widget {
    margin: 10px auto;
    padding: 20px;
    width: 90%;
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

.convenience-buttons button {
    margin-right: 5px;
}
</style>
