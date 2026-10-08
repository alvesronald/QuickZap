<!--
Sync Impact Report
Version change: (template, unversioned) → 1.0.0
Modified principles: none (initial ratification; all placeholders replaced)
Added sections: Core Principles I–V, Technology Stack & Constraints, Development Workflow &
  Quality Gates, Governance
Removed sections: none
Templates:
  ✅ .specify/templates/plan-template.md (Constitution Check gates + stack defaults)
  ✅ .specify/templates/tasks-template.md (tests mandatory, not optional)
  ✅ .specify/memory/constitution.md
  ⚠ .specify/templates/spec-template.md (reviewed, no change required)
Follow-up TODOs: none
-->

# QuickZap Constitution

## Core Principles

### I. Reusable Components & Logic First

Every piece of UI and behavior MUST be built as a reusable unit before it is used by a screen.

- Presentational UI lives in `src/components/` as small, prop-driven components with no
  navigation, i18n-lookup, or data-fetching side effects baked in.
- Stateful or side-effecting logic lives in `src/hooks/` (custom hooks) or in pure utility
  functions; screens in `src/screens/` only compose components and hooks.
- Duplicated markup or logic appearing a second time MUST be extracted before merging.
- Each component/hook MUST have a single, documented purpose and a typed public API exported
  through its folder's `index.ts`.

Rationale: the app is meant to grow by composition; reuse keeps behavior consistent and makes
100% coverage tractable.

### II. Test-First with 100% Coverage (NON-NEGOTIABLE)

All code under `src/` MUST be covered by tests using Jest and React Native Testing Library.

- Coverage thresholds for statements, branches, functions, and lines MUST be 100% and enforced
  in `jest.config.js` (`coverageThreshold`); a drop below 100% fails CI and the pre-commit hook.
- Tests are written before or together with the implementation and MUST fail without it.
- Components are tested through user-visible behavior (queries by role/text/label, user events),
  not implementation details; hooks are tested with `renderHook`.
- Coverage exclusions require an inline justification and approval under Governance.

Rationale: a mobile app is expensive to verify by hand; full automated coverage is the safety net.

### III. Lint & Format Compliance

All code MUST pass ESLint (`npm run lint`) and Prettier (`npm run format:check`) with zero
errors and zero warnings.

- Rules are defined by the repository configuration; they MUST NOT be disabled inline without a
  comment explaining why.
- The Husky pre-commit hook MUST remain enabled and MUST NOT be bypassed (`--no-verify`).

Rationale: consistent style removes review noise and catches defects early.

### IV. Typed, Strict TypeScript

All source MUST be TypeScript with strict typing.

- `any` and unchecked type assertions are prohibited unless justified in a comment.
- Props, hook inputs/outputs, navigation params (`src/navigation/types.ts`), and i18n keys MUST
  be explicitly typed.

Rationale: types document contracts for reusable units and prevent regressions at compile time.

### V. Simple, Consistent Styling & Internationalization

- Styling MUST use React Native `StyleSheet.create`; no inline style objects for static values
  and no additional styling libraries without a constitution amendment.
- Icons and vector graphics MUST use `react-native-svg`, wrapped as reusable components
  (e.g. `ZapIcon`).
- All user-facing strings MUST come from i18n (`src/i18n`) — no hard-coded text in components.
- Prefer the simplest solution that satisfies the requirement (YAGNI).

Rationale: one styling and i18n approach keeps components portable and predictable.

## Technology Stack & Constraints

- Language: TypeScript. Framework: React Native with React Navigation.
- Styling: `StyleSheet`. Graphics: `react-native-svg`. Localization: i18next / react-i18next.
- Testing: Jest (`@react-native/jest-preset`) and `@testing-library/react-native`.
- Quality tooling: ESLint (`@react-native/eslint-config`), Prettier, Husky.
- New runtime dependencies MUST be justified in the plan and MUST NOT duplicate an existing
  capability of the stack above.

## Development Workflow & Quality Gates

- Before a change is merged, `npm run lint`, `npm run format:check`, and
  `npm test -- --coverage` MUST all pass with 100% coverage.
- Every feature plan MUST pass the Constitution Check (reuse identified, tests planned, lint and
  types respected) before design and again after.
- Every spec/plan MUST name which components and hooks are new vs. reused.
- Pull requests MUST be small, focused, and reviewed against this constitution.

## Governance

This constitution supersedes other practices. Amendments require a documented change to this
file, reviewer approval, and — where existing code is affected — a migration plan. Versioning
follows semantic versioning: MAJOR for removed or redefined principles, MINOR for new principles
or materially expanded guidance, PATCH for clarifications. All PRs and reviews MUST verify
compliance; any complexity or exception MUST be justified in the plan's Complexity Tracking.

**Version**: 1.0.0 | **Ratified**: 2026-10-08 | **Last Amended**: 2026-10-08
