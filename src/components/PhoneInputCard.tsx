import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Country } from '../data';
import { useTheme } from '../hooks/useTheme';
import { CountryPickerModal } from './CountryPickerModal';
import { CountrySelector } from './CountrySelector';
import { PrimaryButton } from './PrimaryButton';
import { ShieldIcon } from './ShieldIcon';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PhoneInputCardProps {
  country: Country;
  number: string;
  error: 'invalid' | 'cannotOpen' | null;
  isOpening: boolean;
  onChangeNumber: (value: string) => void;
  onSelectCountry: (country: Country) => void;
  onSubmit: () => void;
}

export function PhoneInputCard({
  country,
  number,
  error,
  isOpening,
  onChangeNumber,
  onSelectCountry,
  onSubmit,
}: PhoneInputCardProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, shadowColor: colors.text },
      ]}
    >
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <CountrySelector
          country={country}
          onPress={() => setPickerVisible(true)}
        />
        <TextInput
          value={number}
          onChangeText={onChangeNumber}
          placeholder={t('home.phonePlaceholder')}
          placeholderTextColor={colors.textMuted}
          keyboardType="phone-pad"
          style={[styles.input, { color: colors.text }]}
        />
      </View>
      {error ? (
        <Text
          accessibilityRole="alert"
          style={[styles.error, { color: colors.error }]}
        >
          {t(
            error === 'invalid' ? 'errors.invalidNumber' : 'errors.cannotOpen',
          )}
        </Text>
      ) : null}
      <PrimaryButton
        label={t('home.openWhatsApp')}
        onPress={onSubmit}
        disabled={isOpening}
        icon={<WhatsAppIcon color={colors.onPrimary} />}
      />
      <View style={styles.privacy}>
        <ShieldIcon color={colors.primary} />
        <Text style={[styles.privacyText, { color: colors.textMuted }]}>
          {t('home.privacy')}
        </Text>
      </View>
      <CountryPickerModal
        visible={pickerVisible}
        onSelect={onSelectCountry}
        onClose={() => setPickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 12,
    marginBottom: 12,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 14 },
  error: { fontSize: 14, marginBottom: 12 },
  privacy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  privacyText: { fontSize: 12, marginLeft: 6 },
});
