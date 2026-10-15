import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { CountrySelector } from '../src/components';
import i18n from '../src/i18n';

describe('CountrySelector', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('shows the flag and dial code and handles press', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(
      <CountrySelector
        country={{ iso: 'BR', dialCode: '55' }}
        onPress={onPress}
      />,
    );
    expect(screen.getByText('+55')).toBeOnTheScreen();
    await user.press(screen.getByLabelText('Select country'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
