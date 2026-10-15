import React from 'react';
import { Linking } from 'react-native';
import { render, screen, userEvent } from '@testing-library/react-native';
import { HomeScreen } from '../src/screens/HomeScreen';
import i18n from '../src/i18n';

const openURL = jest.spyOn(Linking, 'openURL');

describe('HomeScreen', () => {
  beforeEach(async () => {
    openURL.mockReset();
    openURL.mockResolvedValue(undefined);
    await i18n.changeLanguage('en');
  });

  it('opens a WhatsApp chat for a formatted number', async () => {
    const user = userEvent.setup();
    await render(<HomeScreen />);
    expect(screen.getByText('QuickZap')).toBeOnTheScreen();
    await user.type(
      screen.getByPlaceholderText('Phone number'),
      '11 91234-5678',
    );
    await user.press(screen.getByText('Open on WhatsApp'));
    expect(openURL).toHaveBeenCalledWith('whatsapp://send?phone=5511912345678');
  });

  it('blocks an empty number with an error', async () => {
    const user = userEvent.setup();
    await render(<HomeScreen />);
    await user.press(screen.getByText('Open on WhatsApp'));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a valid phone number.',
    );
    expect(openURL).not.toHaveBeenCalled();
  });

  it('uses the chosen country code', async () => {
    const user = userEvent.setup();
    await render(<HomeScreen />);
    await user.press(screen.getByLabelText('Select country'));
    await user.type(
      screen.getByPlaceholderText('Search country or code'),
      'united states',
    );
    await user.press(await screen.findByText('United States'));
    await user.type(screen.getByPlaceholderText('Phone number'), '4155552671');
    await user.press(screen.getByText('Open on WhatsApp'));
    expect(openURL).toHaveBeenCalledWith('whatsapp://send?phone=14155552671');
  });

  it('translates every string, including errors, when switching language', async () => {
    const user = userEvent.setup();
    await render(<HomeScreen />);
    await user.press(screen.getByText('Mudar para Português'));
    expect(screen.getByText('Inicie um chat na hora')).toBeOnTheScreen();
    await user.press(screen.getByText('Abrir no WhatsApp'));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Digite um número de telefone válido.',
    );
    expect(
      screen.getByText('Seguro. Nunca salvamos seus contatos.'),
    ).toBeOnTheScreen();
  });
});
