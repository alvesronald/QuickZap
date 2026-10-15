import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { LanguageSwitcher } from '../src/components';
import { loadLanguage } from '../src/i18n/languageStorage';
import i18n from '../src/i18n';

describe('LanguageSwitcher', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('toggles the language and persists it', async () => {
    const user = userEvent.setup();
    await render(<LanguageSwitcher />);
    await user.press(screen.getByText('Mudar para Português'));
    expect(i18n.language).toBe('pt');
    expect(await loadLanguage()).toBe('pt');
    expect(screen.getByText('Switch to English')).toBeOnTheScreen();
  });
});
