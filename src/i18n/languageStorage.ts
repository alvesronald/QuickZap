import AsyncStorage from '@react-native-async-storage/async-storage';

export type SupportedLanguage = 'en' | 'pt';

export const LANGUAGE_STORAGE_KEY = 'quickzap.language';
export const DEFAULT_LANGUAGE: SupportedLanguage = 'pt';

export async function loadLanguage(): Promise<SupportedLanguage | null> {
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === 'en' || stored === 'pt' ? stored : null;
  } catch {
    return null;
  }
}

export async function saveLanguage(language: SupportedLanguage): Promise<void> {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Persisting is best effort: the language still changes for this session.
  }
}

export function detectDeviceLanguage(): SupportedLanguage {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
  if (locale.startsWith('en')) {
    return 'en';
  }
  return DEFAULT_LANGUAGE;
}
