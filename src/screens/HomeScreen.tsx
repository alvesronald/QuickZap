import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import type { RootStackScreenProps } from '../navigation/types';

export function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚡ QuickZap</Text>
      <Text style={styles.subtitle}>React Navigation is configured successfully!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Details', {
            itemId: '42',
            title: 'QuickZap Details',
          })
        }
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
