---
description: "Task list for WhatsApp Quick Chat"
---

# Tasks: WhatsApp Quick Chat

**Input**: Design documents in `/specs/001-whatsapp-quick-chat/` (plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md)
**Tests**: MANDATORY (constitution): Jest + React Native Testing Library, 100% coverage. Write each test first and confirm it fails before implementing.
**Format**: `- [ ] ID [P?] [Story] Description with path` — [P] = different files, no dependency on incomplete tasks.
**Conventions**: StyleSheet only, strings via i18n (add keys to BOTH `src/i18n/locales/en.ts` and `pt.ts`), strict TS, no `any`, each folder exposes an `index.ts`. UI reference: the QuickZap mockup (green brand `#0b8a4f`-like primary button, rounded card, flag + `+55` selector, privacy note).

## Phase 1: Setup

- [ ] T001 Install `@react-native-async-storage/async-storage` (`npm install`), run `cd ios && bundle exec pod install` if pods are present, and add its official jest mock to `jest.setup.ts` (`jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'))`)
- [ ] T002 [P] Add `collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/index.ts']` and `coverageThreshold: { global: { statements: 100, branches: 100, functions: 100, lines: 100 } }` to `jest.config.js`
- [ ] T003 [P] Create empty folders with `index.ts` barrels: `src/utils/index.ts`, `src/theme/index.ts`, `src/data/index.ts`, `src/components/index.ts` (export existing `ZapIcon`)

## Phase 2: Foundational (blocks all stories)

- [ ] T004 [P] Create light and dark palettes (`background`, `surface`, `text`, `textMuted`, `border`, `primary`, `onPrimary`, `error`, `inputBackground`) typed as `Palette` in `src/theme/colors.ts`
- [ ] T005 [P] Test then implement `useTheme` in `__tests__/useTheme.test.tsx` and `src/hooks/useTheme.ts`: returns `{ scheme, colors }` from `useColorScheme()` (mock it for light, dark, and `null` → light); export from `src/hooks/index.ts`
- [ ] T006 [P] Create icon components `WhatsAppIcon`, `ChevronIcon`, `ShieldIcon` (props `size`, `color`, react-native-svg) in `src/components/` with a render test in `__tests__/icons.test.tsx`; export from `src/components/index.ts`
- [ ] T007 [P] Test then implement `PrimaryButton` (props `label`, `onPress`, `disabled?`, `icon?: ReactNode`; uses `useTheme`; `accessibilityRole="button"`) in `__tests__/PrimaryButton.test.tsx` and `src/components/PrimaryButton.tsx`
- [ ] T008 Remove the placeholder Details feature: delete `src/screens/DetailsScreen.tsx`, remove the `Details` route from `src/navigation/types.ts` and `RootNavigator.tsx`, set `headerShown: false` on the stack, drop `details.*` i18n keys, and update `App.tsx` to use `useTheme` for `StatusBar`. Update `__tests__/App.test.tsx` to only assert the Home screen renders (HomeScreen test is rewritten in T017)

**Checkpoint**: theme, icons, button and clean navigation ready.

## Phase 3: User Story 1 — Open a WhatsApp chat from a phone number (P1) 🎯 MVP

**Goal**: type a number, pick country, tap button → WhatsApp chat opens; invalid input blocked with message.
**Independent test**: valid number triggers `Linking.openURL` with the correct URL; invalid never does.

### Tests first

