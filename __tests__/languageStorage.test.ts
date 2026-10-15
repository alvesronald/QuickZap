import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { initLanguage } from '../src/i18n';
import {
  detectDeviceLanguage,
  loadLanguage,
  saveLanguage,
} from '../src/i18n/languageStorage';

const mockLocale = (locale: string) =>
  jest
    .spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions')
    .mockReturnValue({ locale } as Intl.ResolvedDateTimeFormatOptions);

describe('languageStorage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.restoreAllMocks();
  });

  it('returns null when nothing or an invalid value is stored', async () => {
    expect(await loadLanguage()).toBeNull();
    await AsyncStorage.setItem('quickzap.language', 'fr');
    expect(await loadLanguage()).toBeNull();
  });

  it('round-trips a saved language', async () => {
    await saveLanguage('en');
    expect(await loadLanguage()).toBe('en');
    await saveLanguage('pt');
    expect(await loadLanguage()).toBe('pt');
  });

  it('does not throw when storage is unavailable', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockRejectedValue(new Error('x'));
    jest.spyOn(AsyncStorage, 'setItem').mockRejectedValue(new Error('x'));
    expect(await loadLanguage()).toBeNull();
    await expect(saveLanguage('en')).resolves.toBeUndefined();
  });

  it('detects the device language with pt fallback', () => {
    mockLocale('en-US');
    expect(detectDeviceLanguage()).toBe('en');
    mockLocale('pt-BR');
    expect(detectDeviceLanguage()).toBe('pt');
    mockLocale('ja-JP');
    expect(detectDeviceLanguage()).toBe('pt');
  });

  it('initLanguage prefers the saved language, then the device language', async () => {
    await saveLanguage('en');
    mockLocale('pt-BR');
    await initLanguage();
    expect(i18n.language).toBe('en');
    await AsyncStorage.clear();
    await initLanguage();
    expect(i18n.language).toBe('pt');
  });
});
