/**
 * src/middleware.ts
 *
 * Initializes i18next for Astro's server-side rendering (SSG build time).
 * React components that call useTranslation() during SSR need i18next to be
 * initialized before renderToString() runs. The browser-language-detector
 * plugin is intentionally excluded here (it accesses navigator/localStorage).
 * Client-side language detection is handled by src/i18n/index.js loaded via
 * BaseLayout's <script> tag.
 */
import { defineMiddleware } from 'astro:middleware';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';
import es from './i18n/es.json';

export const onRequest = defineMiddleware(async (_context, next) => {
  if (!i18next.isInitialized) {
    await i18next.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {
        en: { translation: en },
        es: { translation: es },
      },
      interpolation: { escapeValue: false },
      initImmediate: false,
    });
  }
  return next();
});
