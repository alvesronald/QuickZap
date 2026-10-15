// Contrast (WCAG): text pairs >= 4.5:1 in both palettes; enforced in __tests__/colors.test.ts.
export interface Palette {
  background: string;
  surface: string;
  inputBackground: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  onPrimary: string;
  error: string;
}

export const lightColors: Palette = {
  background: '#eef5f1',
  surface: '#ffffff',
  inputBackground: '#eef5f1',
  text: '#0f2318',
  textMuted: '#4b5f54',
  border: '#d3e0d8',
  primary: '#0a7f47',
  onPrimary: '#ffffff',
  error: '#b42318',
};

export const darkColors: Palette = {
  background: '#0b1410',
  surface: '#15211b',
  inputBackground: '#0f1a15',
  text: '#eaf3ee',
  textMuted: '#9db1a5',
  border: '#2a3b32',
  primary: '#1fa463',
  onPrimary: '#04140b',
  error: '#ff8a80',
};
