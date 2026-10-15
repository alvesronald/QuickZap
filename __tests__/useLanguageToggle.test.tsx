import { act, renderHook } from '@testing-library/react-native';
import { useLanguageToggle } from '../src/hooks/useLanguageToggle';
import i18n from '../src/i18n';
import { loadLanguage } from '../src/i18n/languageStorage';

describe('useLanguageToggle', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('initializes with default language as English', async () => {
    const { result } = await renderHook(() => useLanguageToggle());

    expect(result.current.currentLanguage).toBe('en');
    expect(result.current.isEnglish).toBe(true);
    expect(result.current.isPortuguese).toBe(false);
  });

  it('toggles language between English and Portuguese', async () => {
    const { result } = await renderHook(() => useLanguageToggle());

    await act(async () => {
      await result.current.toggleLanguage();
    });

    expect(result.current.currentLanguage).toBe('pt');
    expect(result.current.isPortuguese).toBe(true);
    expect(result.current.isEnglish).toBe(false);

    await act(async () => {
      await result.current.toggleLanguage();
    });

    expect(result.current.currentLanguage).toBe('en');
    expect(result.current.isEnglish).toBe(true);
    expect(result.current.isPortuguese).toBe(false);
  });

  it('sets a specific language using changeLanguage', async () => {
    const { result } = await renderHook(() => useLanguageToggle());

    await act(async () => {
      await result.current.changeLanguage('pt');
    });

    expect(result.current.currentLanguage).toBe('pt');

    await act(async () => {
      await result.current.changeLanguage('en');
    });

    expect(result.current.currentLanguage).toBe('en');
  });

  it('persists the chosen language', async () => {
    const { result } = await renderHook(() => useLanguageToggle());

    await act(async () => {
      await result.current.changeLanguage('pt');
    });

    expect(await loadLanguage()).toBe('pt');
  });
});
