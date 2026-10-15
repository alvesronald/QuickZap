import { darkColors, lightColors, type Palette } from '../src/theme';

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map(index => {
    const channel = parseInt(hex.slice(index, index + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

describe.each([
  ['light', lightColors],
  ['dark', darkColors],
])('%s palette contrast', (_name, colors: Palette) => {
  it.each([
    ['text', 'background'],
    ['text', 'surface'],
    ['text', 'inputBackground'],
    ['textMuted', 'background'],
    ['textMuted', 'surface'],
    ['textMuted', 'inputBackground'],
    ['onPrimary', 'primary'],
    ['error', 'surface'],
    ['primary', 'surface'],
  ] as const)('%s on %s is at least 4.5:1', (foreground, background) => {
    expect(contrast(colors[foreground], colors[background])).toBeGreaterThan(
      4.5,
    );
  });
});
