# Feature Specification: WhatsApp Quick Chat

**Feature Branch**: `001-whatsapp-quick-chat` (not created — see note in report)
**Created**: 2026-10-08
**Status**: Draft
**Input**: User description: "Create an application that informs a phone number and opens WhatsApp to talk with the contact without needing to save it, it should have internationalization and dark mode"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open a WhatsApp chat from a phone number (Priority: P1)

A user types a phone number on the home screen, optionally picks the country calling code
(default +55, Brazil), and taps "Open on WhatsApp". WhatsApp opens directly on a conversation
with that number, without the user having to add it to their contacts.

**Why this priority**: This is the entire purpose of the app; without it there is no product.

**Independent Test**: Enter a valid number, tap the button, and verify WhatsApp is launched on a
chat with the full international number.

**Acceptance Scenarios**:

1. **Given** the home screen with country code +55, **When** the user enters "11 91234-5678" and
   taps "Open on WhatsApp", **Then** WhatsApp opens a chat with +55 11 91234-5678.
2. **Given** the user selected a different country code, **When** they enter a number and tap the
   button, **Then** the chat opens using the selected code plus the entered number.
3. **Given** the number field is empty or incomplete, **When** the user taps the button, **Then**
   WhatsApp is not opened and a clear message explains the number is invalid.
4. **Given** the user typed spaces, dashes, or parentheses, **When** they tap the button, **Then**
   these characters are ignored and the chat opens with digits only.
5. **Given** WhatsApp is not installed on the device, **When** the user taps the button, **Then**
   the user sees a friendly message (or is offered an alternative way to continue the chat).

---

### User Story 2 - Choose the app language (Priority: P2)

A user can use the app in their own language and switch language at any time. All visible text,
including validation and error messages, is translated.

**Why this priority**: Expands the audience and was explicitly requested.

**Independent Test**: Switch language from the home screen and verify every visible string changes.

**Acceptance Scenarios**:

1. **Given** the device language is supported, **When** the app is first opened, **Then** it
   displays in that language.
2. **Given** the device language is not supported, **When** the app is first opened, **Then** it
   displays in the default language.
3. **Given** the user toggles the language, **When** returning to the home screen, **Then** all
   texts, including error messages, appear in the chosen language, and the choice is remembered on
   next launch.

---

### User Story 3 - Dark mode (Priority: P3)

The app offers a light and a dark appearance. By default it follows the device appearance setting,
and all screens and states remain readable and visually consistent in both.

**Why this priority**: Improves comfort and was explicitly requested, but the app works without it.

**Independent Test**: Change the device appearance between light and dark and verify the app
updates with sufficient contrast on every element.

**Acceptance Scenarios**:

1. **Given** the device is in dark mode, **When** the app opens, **Then** it uses the dark theme.
2. **Given** the app is open, **When** the device appearance changes, **Then** the app updates
   immediately without restarting.
3. **Given** either theme, **When** an error message is shown, **Then** it remains legible.

---

### Edge Cases

- Number pasted with a leading "+" or country code already included (avoid duplicating the code).
- Number with a leading zero (trunk prefix) for the selected country.
- Very short or very long numbers (outside valid international length of up to 15 digits total).
- Letters or symbols typed or pasted into the number field.
- Rapid repeated taps on the button (only one chat launch).
- Device offline (opening a chat must not depend on this app having connectivity).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST present a home screen with the app name, a short explanation, a
  country code selector (with flag), a phone number field, and an "Open on WhatsApp" button.
- **FR-002**: The system MUST default the country code to +55 (Brazil) and let the user choose
  another country.
- **FR-003**: Users MUST be able to enter a phone number; non-digit formatting characters MUST be
  accepted and ignored.
- **FR-004**: The system MUST validate that the combined international number is plausible
  (digits only, between 8 and 15 digits including country code) before opening WhatsApp.
- **FR-005**: The system MUST open WhatsApp on a chat with the full international number without
  requiring the contact to be saved.
- **FR-006**: The system MUST show a clear, translated message when the number is invalid or
  WhatsApp cannot be opened.
- **FR-007**: The system MUST NOT store, upload, or share the entered phone numbers; the home
  screen MUST state that contacts are never saved.
- **FR-008**: The system MUST support at least Portuguese (Brazil) and English, using the device
  language by default with a fallback, and let the user switch language manually.
- **FR-009**: The system MUST persist the user's language choice between launches.
- **FR-010**: The system MUST provide light and dark themes, following the device appearance and
  updating live when it changes.
- **FR-011**: All visible text MUST be translatable (no hard-coded strings), and all UI elements
  MUST remain legible in both themes.

### Key Entities

- **Phone Number Entry**: country calling code plus the national number typed by the user;
  transient, never persisted.
- **Country**: name, flag, and calling code available for selection.
- **User Preferences**: chosen language (and theme if overridden); the only data persisted.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can go from opening the app to being in a WhatsApp chat in under 15 seconds
  and no more than 3 interactions (type number, tap button).
- **SC-002**: 100% of valid numbers entered, in any common formatting, open the correct chat.
- **SC-003**: 100% of invalid inputs are blocked with a clear message and never open WhatsApp.
- **SC-004**: 100% of visible text is displayed in the selected language, with no untranslated
  strings in the supported languages.
- **SC-005**: All text and controls meet a readable contrast level in both light and dark themes.
- **SC-006**: 90% of first-time users complete their first chat launch without help.

## Assumptions

- Target users are mobile users who already use WhatsApp (or WhatsApp Business) on the same device.
- Supported languages for v1 are Portuguese (Brazil) and English; default is Portuguese
  (matching the provided design).
- Theme follows the device setting; a manual theme override is out of scope for v1.
- No accounts, history, favorites, or pre-filled message text in v1.
- Country list covers all countries with calling codes; default +55.
- Opening WhatsApp relies on the device's installed WhatsApp; the app does not send messages itself.
- Visual design follows the provided mockup (green brand color, card with country selector,
  phone field, primary button, and privacy note).
