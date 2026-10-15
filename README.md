# QuickZap

Open a WhatsApp chat with any phone number without saving the contact first.

- Pick a country code (default +55), type the number, tap **Open on WhatsApp**.
- Portuguese and English, following the device language; the choice is remembered.
- Light and dark themes that follow the device appearance.
- Phone numbers are never stored.

## Development

```bash
npm install
cd ios && bundle exec pod install && cd ..
npm run ios      # or: npm run android
npm run lint && npm run format:check && npm test -- --coverage
```

Tests require 100% coverage. See `specs/001-whatsapp-quick-chat/` for the spec, plan and tasks.
