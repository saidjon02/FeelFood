// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Front-enddagi `/api/*` so‘rovlari 5000-portga yo‘naltiriladi
      '/api': {
        target: 'https://feelfood.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
