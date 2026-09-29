import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import pt from './locales/pt';

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}

export default i18n;
