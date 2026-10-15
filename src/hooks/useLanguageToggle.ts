import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { saveLanguage, type SupportedLanguage } from '../i18n/languageStorage';

export type { SupportedLanguage };

export function useLanguageToggle() {
  const { i18n, t } = useTranslation();

  const currentLanguage: SupportedLanguage = i18n.language?.startsWith('pt')
    ? 'pt'
    : 'en';

  const toggleLanguage = useCallback(() => {
    const nextLanguage: SupportedLanguage =
      currentLanguage === 'en' ? 'pt' : 'en';
    saveLanguage(nextLanguage);
    return i18n.changeLanguage(nextLanguage);
  }, [currentLanguage, i18n]);

  const changeLanguage = useCallback(
    (lang: SupportedLanguage) => {
      saveLanguage(lang);
      return i18n.changeLanguage(lang);
    },
    [i18n],
  );

  return {
    currentLanguage,
    toggleLanguage,
    changeLanguage,
    isEnglish: currentLanguage === 'en',
    isPortuguese: currentLanguage === 'pt',
    t,
  };
}
