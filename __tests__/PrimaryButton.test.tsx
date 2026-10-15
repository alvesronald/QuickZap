import React from 'react';
import { Text } from 'react-native';
import { render, screen, userEvent } from '@testing-library/react-native';
import { PrimaryButton } from '../src/components';

describe('PrimaryButton', () => {
  it('renders the label and icon and handles press', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(
      <PrimaryButton label="Go" onPress={onPress} icon={<Text>i</Text>} />,
    );
    expect(screen.getByText('i')).toBeOnTheScreen();
    await user.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not press when disabled and renders without icon', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(<PrimaryButton label="Go" onPress={onPress} disabled />);
    await user.press(screen.getByText('Go'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
