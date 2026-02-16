import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [svelte()],
  define: {
    API_LOCATION: JSON.stringify(process.env.API_LOCATION)
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});

