<template>
  <div class="settings-page game-container">
    <h1 class="page-title">Settings <InfoBubble page="settings" /></h1>
    <div class="export-component">
      <h3>Export Local Storage</h3>
      <button @click="exportData">Download Local Storage Data</button>
    </div>
    <div class="import-component">
      <h3>Import Local Storage</h3>
      <input type="file" @change="importData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InfoBubble from '@/components/InfoBubble.vue';

export default defineComponent({
  name: 'SettingsPage',
  components: {
    InfoBubble,
  },
  setup() {

    const exportData = () => {
      // Convert StorageManager's data to a JSON string
      const data = JSON.stringify(localStorage);
      const blob = new Blob([data], { type: 'text/plain' });

      // Generate a timestamped filename
      const now = new Date();
      const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const time = now.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS
      const filename = `CryptoMons_${date}_${time}.txt`;

      // Create a URL for the Blob and initiate download
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    };

    const importData = (event: Event) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          try {
            const result = e.target?.result as string;
            const data = JSON.parse(result);

            if (typeof data === 'object' && data !== null) {
              localStorage.clear();
              Object.keys(data).forEach((key) => {
                  localStorage.setItem(key, data[key]);
              });
              alert('Local storage data has been successfully imported.');
              window.location.reload();
            } else {
              alert('Invalid file format.');
            }
          } catch (err) {
            alert('Error parsing the file.');
          }
        };
        reader.readAsText(file);
      }
    };

    

    return {
      exportData,
      importData,
    };
  }
});
</script>

<style scoped>
.page-title {
  position: relative;
  font-size: 28px;
  font-weight: bold;
  color: #444;
  text-align: center;
  top: 0;
  margin-bottom: 20px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 2px solid #ffa500;
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings-page {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.import-component {
  margin-bottom: 20px;
}

.export-component {
  margin-bottom: 20px;
}
</style>

