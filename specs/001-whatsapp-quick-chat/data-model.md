# Data Model

## Country (static)
| Field | Type | Notes |
|---|---|---|
| iso | string (2 letters) | key, also i18n key `countries.<iso>` and flag source |
| dialCode | string | digits only, e.g. `55` |

Derived: `flag` (regional-indicator emoji from `iso`), `name` (translated).
Default: `BR` / `55`.

## PhoneNumberEntry (transient, component state only)
| Field | Type | Rules |
|---|---|---|
| country | Country | default BR |
| rawNumber | string | any input; sanitized on submit |
| error | `'invalid' \| 'cannotOpen' \| null` | cleared on edit |

Derived `fullNumber` = normalized digits incl. dial code; valid iff `/^\d{8,15}$/`.
State: `idle → (submit) → invalid | opening → idle | cannotOpen`. Duplicate taps ignored while `opening`.

## UserPreferences (persisted)
| Field | Type | Storage |
|---|---|---|
| language | `'pt' \| 'en'` | AsyncStorage `quickzap.language` |

Phone numbers are never stored.
