import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/BOUCTON_AI_WORLD/',  // Chemin pour GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'  // <-- AJOUT CRUCIAL : Indique le point d'entrée
      }
    }
  }
});
