import React from 'react';
import {
  fireEvent,
  render,
  screen,
  userEvent,
} from '@testing-library/react-native';
import { CountryPickerModal } from '../src/components';
import i18n from '../src/i18n';

describe('CountryPickerModal', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders nothing when hidden', async () => {
    await render(
      <CountryPickerModal
        visible={false}
        onSelect={jest.fn()}
        onClose={jest.fn()}
      />,
    );
    expect(screen.queryByPlaceholderText('Search country or code')).toBeNull();
  });

  it('filters by search and selects a country', async () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    const user = userEvent.setup();
    await render(
      <CountryPickerModal visible onSelect={onSelect} onClose={onClose} />,
    );
    await user.type(
      screen.getByPlaceholderText('Search country or code'),
      'portugal',
    );
    expect(screen.queryByText('Brazil')).toBeNull();
    await user.press(screen.getByText('Portugal'));
    expect(onSelect).toHaveBeenCalledWith({ iso: 'PT', dialCode: '351' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes via the close button and the hardware back request', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    await render(
      <CountryPickerModal visible onSelect={jest.fn()} onClose={onClose} />,
    );
    await user.press(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent(screen.getByTestId('country-modal'), 'requestClose');
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
