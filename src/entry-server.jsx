/**
 * entry-server.jsx
 * SSR entry point used only by scripts/prerender.mjs at build time.
 * Never bundled into the client build.
 */
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import App from './App';
import en from './i18n/en.json';

let i18nReady = false;

async function ensureI18n() {
  if (i18nReady || i18next.isInitialized) { i18nReady = true; return; }
  await i18next.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: { en: { translation: en } },
    interpolation: { escapeValue: false },
    initImmediate: false,
  });
  i18nReady = true;
}

export async function render(url) {
  await ensureI18n();

  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]} initialIndex={0}>
        <App />
      </MemoryRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  return { html, helmet };
}
