import React from 'react';
import { render, screen } from '@testing-library/react-native';
import * as flags from 'country-flag-icons/string/3x2';
import { COUNTRIES } from '../src/data';
import { Flag } from '../src/components';

describe('Flag', () => {
  it('has an SVG for every listed country', () => {
    const available = flags as Record<string, string>;
    COUNTRIES.forEach(country => {
      expect(available[country.iso]).toContain('<svg');
    });
  });

  it('renders a flag with default and custom width', async () => {
    await render(<Flag iso="br" />);
    await render(<Flag iso="US" width={40} />);
  });

  it('renders an empty frame for an unknown country', async () => {
    await render(<Flag iso="ZZ" />);
    expect(screen.toJSON()).not.toBeNull();
  });
});
