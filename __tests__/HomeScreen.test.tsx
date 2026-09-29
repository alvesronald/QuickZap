import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { HomeScreen } from '../src/screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders title and navigation button', async () => {
    const mockNavigate = jest.fn();
    const navigation = { navigate: mockNavigate } as any;
    const route = {} as any;

    const user = userEvent.setup();
    await render(<HomeScreen navigation={navigation} route={route} />);

    expect(screen.getByText('QuickZap')).toBeOnTheScreen();
    expect(
      screen.getByText(/React Navigation and react-native-svg/i),
    ).toBeOnTheScreen();

    const button = screen.getByText('Go to Details');
    expect(button).toBeOnTheScreen();

    await user.press(button);
    expect(mockNavigate).toHaveBeenCalledWith('Details', {
      itemId: '42',
      title: 'QuickZap Details',
    });
  });
});
