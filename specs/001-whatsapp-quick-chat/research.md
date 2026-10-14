# Research: WhatsApp Quick Chat

## R1 — Launching a chat
- **Decision**: `Linking.openURL('whatsapp://send?phone=<digits>')`; if it rejects, try `https://wa.me/<digits>`; if that also rejects, show the "cannot open" error.
- **Rationale**: the custom scheme opens the app directly with no extra config on `openURL`. `wa.me` is the official universal link and lets the OS offer the store/web page when WhatsApp is absent (satisfies the "alternative" in US1-5). Skipping `canOpenURL` avoids needing `LSApplicationQueriesSchemes` / Android `<queries>` entries.
- **Alternatives**: `canOpenURL` pre-check (needs native config, unreliable); only `wa.me` (extra browser hop on some devices).

## R2 — Number normalization & validation
- **Decision**: strip all non-digits; if the raw input starts with `+`, treat it as already international; otherwise strip leading zeros (trunk prefix) and, if the digits already start with the selected dial code and the total would exceed 15, avoid duplication by treating them as international. Valid when final digits are 8–15 long (FR-004).
- **Rationale**: covers the spec edge cases with pure, easily 100%-tested functions.
- **Alternatives**: `libphonenumber-js` (heavy; per-country validity is beyond FR-004).

## R3 — Countries
- **Decision**: static typed array (ISO code, dial code, flag emoji derived from ISO code, name from i18n `countries.<ISO>`).
- **Rationale**: no dependency; emoji flags need no assets; names translated per language.
- **Alternatives**: `react-native-country-picker-modal` (extra dep, own styling/i18n).

## R4 — Persisting language
- **Decision**: AsyncStorage key `quickzap.language`; read at startup, applied via `i18n.changeLanguage`; default from device locale (`Intl.DateTimeFormat().resolvedOptions().locale`), fallback `pt`.
- **Rationale**: FR-008/009; `Intl` avoids a locale library. Spec assumes pt as default.
- **Alternatives**: `react-native-localize` (native dep), MMKV (heavier).

## R5 — Dark mode
- **Decision**: `useColorScheme()` from React Native inside `useTheme`, returning a palette from `src/theme/colors.ts`; components receive colors via the hook, styles built with `StyleSheet.create` in a per-theme factory.
- **Rationale**: updates live (FR-010) with no dependency; manual override is out of scope.

## R6 — Country picker UI
- **Decision**: RN `Modal` + `FlatList` + search `TextInput`.
- **Rationale**: built-in, testable, no extra dependency.
