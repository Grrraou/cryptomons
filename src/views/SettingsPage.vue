<template>
  <div class="settings-page game-container">
    <h1 class="page-title">Settings <InfoBubble page="settings" /></h1>

    <SaveGame />
    <br><br>
    <UserSettings />
    <br><br>
    <DebugSettings />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InfoBubble from '@/components/InfoBubble.vue';
import SaveGame from '@/components/settings/SaveGame.vue';
import DebugSettings from '@/components/settings/DebugSettings.vue';
import UserSettings from '@/components/settings/UserSettings.vue';

export default defineComponent({
  name: 'SettingsPage',
  components: {
    InfoBubble,
    SaveGame,
    UserSettings,
    DebugSettings,
  }
});
</script>

<style scoped>
.settings-page {
  padding: 20px;
}
</style>
