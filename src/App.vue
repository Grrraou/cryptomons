<template>
  <div class="layout">
    <!-- Use the SideMenu component here -->
    <SideMenu />

    <!-- Main content area -->
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideMenu from './components/SideMenu.vue';
import './assets/styles/main.css';
import 'vue3-select/dist/vue3-select.css';
import MineManager from './managers/MineManager';

export default defineComponent({
  components: {
    SideMenu,
  },
  created() {
    const mineManager = new MineManager();
    mineManager.startAutoMining();
  },
});
</script>

<style scoped>
body {
  margin: 0px !important;
}

.layout {
  display: flex;
  height: 100vh;
}

.page-content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
}
</style>
