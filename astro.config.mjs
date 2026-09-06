import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://jozedzn.com',
  redirects: {
    '/work/folio-2025': '/work/folio-2026',
    '/es/work/folio-2025': '/es/work/folio-2026',
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'gsap-vendor': ['gsap'],
          },
        },
      },
    },
  },
});
