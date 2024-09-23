<template>
    <div class="save-settings">
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
  
export default defineComponent({
    name: 'SaveGame',
    setup() {

        const exportData = () => {
        const data = JSON.stringify(localStorage);
        const blob = new Blob([data], { type: 'text/plain' });
  
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const time = now.toTimeString().slice(0, 8).replace(/:/g, '');
        const filename = `CryptoMons_${date}_${time}.txt`;
  
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
    },
});
</script>

<style scoped>
.save-settings {
    text-align: center;
}
</style>