import i18n, { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';

// The URL is the source of truth after BaseLayout handles first-visit detection.
// This keeps hydration deterministic and makes every case-study language shareable.
const detectLangFromPath = () => {
  if (typeof window === 'undefined') return 'en';
  return /^\/es(?:\/|$)/.test(window.location.pathname) ? 'es' : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: detectLangFromPath(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    interpolation: {
      escapeValue: false,
    },
  });

export function createI18nInstance(lng = 'en') {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  });
  return instance;
}

export default i18n;
