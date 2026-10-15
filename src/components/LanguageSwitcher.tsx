import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useLanguageToggle } from '../hooks/useLanguageToggle';
import { useTheme } from '../hooks/useTheme';

export function LanguageSwitcher() {
  const { t, toggleLanguage } = useLanguageToggle();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={toggleLanguage}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, { color: colors.primary }]}>
        {t('home.toggleLanguage')}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600' },
});
