import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Country } from '../data';
import { useTheme } from '../hooks/useTheme';
import { ChevronIcon } from './ChevronIcon';
import { Flag } from './Flag';

interface CountrySelectorProps {
  country: Country;
  onPress: () => void;
}

export function CountrySelector({ country, onPress }: CountrySelectorProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={t('home.selectCountry')}
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={styles.flag}>
        <Flag iso={country.iso} />
      </View>
      <Text style={[styles.code, { color: colors.text }]}>
        +{country.dialCode}
      </Text>
      <ChevronIcon color={colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  flag: { marginRight: 8 },
  code: { fontSize: 16, fontWeight: '700', marginRight: 6 },
});
