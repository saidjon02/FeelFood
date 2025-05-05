import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chustfeelfoodbackend.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  }
});
