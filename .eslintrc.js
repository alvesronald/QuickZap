module.exports = {
  root: true,
  extends: '@react-native',
  env: {
    jest: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
