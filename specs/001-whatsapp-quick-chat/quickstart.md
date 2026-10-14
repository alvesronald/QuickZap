# Quickstart

```bash
npm install
npm run ios      # or: npm run android
npm run lint && npm run format:check && npm test -- --coverage
```

## Manual verification
1. Open the app (pt by default): enter `11 91234-5678`, tap **Abrir no WhatsApp** → chat with +55 11 91234-5678 opens.
2. Empty/short number → error shown, WhatsApp not opened.
3. Change country in the picker → button uses the new code.
4. Toggle language, relaunch → language persisted.
5. Switch device to dark mode → app updates live.
6. Device without WhatsApp → fallback to wa.me / friendly error.
