import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        // Split vendor libraries into separate cacheable chunks
        manualChunks: {
          'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
          'gsap-vendor':   ['gsap'],
          'three-vendor':  ['three'],
        },
      },
    },
  },
});
