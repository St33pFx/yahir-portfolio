import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        // Split vendor libraries into separate cacheable chunks
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap-vendor';
          }
          if (id.includes('node_modules/three')) {
            return 'three-vendor';
          }
        },
      },
    },
  },
});
