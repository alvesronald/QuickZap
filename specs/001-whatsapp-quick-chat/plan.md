# Implementation Plan: WhatsApp Quick Chat

**Branch**: `001-whatsapp-quick-chat` | **Date**: 2026-10-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-whatsapp-quick-chat/spec.md`

## Summary

Replace the placeholder Home screen with the QuickZap quick-chat screen: country-code picker
(default +55), phone field, validation, and an "Open on WhatsApp" button that launches
`whatsapp://send?phone=<digits>` (falling back to `https://wa.me/<digits>`). Add persisted
language selection (pt default, en) and light/dark themes that follow the device. All logic is
split into pure utilities and hooks; UI into small prop-driven components.

## Technical Context

**Language/Version**: TypeScript 6 (strict), React 19.2, React Native 0.87
**Primary Dependencies**: React Navigation (existing), react-i18next (existing), react-native-svg (existing), `@react-native-async-storage/async-storage` (new — see Constitution Check)
**Storage**: AsyncStorage, only for the language preference (`quickzap.language`). Phone numbers are never persisted.
**Testing**: Jest + @testing-library/react-native, 100% coverage threshold
**Target Platform**: iOS and Android
**Project Type**: mobile-app
**Performance Goals**: number → WhatsApp chat in ≤ 3 interactions; country list scrolls smoothly (FlatList)
**Constraints**: offline-capable (no network calls by the app); no hard-coded strings; StyleSheet only
**Scale/Scope**: 1 screen (Home) + country picker modal; ~240 countries in a static list

## Constitution Check

*GATE: passed before Phase 0; re-checked after Phase 1 — still passing.*

- [x] Reusable components/hooks identified (new vs. reused); screens only compose them — see Structure
- [x] Tests (Jest + RNTL) planned for 100% coverage — one test file per unit; `jest.config.js` gets `coverageThreshold` 100 (currently missing; added as a task)
- [x] ESLint/Prettier compliance; strict TS, no `any`
- [x] StyleSheet only, `react-native-svg` for icons (WhatsApp, chevron, shield), all strings via i18n
- [x] New dependency justified: AsyncStorage is required by FR-009 (persist language) and RN has no built-in persistent storage. Nothing in the existing stack duplicates it.

## Project Structure

### Documentation (this feature)

```text
specs/001-whatsapp-quick-chat/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/ui-contract.md
└── tasks.md             # created by /speckit.tasks
```

### Source Code (repository root)

```text
src/
├── components/                (NEW unless noted)
│   ├── ZapIcon.tsx            (REUSED)
│   ├── WhatsAppIcon.tsx, ChevronIcon.tsx, ShieldIcon.tsx
│   ├── PrimaryButton.tsx
│   ├── CountrySelector.tsx    (trigger showing flag + code)
│   ├── CountryPickerModal.tsx (searchable list)
│   ├── PhoneInputCard.tsx     (selector + input + button + error + privacy note)
│   ├── LanguageSwitcher.tsx
│   └── index.ts
├── hooks/
│   ├── useLanguageToggle.ts   (REUSED, extended to persist)
│   ├── useTheme.ts            (NEW; useColorScheme → palette)
│   ├── useWhatsAppChat.ts     (NEW; state, validation, launching)
│   └── index.ts
├── utils/
│   ├── phone.ts               (sanitize, normalize, validate, build URLs)
│   └── index.ts
├── data/countries.ts          (NEW; static list: code, name key, flag, dial)
├── theme/colors.ts            (NEW; light + dark palettes)
├── i18n/                      (REUSED; new keys; restore saved language on init)
├── screens/HomeScreen.tsx     (REWRITTEN to compose only)
└── screens/DetailsScreen.tsx  (REMOVED with its route — placeholder, out of scope)
__tests__/                     (one test file per unit above)
```

**Structure Decision**: single React Native app following the existing `src/` layout; no backend.

## Complexity Tracking

No violations.
