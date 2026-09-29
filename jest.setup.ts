// Extends Jest matchers with React Native Testing Library custom matchers
import '@testing-library/react-native/matchers';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import './src/i18n';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
