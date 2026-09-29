import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import type { RootStackScreenProps } from '../navigation/types';

export function DetailsScreen({
  route,
  navigation,
}: RootStackScreenProps<'Details'>) {
  const { itemId, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ?? 'Details Screen'}</Text>
      <Text style={styles.paramText}>Item ID: {itemId}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Go Back</Text>
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
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  paramText: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#334155',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
