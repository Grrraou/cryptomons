<template>
    <div>
      <h1>Home Page</h1>
      <router-link to="/vault">Go to vault</router-link>
  
      <button @click="addBalance">Add Balance</button>
      {{ btcStore.balance }}
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useTokenStores } from '@/stores/useTokens';
  
  export default defineComponent({
    name: 'HomeView',
    setup() {
      const btcStore = useTokenStores['ppc'](); // Correctly create the store instance
  
      const addBalance = () => {
        btcStore.updateBalance(1); // Update the balance
      };
  
      return {
        btcStore,
        addBalance
      };
    }
  });
  </script>
  