- [ ] T009 [P] [US1] Write `__tests__/phone.test.ts` for `src/utils/phone.ts` covering: `sanitizeDigits` (spaces, dashes, parentheses, letters), `buildFullNumber` (plain national number, leading `+` treated as international, leading zero trunk prefix removed, dial code already included not duplicated), `isValidNumber` (7 → false, 8 → true, 15 → true, 16 → false, empty → false), `buildWhatsAppUrls` (`whatsapp://send?phone=…`, `https://wa.me/…`)
- [ ] T010 [P] [US1] Write `__tests__/countries.test.ts`: every entry has unique 2-letter `iso`, digit-only `dialCode`; `getFlagEmoji('BR')` → 🇧🇷; `DEFAULT_COUNTRY` is BR/55; `filterCountries(list, query, nameOf)` matches by name, ISO, or dial code (with/without `+`), case-insensitive
- [ ] T011 [P] [US1] Write `__tests__/useWhatsAppChat.test.tsx` with `renderHook`: default country BR; `submit` with invalid number sets `error='invalid'` and does not call `Linking.openURL`; valid number calls app URL; app URL rejection falls back to wa.me; both rejecting sets `error='cannotOpen'`; editing number or country clears error; second `submit` while `isOpening` is ignored (single launch)
- [ ] T012 [P] [US1] Write component tests: `__tests__/CountrySelector.test.tsx` (shows flag + `+code`, calls `onPress`), `__tests__/CountryPickerModal.test.tsx` (hidden when not visible, lists countries, search filters, selecting calls `onSelect` and `onClose`), `__tests__/PhoneInputCard.test.tsx` (renders selector, input, button, privacy note; shows error text with `accessibilityRole="alert"`; forwards text changes and press)

### Implementation

- [ ] T013 [P] [US1] Implement `sanitizeDigits`, `buildFullNumber`, `isValidNumber`, `buildWhatsAppUrls` in `src/utils/phone.ts` per research R2 and contracts; export from `src/utils/index.ts`
- [ ] T014 [P] [US1] Create `src/data/countries.ts`: `Country = { iso: string; dialCode: string }`, full list of ISO countries with calling codes, `DEFAULT_COUNTRY` (BR/55), `getFlagEmoji(iso)` (regional indicator symbols), `filterCountries`; export from `src/data/index.ts`
- [ ] T015 [US1] Add i18n keys to `en.ts` and `pt.ts` (pt is default copy from the mockup): `home.appName` "QuickZap", `home.title` "Inicie um chat na hora"/"Start a chat instantly", `home.subtitle`, `home.phonePlaceholder` "Número de telefone", `home.selectCountry`, `home.openWhatsApp` "Abrir no WhatsApp", `home.privacy` "Seguro. Nunca salvamos seus contatos.", `picker.search`, `picker.close`, `errors.invalidNumber`, `errors.cannotOpen`, and `countries.<ISO>` for every country in T014 (type-checked against `en`)
- [ ] T016 [US1] Implement `useWhatsAppChat` in `src/hooks/useWhatsAppChat.ts` (state `country`, `number`, `error`, `isOpening`; `submit` per data-model state machine, using `Linking.openURL` with fallback); export from `src/hooks/index.ts`
- [ ] T017 [P] [US1] Implement `CountrySelector` (`src/components/CountrySelector.tsx`, flag + `+code` + `ChevronIcon`, `accessibilityLabel` from `home.selectCountry`) and `CountryPickerModal` (`src/components/CountryPickerModal.tsx`: `Modal` + search `TextInput` + `FlatList`, names via `t('countries.<iso>')`)
- [ ] T018 [US1] Implement `PhoneInputCard` in `src/components/PhoneInputCard.tsx` (props: `country`, `number`, `error`, `isOpening`, `onChangeNumber`, `onSelectCountry`, `onSubmit`; composes selector, `TextInput keyboardType="phone-pad"`, `PrimaryButton` with `WhatsAppIcon`, error text, `ShieldIcon` + privacy note; owns picker visibility)
- [ ] T019 [US1] Rewrite `src/screens/HomeScreen.tsx` to compose header (`ZapIcon` in green circle + `home.appName`), heading, subtitle, and `PhoneInputCard` wired to `useWhatsAppChat`; rewrite `__tests__/HomeScreen.test.tsx` for the end-to-end flows (valid number opens WhatsApp URL, empty number shows error, changing country changes URL, formatted input `11 91234-5678`)

**Checkpoint**: US1 works and is fully tested; MVP.

## Phase 4: User Story 2 — Choose the app language (P2)

**Goal**: pt/en, device language by default, manual switch, persisted.
**Independent test**: toggle changes every string and survives restart.

