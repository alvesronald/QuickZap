import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LanguageSwitcher, PhoneInputCard, ZapIcon } from '../components';
import { useTheme, useWhatsAppChat } from '../hooks';

export function HomeScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const chat = useWhatsAppChat();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
    >
      <View style={styles.header}>
        <View style={styles.brand}>
          <View style={[styles.logo, { backgroundColor: colors.primary }]}>
            <ZapIcon size={18} color={colors.onPrimary} />
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>
            {t('home.appName')}
          </Text>
        </View>
        <LanguageSwitcher />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>
        {t('home.title')}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        {t('home.subtitle')}
      </Text>
      <PhoneInputCard
        country={chat.country}
        number={chat.number}
        error={chat.error}
        isOpening={chat.isOpening}
        onChangeNumber={chat.setNumber}
        onSelectCountry={chat.setCountry}
        onSubmit={chat.submit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 24 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  brand: { flexDirection: 'row', alignItems: 'center' },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appName: { fontSize: 18, fontWeight: '700' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 14, lineHeight: 20, marginBottom: 24 },
});
