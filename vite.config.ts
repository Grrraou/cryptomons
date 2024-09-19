import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 5173,      // Ensure the correct port is set (you can change this if needed)
    strictPort: true, // Ensure the server will fail if the port is already in use
    watch: {
      usePolling: true // Fixes file watching issues in Docker environments
    },
  },
});