- [ ] T020 [P] [US2] Write `__tests__/languageStorage.test.ts` for `src/i18n/languageStorage.ts`: `loadLanguage` returns saved `pt`/`en`, ignores invalid values, returns `null` when empty; `saveLanguage` writes key `quickzap.language`; `detectDeviceLanguage` returns `pt` for `pt-BR`/`pt-PT`, `en` for `en-US`, `pt` fallback for other locales (mock `Intl`)
- [ ] T021 [P] [US2] Write `__tests__/LanguageSwitcher.test.tsx` and extend `__tests__/useLanguageToggle.test.tsx`: changing language persists via `saveLanguage`; switcher label shows the *other* language and pressing it toggles
- [ ] T022 [US2] Implement `src/i18n/languageStorage.ts` (`loadLanguage`, `saveLanguage`, `detectDeviceLanguage`) and add `initLanguage()` to `src/i18n/index.ts` that applies saved → device → `pt`; set `fallbackLng` to `pt`, initial `lng` `pt`; call `initLanguage()` from `App.tsx` on mount (tests in `jest.setup.ts` stay deterministic by setting `en` per test)
- [ ] T023 [US2] Update `useLanguageToggle` in `src/hooks/useLanguageToggle.ts` so `changeLanguage` and `toggleLanguage` also call `saveLanguage`
- [ ] T024 [US2] Implement `LanguageSwitcher` in `src/components/LanguageSwitcher.tsx` (uses `useLanguageToggle`, label from `home.toggleLanguage`), place it in `HomeScreen` header, and add a HomeScreen test asserting all visible strings (including the validation error) switch to the other language

**Checkpoint**: US1 + US2 independently verified.

## Phase 5: User Story 3 — Dark mode (P3)

**Goal**: light/dark follow device live, readable everywhere.
**Independent test**: mocking `useColorScheme` dark yields dark palette on every component.

- [ ] T025 [US3] Audit every component/screen so no hex color is hard-coded outside `src/theme/colors.ts`; build styles from `useTheme().colors` (memoized `StyleSheet.create` factory) in `PrimaryButton`, `CountrySelector`, `CountryPickerModal`, `PhoneInputCard`, `LanguageSwitcher`, `HomeScreen`
- [ ] T026 [US3] Add dark-mode tests: `HomeScreen` rendered with `useColorScheme` mocked to `'dark'` asserts dark background/text colors from the palette (including the error message color) and re-rendering with `'light'` updates them; add equivalent assertions to `PrimaryButton` and `CountryPickerModal` tests
- [ ] T027 [US3] Verify palette contrast: text/background pairs ≥ 4.5:1 in both palettes (document the ratios in a comment in `src/theme/colors.ts` and add a small contrast-ratio test in `__tests__/colors.test.ts`)

## Phase 6: Polish & Cross-Cutting

- [ ] T028 [P] Run `npm run lint:fix && npm run format` and fix remaining issues; ensure `npx tsc --noEmit` is clean
- [ ] T029 Run `npm test -- --coverage`; add missing tests until all four metrics are 100% (no unjustified exclusions)
- [ ] T030 [P] Update `README.md` with the feature description and run instructions; walk through `specs/001-whatsapp-quick-chat/quickstart.md` manually on a simulator (iOS and Android) and note any deviations

## Dependencies & Order

- Phase 1 → Phase 2 → US1 (MVP) → US2 → US3 → Polish. US2 and US3 depend only on Phase 2 plus the US1 screen existing (they edit `HomeScreen`/components), so run them after US1.
- Within a story: tests (fail first) → utils/data → i18n → hooks → components → screen.
- T009–T012 parallel; T013–T014 parallel; T017 parallel with T016 (different files). T015 precedes components that read keys.

## Parallel Example (US1)

```text
T009, T010, T011, T012   # all test files
T013, T014               # utils + data
T016, T017               # hook + selector/modal
```

## Implementation Strategy

1. Finish Setup + Foundational. 2. Deliver US1 and validate on device (MVP). 3. Add US2, then US3. 4. Polish with 100% coverage gate before merge.
