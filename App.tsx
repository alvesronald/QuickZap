import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from './src/hooks';
import { initLanguage } from './src/i18n';
import { RootNavigator } from './src/navigation';

function App() {
  const { scheme } = useTheme();

  useEffect(() => {
    initLanguage();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
