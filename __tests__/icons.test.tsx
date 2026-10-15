import React from 'react';
import { render } from '@testing-library/react-native';
import {
  ChevronIcon,
  ShieldIcon,
  WhatsAppIcon,
  ZapIcon,
} from '../src/components';

describe('icons', () => {
  it.each([
    ['WhatsAppIcon', WhatsAppIcon],
    ['ChevronIcon', ChevronIcon],
    ['ShieldIcon', ShieldIcon],
    ['ZapIcon', ZapIcon],
  ])('%s renders with defaults and custom props', async (_name, Icon) => {
    await render(<Icon />);
    await render(<Icon size={30} color="#123456" />);
  });
});
