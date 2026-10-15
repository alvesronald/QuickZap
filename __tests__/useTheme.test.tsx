import { renderHook } from '@testing-library/react-native';
import { useColorScheme } from 'react-native';
import { useTheme } from '../src/hooks';
import { darkColors, lightColors } from '../src/theme';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockScheme = useColorScheme as jest.Mock;

describe('useTheme', () => {
  it('returns the dark palette in dark mode', async () => {
    mockScheme.mockReturnValue('dark');
    const { result } = await renderHook(() => useTheme());
    expect(result.current).toEqual({ scheme: 'dark', colors: darkColors });
  });

  it('returns the light palette in light mode', async () => {
    mockScheme.mockReturnValue('light');
    const { result } = await renderHook(() => useTheme());
    expect(result.current).toEqual({ scheme: 'light', colors: lightColors });
  });

  it('falls back to light when the scheme is unknown', async () => {
    mockScheme.mockReturnValue(null);
    const { result } = await renderHook(() => useTheme());
    expect(result.current.scheme).toBe('light');
  });
});
