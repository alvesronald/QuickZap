import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../App';
import i18n from '../src/i18n';

beforeEach(async () => {
  await i18n.changeLanguage('en');
});

test('renders the Home screen', async () => {
  await render(<App />);
  expect(await screen.findByText('QuickZap')).toBeOnTheScreen();
});
