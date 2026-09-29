import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ZapIcon } from '../components/ZapIcon';
import { useLanguageToggle } from '../hooks';
import type { RootStackScreenProps } from '../navigation/types';

export function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const { t, toggleLanguage } = useLanguageToggle();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ZapIcon size={56} color="#eab308" />
      </View>
      <Text style={styles.title}>{t('home.title')}</Text>
      <Text style={styles.subtitle}>{t('home.subtitle')}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Details', {
            itemId: '42',
            title: t('details.title'),
          })
        }
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{t('home.goToDetails')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={toggleLanguage}
        activeOpacity={0.8}
      >
        <Text style={styles.secondaryButtonText}>
          {t('home.toggleLanguage')}
        </Text>
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
  iconContainer: {
    marginBottom: 12,
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
    lineHeight: 22,
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
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  secondaryButtonText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '500',
  },
});
