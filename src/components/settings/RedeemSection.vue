<template>
    <div class="user-settings-block">
        <div class="user-settings">

            <div class="settings-group">
                <input 
                    type="text" 
                    id="redeem-input" 
                />
                <button @click="redeemTicket">
                    DO NOT REDEEM !
                </button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useRedeemStore } from '@/stores/useRedeem';
  
export default defineComponent({
    name: 'RedeemSection',
    setup() {
        const redeemStore = useRedeemStore();
        const redeemTicket = () => {
            const input = (document.getElementById('redeem-input') as HTMLInputElement)
            redeemStore.redeem(input.value);
            console.log(input.value)
            input.value = '';
        }

        return {
            redeemTicket,
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


</style>