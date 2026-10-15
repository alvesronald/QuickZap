import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { COUNTRIES, filterCountries, type Country } from '../data';
import { useTheme } from '../hooks/useTheme';
import { Flag } from './Flag';

interface CountryPickerModalProps {
  visible: boolean;
  onSelect: (country: Country) => void;
  onClose: () => void;
}

export function CountryPickerModal({
  visible,
  onSelect,
  onClose,
}: CountryPickerModalProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [query, setQuery] = useState('');

  const nameOf = (country: Country) => t(`countries.${country.iso}` as never);
  const data = useMemo(
    () => filterCountries(COUNTRIES, query, nameOf),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, t],
  );

  const handleSelect = (country: Country) => {
    setQuery('');
    onSelect(country);
    onClose();
  };

  return (
    <Modal
      testID="country-modal"
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('picker.search')}
            placeholderTextColor={colors.textMuted}
            style={[
              styles.search,
              {
                backgroundColor: colors.inputBackground,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t('picker.close')}
            onPress={onClose}
          >
            <Text style={[styles.close, { color: colors.primary }]}>
              {t('picker.close')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.iso}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => handleSelect(item)}
              style={[styles.row, { borderColor: colors.border }]}
            >
              <View style={styles.flag}>
                <Flag iso={item.iso} width={32} />
              </View>
              <Text style={[styles.name, { color: colors.text }]}>
                {nameOf(item)}
              </Text>
              <Text style={[styles.dial, { color: colors.textMuted }]}>
                +{item.dialCode}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 56 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 12,
  },
  close: { fontSize: 16, fontWeight: '600' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  flag: { marginRight: 12 },
  name: { flex: 1, fontSize: 16 },
  dial: { fontSize: 15 },
});
