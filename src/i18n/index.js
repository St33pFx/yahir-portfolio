import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';

// Detect language from URL path instead of browser navigator
// /es/* → Spanish, everything else → English
const detectLangFromPath = () => {
  if (typeof window === 'undefined') return 'en';
  return window.location.pathname.startsWith('/es') ? 'es' : 'en';
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

export default i18n;
