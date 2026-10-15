import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { PhoneInputCard } from '../src/components';
import i18n from '../src/i18n';

const baseProps = {
  country: { iso: 'BR', dialCode: '55' },
  number: '',
  error: null,
  isOpening: false,
  onChangeNumber: jest.fn(),
  onSelectCountry: jest.fn(),
  onSubmit: jest.fn(),
};

describe('PhoneInputCard', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await i18n.changeLanguage('en');
  });

  it('renders the controls and privacy note, and forwards events', async () => {
    const user = userEvent.setup();
    await render(<PhoneInputCard {...baseProps} />);
    expect(
      screen.getByText('Safe. We never save your contacts.'),
    ).toBeOnTheScreen();
    expect(screen.queryByRole('alert')).toBeNull();
    await user.type(screen.getByPlaceholderText('Phone number'), '1');
    expect(baseProps.onChangeNumber).toHaveBeenCalledWith('1');
    await user.press(screen.getByText('Open on WhatsApp'));
    expect(baseProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['invalid', 'Enter a valid phone number.'],
    ['cannotOpen', 'Could not open WhatsApp. Please try again.'],
  ] as const)('shows the %s error as an alert', async (error, message) => {
    await render(<PhoneInputCard {...baseProps} error={error} />);
    expect(screen.getByRole('alert')).toHaveTextContent(message);
  });

  it('opens the picker and reports the chosen country', async () => {
    const user = userEvent.setup();
    await render(<PhoneInputCard {...baseProps} />);
    await user.press(screen.getByLabelText('Select country'));
    await user.type(
      screen.getByPlaceholderText('Search country or code'),
      'portugal',
    );
    await user.press(await screen.findByText('Portugal'));
    expect(baseProps.onSelectCountry).toHaveBeenCalledWith({
      iso: 'PT',
      dialCode: '351',
    });
  });
});
