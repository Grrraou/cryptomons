import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost', // Bind to all network interfaces
    port: 5173,
    strictPort: true, // Ensure the server will fail if the port is already in use
    watch: {
      usePolling: true // Fixes file watching issues in Docker environments
    },
  },
});
