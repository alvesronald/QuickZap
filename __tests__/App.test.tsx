import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import App from '../App';
import i18n from '../src/i18n';

beforeEach(async () => {
  await i18n.changeLanguage('en');
});

test('renders App and navigates between screens', async () => {
  const user = userEvent.setup();
  await render(<App />);

  // Verify HomeScreen elements
  expect(screen.getByText('QuickZap')).toBeOnTheScreen();
  expect(screen.getByText('Go to Details')).toBeOnTheScreen();

  // Navigate to Details
  await user.press(screen.getByText('Go to Details'));

  // Verify DetailsScreen elements
  expect(await screen.findByText('QuickZap Details')).toBeOnTheScreen();
  expect(screen.getByText('Item ID: 42')).toBeOnTheScreen();
  expect(screen.getByText('Go Back')).toBeOnTheScreen();
});
