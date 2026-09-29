module.exports = {
  preset: '@react-native/jest-preset',
  watchman: false,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-svg)',
  ],
};
