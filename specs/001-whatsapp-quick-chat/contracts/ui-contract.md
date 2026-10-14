# UI & Integration Contract

## Home screen (testIDs/labels via i18n)
- App header: ZapIcon + `home.appName`
- Heading `home.title`, description `home.subtitle`
- Country selector (accessibilityLabel `home.selectCountry`) showing flag + `+code`; opens picker modal with search (`picker.search`)
- Phone input (placeholder `home.phonePlaceholder`, `keyboardType="phone-pad"`)
- Button `home.openWhatsApp` (disabled while opening)
- Error text (`errors.invalidNumber` | `errors.cannotOpen`), `accessibilityRole="alert"`
- Privacy note `home.privacy` with ShieldIcon
- Language switcher `home.toggleLanguage`

## External: WhatsApp deep links
1. `whatsapp://send?phone=<digits>` (primary)
2. `https://wa.me/<digits>` (fallback on rejection)
`<digits>` = country dial code + national number, digits only, 8–15 chars. No `text` parameter in v1.

## Module contracts
- `sanitizeDigits(input: string): string`
- `buildFullNumber(dialCode: string, input: string): string`
- `isValidNumber(digits: string): boolean`
- `buildWhatsAppUrls(digits: string): { app: string; web: string }`
- `useWhatsAppChat(): { country, setCountry, number, setNumber, error, isOpening, submit }`
- `useTheme(): { scheme: 'light'|'dark'; colors: Palette }`
- `useLanguageToggle()`: unchanged API; additionally persists on change.
