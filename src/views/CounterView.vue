<template>
    <div>
      <h1>Counter Page</h1>
      <p>Count: {{ store.count }}</p>
      <button @click="store.increment">Increment</button>
      <router-link to="/">Go to Home</router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from '@/stores/useStore';
  
  export default defineComponent({
    setup() {
      const store = useStore();
  
      return { store };
    },
  });
  </script>