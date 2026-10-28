module.exports = {
  preset: '@react-native/jest-preset',
  watchman: false,
  testTimeout: 30000,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/index.ts'],
  coverageThreshold: {
    global: { statements: 100, branches: 100, functions: 100, lines: 100 },
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-svg|country-flag-icons)',
  ],
};
