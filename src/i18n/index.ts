import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import pt from './locales/pt';
import {
  DEFAULT_LANGUAGE,
  detectDeviceLanguage,
  loadLanguage,
} from './languageStorage';

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
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export async function initLanguage(): Promise<void> {
  const language = (await loadLanguage()) ?? detectDeviceLanguage();
  await i18n.changeLanguage(language);
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}

export default i18n;
