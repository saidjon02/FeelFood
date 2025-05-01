import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chustfeelfood.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: resolve(__dirname, '..', 'dist') // dist ni tashqariga chiqar
  }
});
