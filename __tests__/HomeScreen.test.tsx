import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { HomeScreen } from '../src/screens/HomeScreen';
import i18n from '../src/i18n';

describe('HomeScreen', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders title, navigates, and switches language', async () => {
    const mockNavigate = jest.fn();
    const navigation = { navigate: mockNavigate } as any;
    const route = {} as any;

    const user = userEvent.setup();
    await render(<HomeScreen navigation={navigation} route={route} />);

    expect(screen.getByText('QuickZap')).toBeOnTheScreen();
    expect(
      screen.getByText(
        /React Navigation, SVG, and i18n are configured successfully!/i,
      ),
    ).toBeOnTheScreen();

    const button = screen.getByText('Go to Details');
    expect(button).toBeOnTheScreen();

    await user.press(button);
    expect(mockNavigate).toHaveBeenCalledWith('Details', {
      itemId: '42',
      title: 'QuickZap Details',
    });

    // Test language toggle to Portuguese
    const langButton = screen.getByText('Mudar para Português');
    await user.press(langButton);

    expect(
      screen.getByText(
        /React Navigation, SVG e i18n configurados com sucesso!/i,
      ),
    ).toBeOnTheScreen();
    expect(screen.getByText('Ir para Detalhes')).toBeOnTheScreen();
  });
});
