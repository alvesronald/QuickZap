import { useColorScheme } from 'react-native';
import { darkColors, lightColors, type Palette } from '../theme';

export type ColorScheme = 'light' | 'dark';

export function useTheme(): { scheme: ColorScheme; colors: Palette } {
  const scheme: ColorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return { scheme, colors: scheme === 'dark' ? darkColors : lightColors };
}
