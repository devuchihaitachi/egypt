import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/Egypt-Cradle-of-Civilization/',
  server: {
    port: 3000
  }
});
