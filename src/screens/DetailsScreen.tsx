import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { RootStackScreenProps } from '../navigation/types';

export function DetailsScreen({
  route,
  navigation,
}: RootStackScreenProps<'Details'>) {
  const { t } = useTranslation();
  const { itemId, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ?? t('details.title')}</Text>
      <Text style={styles.paramText}>
        {t('details.itemId', { id: itemId })}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{t('details.goBack')}</Text>
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
