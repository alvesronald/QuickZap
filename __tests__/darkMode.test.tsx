import React from 'react';
import { useColorScheme } from 'react-native';
import { render, screen, userEvent } from '@testing-library/react-native';
import { CountryPickerModal, PrimaryButton } from '../src/components';
import { HomeScreen } from '../src/screens/HomeScreen';
import { darkColors, lightColors } from '../src/theme';
import i18n from '../src/i18n';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockScheme = useColorScheme as jest.Mock;

describe('dark mode', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it.each([
    ['dark', darkColors],
    ['light', lightColors],
  ])(
    'HomeScreen uses the %s palette, including errors',
    async (scheme, colors) => {
      mockScheme.mockReturnValue(scheme);
      const user = userEvent.setup();
      await render(<HomeScreen />);
      expect(screen.getByText('QuickZap')).toHaveStyle({ color: colors.text });
      await user.press(screen.getByText('Open on WhatsApp'));
      expect(screen.getByRole('alert')).toHaveStyle({ color: colors.error });
    },
  );

  it('PrimaryButton follows the palette', async () => {
    mockScheme.mockReturnValue('dark');
    await render(<PrimaryButton label="Go" onPress={jest.fn()} />);
    expect(screen.getByText('Go')).toHaveStyle({ color: darkColors.onPrimary });
  });

  it('CountryPickerModal follows the palette', async () => {
    mockScheme.mockReturnValue('dark');
    await render(
      <CountryPickerModal visible onSelect={jest.fn()} onClose={jest.fn()} />,
    );
    expect(screen.getByText('Afghanistan')).toHaveStyle({
      color: darkColors.text,
    });
  });
});
