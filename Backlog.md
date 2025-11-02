# Product Backlog

This file tracks all user stories for World Spinner.
Stories are prioritized from top to bottom.
Each story gets a **US-###** ID.

---

## Status Definitions

- **Ready**: Story is well-defined, has clear acceptance criteria, and is ready for development
- **In Progress**: Developer is actively working on implementation
- **Under Review**: Code is complete and undergoing review
- **Awaiting Approval**: Review passed, waiting for Human Gatekeeper approval
- **Blocked**: Cannot proceed due to external dependency or blocker
- **Done**: Approved and merged

---

## Active Stories

### US-005: Basic Translation Structure
**Status**: Done | **Priority**: High - Day 1
**In Progress By**: Scrum Master | **In Progress At**: 2025-11-02T05:34:00Z
**Reviewed At**: 2025-11-02T15:00:00Z
**Approved At**: 2025-11-02T15:15:00Z
**Approved By**: Human Gatekeeper
**Details**: [docs/user-stories/US-005-i18n.md](docs/user-stories/US-005-i18n.md)

Simple internationalization structure for adding new languages easily.

**Implementation Tasks**: T-001, T-002, T-003, T-004 (Done), T-005 (Ready for next cycle)

**Completion Summary**: All automated quality gates passed (104/104 tests, 98.7% coverage, 0 ESLint errors). Language switching (EN ↔ ES) fully functional with React Context architecture. 15 commits merged successfully.

---

## Implementation Tasks

### T-001: Create Translation JSON Files and Directory Structure
**Status**: Done
**Assignee**: Completed
**Started**: 2025-11-01
**Review Completed**: 2025-11-01
**Completed**: 2025-11-01
**Parent Story**: US-005
**Priority**: Critical

**Review Notes**: Code Reviewer APPROVED - all quality gates passed (build, tests 22/22, DoD compliance, security, documentation). RED-GREEN-REFACTOR documented. 4 commits ready for merge. ARIA internationalization scoped out to I-025.

**ESLint Note**: ESLint errors identified during T-004 review (7 errors in locales.test.js: for...of loops and _comment underscore dangle). Audit confirmed errors were present at approval time but missed during review. Fixed in T-004d.

**Completion Notes**: Approved by HG - All quality gates passed. Commits merged: 6924c13, 7bbcada, 0edca94, 8dbceae

**Description**:
Create the foundational translation file structure with English and Spanish JSON files containing all UI strings from the current application.

**Technical Details**:
- Create `app/src/locales/` directory
- Create `en.json` with all English UI strings organized by component/feature
- Create `es.json` with Spanish translations of the same keys
- Structure should be simple nested objects (max 2 levels deep)
- Include comments in a separate `_README.json` explaining the structure

**Key Areas to Extract**:
- Capytan tips (3 rotating messages)
- Button labels (Spin Globe, Next Clue, Submit Guess)
- Clue board labels and empty states
- Feedback messages (correct, incorrect, validation)
- Discovery log labels and empty states
- Form labels and placeholders

**Dependencies**: None

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] `app/src/locales/en.json` created with all UI strings
- [ ] `app/src/locales/es.json` created with Spanish translations
- [ ] JSON structure is flat/simple (max 2 levels: category.key)
- [ ] All current UI strings from App.jsx are represented
- [ ] JSON files are valid and parse without errors
- [ ] Spanish translations are accurate and age-appropriate
- [ ] Unit tests verify JSON structure and completeness
- [ ] Coverage ≥80% for JSON validation tests
- [ ] Documentation comment added to each JSON file

---

### T-002: Build useTranslation Hook with localStorage Persistence
**Status**: Done
**Assignee**: Completed
**Started**: 2025-11-01
**Review Completed**: 2025-11-01
**Completed**: 2025-11-02
**Parent Story**: US-005
**Priority**: Critical
**Retry Count**: 2/2

**Review Notes**: Code Reviewer APPROVED after 2 retries - All quality gates passed (ESLint 0 errors, tests 26/26 passing, coverage 98.33%, DoD compliance).
- Retry 1: Fixed localStorage crashes with SSR guards, added comprehensive tests, documented RED-GREEN-REFACTOR
- Retry 2: Resolved ESLint no-restricted-syntax violation by refactoring for...of to .reduce() pattern
- Codex 2nd opinion: No blocking issues found

**Architectural Defect**: Isolated state architectural defect identified during T-004 review. Each component calling useTranslation() receives independent useState instance, preventing language changes from propagating across components. Fixed in T-004a/b/c (React Context implementation).

**Completion Notes**: Approved by HG - Commit SHA 0c74dc0 verified and merged (amended to include ESLint config)

**Description**:
Create a custom React hook that provides translation lookup functionality, language switching, and persistent storage of language preference.

**Technical Details**:
- Create `app/src/hooks/useTranslation.js`
- Hook returns: `{ t, language, setLanguage }`
- `t(key, variables?)` - translation lookup with simple interpolation
- `setLanguage(code)` - switches language and persists to localStorage
- Use `useState` for current language
- Use `useEffect` to sync with localStorage on mount and language change
- localStorage key: `worldspinner_language`
- Support interpolation: `t('feedback.correct', { country: 'Japan' })`

**Implementation Pattern**:
```javascript
// Simple nested key lookup: "buttons.spin" → en.buttons.spin
// Variable replacement: {country} in string replaced with provided value
// Fallback: return key itself if translation missing
```

**Error Handling**:
- Invalid language code → fall back to 'en'
- Missing translation key → return the key itself
- Malformed interpolation → log warning, return string as-is

**Dependencies**: T-001 (needs JSON files to load)

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Hook correctly loads language from localStorage on mount
- [ ] Hook defaults to 'en' if no preference saved
- [ ] `t()` function correctly looks up nested keys
- [ ] `t()` function performs simple variable interpolation
- [ ] `setLanguage()` updates state and persists to localStorage
- [ ] Missing keys return the key string (dev-friendly fallback)
- [ ] Invalid language codes fall back to 'en'
- [ ] Unit tests cover all hook behaviors
- [ ] Tests verify localStorage integration
- [ ] Coverage ≥80% of hook code
- [ ] JSDoc comments document hook API

---

### T-003: Create LanguageSwitcher Component
**Status**: Done
**Assignee**: Completed
**Started**: 2025-11-02
**Review Completed**: 2025-11-02
**Approved**: 2025-11-02
**Parent Story**: US-005
**Priority**: High
**Retry Count**: 1/2
**Review Notes**: Code Reviewer APPROVED - All quality gates passed on retry 1. Build success (1.16s), tests 66/66 passing, 100% coverage on component, git commits present (cd014f4, e8b8049), CHANGELOG updated, DoD compliance verified, no security issues.
**Completion Notes**: Approved by HG - Commits merged: cd014f4, e8b8049

**Description**:
Build a simple, accessible UI component that allows users to toggle between English and Spanish languages.

**Technical Details**:
- Create `app/src/components/LanguageSwitcher.jsx`
- Use `useTranslation` hook to get current language and setter
- Render as button toggle or small dropdown (preseed: buttons are simpler)
- Show flag emojis: 🇺🇸 EN | 🇪🇸 ES
- Style with Tailwind CSS to match app aesthetic
- Place in top-right corner of app header/nav area
- Current language should have distinct active styling

**Design Specs**:
- Two-button toggle design (simpler than dropdown)
- Active button: solid background, inactive: outline
- Compact size, doesn't dominate UI
- Accessible: proper labels, keyboard navigable
- Smooth transition when switching (leverage Framer Motion if needed)

**Dependencies**: T-002 (needs useTranslation hook)

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Component renders two language buttons (EN, ES)
- [ ] Active language has distinct visual styling
- [ ] Clicking button calls `setLanguage()` correctly
- [ ] Component is responsive on mobile and desktop
- [ ] Accessible: proper ARIA labels and keyboard navigation
- [ ] Visual design matches app's teal-based aesthetic
- [ ] Component unit tests verify behavior
- [ ] Tests verify language switching triggers re-render
- [ ] Coverage ≥80% of component code
- [ ] PropTypes defined if component accepts props

---

### T-004: Context Architecture Implementation (Expanded Scope)
**Status**: Done
**Assignee**: Completed
**Started**: 2025-11-02
**Blocked At**: 2025-11-02T06:40:00Z (RESOLVED - Design approved by HG)
**Design Approved**: 2025-11-02T10:15:00Z
**Reviewed At**: 2025-11-02T15:00:00Z
**Approved**: 2025-11-02T15:15:00Z
**Parent Story**: US-005
**Priority**: Critical
**Retry Count**: 1/2
**Design Docs**:
  - `/Users/zoso/Dropbox/Liam/WorldSpinner/docs/design-specs/T-004-context-architecture.md`
  - `/Users/zoso/Dropbox/Liam/WorldSpinner/docs/design-specs/T-004-SUMMARY.md`

**Scope Expansion**: Per HG approval (Option C), scope expanded from "Refactor App.jsx" to include fixing T-002 architectural defect via React Context implementation. Split into 6 subtasks (T-004a through T-004f).

**Dependency Chain**:
```
Critical Path: T-004a → T-004b → T-004f → T-004c → T-004e
Parallel Track: T-004d (anytime)
```

**Original Block Reason**: Depends on T-002 architectural fix (isolated state vs shared state via Context) + T-001 ESLint errors in locales.test.js (7 errors)

**Review Notes** (from commit 7927fac rejection): Code Reviewer REJECTED - 2 critical blockers identified:
  1. BLOCKER: Language switching non-functional - T-002 useTranslation hook has architectural defect (each component gets isolated state instead of shared state). LanguageSwitcher updates only its own state; App.jsx never re-renders with new language. Violates AC: "App works correctly in both EN and ES modes"
  2. BLOCKER: ESLint failures in app/src/locales/locales.test.js (from T-001) - 7 errors (for...of loop, _comment underscore dangle). Violates DoD: "lint passes (no errors)"

**Architecture Notes**: Architect designed React Context solution (TranslationProvider) to provide shared state across all components. Implementation split into 6 subtasks below.

**Description**:
Implement React Context architecture for translation state management, fixing T-002's isolated state defect and completing App.jsx translation integration.

**Technical Details**:
- Import and use `useTranslation()` hook at top of App component
- Replace all string literals with `t()` calls
- Update feedback messages to use interpolation for dynamic values
- Add `<LanguageSwitcher />` to top of the app UI
- Verify all text updates when language switches

**Strings to Replace**:
- `capytanTips` array → `t('capytan.tip1')`, `t('capytan.tip2')`, `t('capytan.tip3')`
- Button labels → `t('buttons.spinGlobe')`, etc.
- Feedback messages → `t('feedback.correct', { country: activeCard.displayName })`
- Section headers and labels
- Input placeholders
- Empty state messages

**Testing Strategy**:
- Manually verify UI in both EN and ES
- Ensure no console errors from missing keys
- Verify dynamic content (country names) interpolates correctly

**Dependencies**: T-002, T-003 (needs hook and switcher component)

**Acceptance Checklist** (Parent Task - Overall):
- [ ] All 6 subtasks completed (T-004a through T-004f)
- [ ] Language switching works across all components
- [ ] ESLint passes with 0 errors (all files)
- [ ] All tests pass (unit + integration)
- [ ] Coverage ≥80% for TranslationContext.jsx and useTranslation.js
- [ ] Build succeeds without errors
- [ ] CHANGELOG.md updated with commit SHAs
- [ ] Manual testing checklist complete

---

### T-004a: Create TranslationContext and TranslationProvider
**Status**: Done
**Assignee**: Completed
**Started**: 2025-11-02T10:20:00Z
**Reviewed At**: 2025-11-02T15:00:00Z
**Approved**: 2025-11-02T15:15:00Z
**Parent**: T-004
**Priority**: Critical (Day 1 blocker)
**Estimated Effort**: 2 hours
**Dependencies**: None
**Commits**: 88e971a

**Review Notes**: Code Reviewer APPROVED - All quality gates passed (build, tests 101/101, coverage 93.65%, lint 0 new warnings). Commit 88e971a. DoD compliance verified. TDD evidence present. Codex 2nd opinion: no blocking issues.
**Completion Notes**: Approved by HG - Commit merged: 88e971a

**Description**:
Create React Context and Provider component to manage shared translation state across the application.

**Implementation Requirements**:
1. Create directory: `app/src/contexts/`
2. Create file: `TranslationContext.jsx`
3. Export TranslationContext (created with `createContext(null)`)
4. Export TranslationProvider component
5. Move state logic from useTranslation.js to TranslationProvider:
   - `useState` with lazy initializer for language
   - `useEffect` for localStorage persistence
   - Translation function `t(key, variables)`
   - Helper functions: `getSafeLocalStorage`, `validateLanguageCode`, `interpolate`, `lookupTranslation`
6. Import translations (en.json, es.json)
7. Provide Context value with useMemo: `{ t, language, setLanguage }`

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] TranslationContext created and exported
- [ ] TranslationProvider component implemented
- [ ] State management migrated from hook to Provider
- [ ] localStorage persistence working correctly
- [ ] Translation function `t()` works in Provider
- [ ] Context value matches API contract
- [ ] Error handling for localStorage failures
- [ ] Unit tests cover all Provider behaviors
- [ ] Coverage ≥80% for TranslationContext.jsx
- [ ] JSDoc comments document Provider API
- [ ] PropTypes defined for children prop

**Design Reference**: See `/Users/zoso/Dropbox/Liam/WorldSpinner/docs/design-specs/T-004-context-architecture.md` section "T-004a Implementation Requirements"

---

### T-004b: Refactor useTranslation to Consume Context
**Status**: Done
**Assignee**: Completed
**Started**: 2025-11-02
**Reviewed At**: 2025-11-02T15:00:00Z
**Approved**: 2025-11-02T15:15:00Z
**Parent**: T-004
**Priority**: Critical (Day 1 blocker)
**Estimated Effort**: 1 hour
**Dependencies**: T-004a (needs TranslationContext to exist)
**Commits**: e01bfc8, c719d10, c3a6dbe

**Review Notes**: Code Reviewer APPROVED - All quality gates passed. Tests 29/29, coverage 100%, lint clean. Commits e01bfc8, c719d10, c3a6dbe. Code reduced 70% (187→54 lines). App.test.js failures expected (fixed in T-004f).

**Description**:
Transform useTranslation hook from state management to Context consumer, eliminating isolated state issue.

**Implementation Requirements**:
1. Import `useContext` from React
2. Import `TranslationContext` from contexts
3. Remove all state management code:
   - `useState` declaration
   - `useEffect` for localStorage
   - Helper functions (moved to Provider)
   - Translation function implementation
4. Replace with Context consumption:
   - `const context = useContext(TranslationContext)`
   - Validate context exists (throw error if null)
   - Return context value
5. Preserve exact API surface (no breaking changes)
6. Update JSDoc comments

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Hook uses `useContext(TranslationContext)`
- [ ] Hook validates Provider presence (throws on missing)
- [ ] Hook returns same API shape as before
- [ ] All state management removed from hook
- [ ] No breaking changes to hook interface
- [ ] Unit tests verify Context consumption
- [ ] Tests verify error on missing Provider
- [ ] Tests verify shared state across components
- [ ] Coverage ≥80% maintained for useTranslation.js
- [ ] JSDoc comments updated

**Design Reference**: See `/Users/zoso/Dropbox/Liam/WorldSpinner/docs/design-specs/T-004-context-architecture.md` section "T-004b Implementation Requirements"

---

### T-004f: Create Test Utilities and Update Existing Tests
**Status**: Done
**Assignee**: Completed
**Started**: 2025-11-02
**Reviewed At**: 2025-11-02T15:00:00Z
**Approved**: 2025-11-02T15:15:00Z
**Parent**: T-004
**Priority**: URGENT - CRITICAL PATH (blocks all subsequent testing)
**Estimated Effort**: 1.5 hours
**Dependencies**: T-004b (needs refactored hook with Provider requirement)
**Commits**: 9c68f7f, 1daa1f8, 771378c, 60cdcbd, c9d9c14

**Review Notes**: Code Reviewer APPROVED - All quality gates passed. Tests 104/104 passing, coverage 100% on utilities, lint clean. Commits 9c68f7f, 1daa1f8, 771378c, 60cdcbd, c9d9c14. Fixed wrapper override bug. CHANGELOG updated.

**CRITICAL NOTE**: This task MUST be completed immediately. After T-004b added the "throw if no provider" guard, 20/20 tests in App.test.js are failing with "useTranslation must be used within TranslationProvider" errors. This is EXPECTED and documented in the design spec. This task fixes those failures.

**Description**:
Create test helper utilities to wrap components with TranslationProvider and update all existing tests that render components using `useTranslation` hook.

**Implementation Requirements**:
1. Create file: `app/src/test-utils/translationTestUtils.jsx`
2. Export `renderWithTranslation(ui, options)` function
3. Export `createTranslationWrapper()` for renderHook
4. Update App.test.js - replace `render()` with `renderWithTranslation()`
5. Update useTranslation.test.js - wrap renderHook calls with Provider
6. Add test case: "throws error when used outside Provider"
7. Update LanguageSwitcher.test.js if needed

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete) - Tests fail after T-004b guard added
- [ ] Implementation makes tests pass (GREEN complete) - Utilities created, tests updated
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] translationTestUtils.jsx created with renderWithTranslation helper
- [ ] createTranslationWrapper helper implemented for renderHook
- [ ] App.test.js updated to use renderWithTranslation
- [ ] useTranslation.test.js updated to use wrapper
- [ ] New test added: hook throws error outside Provider
- [ ] LanguageSwitcher.test.js updated if needed
- [ ] All existing tests pass with new utilities
- [ ] Test utilities have JSDoc comments
- [ ] Coverage ≥80% maintained for all updated test files
- [ ] No test regressions (all tests still validate correct behavior)

**Design Reference**: See `/Users/zoso/Dropbox/Liam/WorldSpinner/docs/design-specs/T-004-context-architecture.md` section "T-004f Implementation Requirements"

---

### T-004c: Wrap App in TranslationProvider
**Status**: Done
**Assignee**: Completed
**Started**: 2025-11-02
**Reviewed At**: 2025-11-02T15:00:00Z
**Approved**: 2025-11-02T15:15:00Z
**Parent**: T-004
**Priority**: Critical (Day 1 blocker)
**Estimated Effort**: 15 minutes
**Dependencies**: T-004b, T-004f (needs Context + test utilities)
**Commits**: f3b666b, 23887f0

**Review Notes**: Code Reviewer APPROVED - All quality gates passed. Tests 104/104 passing, build success, lint clean. Commits f3b666b (implementation), 23887f0 (CHANGELOG). Provider wrapper correct, architecture validated.

**Description**:
Integrate TranslationProvider at application root to enable shared state across all components.

**Implementation Requirements**:
1. Open `app/src/index.jsx`
2. Import `TranslationProvider` from `./contexts/TranslationContext`
3. Wrap `<App />` with `<TranslationProvider>`
4. Maintain existing `<React.StrictMode>` wrapper
5. Verify no other changes needed

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] TranslationProvider imported in index.jsx
- [ ] Provider wraps App component
- [ ] React.StrictMode maintained
- [ ] App renders without errors
- [ ] Integration tests verify language switching works
- [ ] No other changes to index.jsx
- [ ] Build succeeds without warnings

**Design Reference**: See `/Users/zoso/Dropbox/Liam/WorldSpinner/docs/design-specs/T-004-context-architecture.md` section "T-004c Implementation Requirements"

---

### T-004d: Fix ESLint Errors in locales.test.js
**Status**: Done
**Assignee**: Completed
**Started**: 2025-11-02
**Reviewed At**: 2025-11-02T15:00:00Z
**Approved**: 2025-11-02T15:15:00Z
**Parent**: T-004
**Priority**: High
**Estimated Effort**: 30 minutes
**Dependencies**: None (can run in parallel)
**Commits**: 3bdd085, 6986f78

**Review Notes**: Code Reviewer APPROVED - All quality gates passed. ESLint 0 errors (down from 7), tests 104/104 passing, code readability improved. Commits 3bdd085 (implementation), 6986f78 (CHANGELOG). All for...of loops refactored, underscore dangle fixed.

**Description**:
Resolve 7 ESLint errors in T-001's test file to meet DoD requirements (lint must pass with 0 errors).

**Implementation Requirements**:
1. Open `app/src/locales/locales.test.js`
2. Replace `for...of` loops with `.reduce()`, `.map()`, or `.forEach()`
3. Rename `_comment` variables to avoid underscore dangle
4. Follow Airbnb style guide patterns from codebase (see T-002 lines 109-115 for `.reduce()` example)
5. Ensure tests still pass after refactoring

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete) - N/A for lint fixes
- [ ] Implementation makes tests pass (GREEN complete) - Tests still pass
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] All `for...of` loops replaced with compliant patterns
- [ ] All `_comment` variables renamed
- [ ] ESLint reports 0 errors for locales.test.js
- [ ] All tests in locales.test.js pass
- [ ] No new ESLint warnings introduced
- [ ] Code readability maintained or improved

**Design Reference**: See `/Users/zoso/Dropbox/Liam/WorldSpinner/docs/design-specs/T-004-context-architecture.md` section "T-004d Implementation Requirements"

---

### T-004e: Verify Integration and Manual Testing
**Status**: Done
**Assignee**: Completed
**Started**: 2025-11-02
**Completed At**: 2025-11-02T15:00:00Z
**Approved**: 2025-11-02T15:15:00Z
**Parent**: T-004
**Priority**: High
**Estimated Effort**: 30 minutes
**Dependencies**: T-004a, T-004b, T-004c, T-004f (all integration complete)
**Verification Doc**: `/Users/zoso/Dropbox/Liam/WorldSpinner/debug.out/T-004e-verification.md`

**Review Notes**: AUTOMATED VERIFICATION COMPLETE - All automated quality gates passed. Build success, tests 104/104 passing, ESLint 0 errors, coverage 98.7%. Manual testing checklist documented for HG review. See verification doc for full details.

**Description**:
Verify that commit 7927fac's App.jsx changes work correctly with the new Context architecture. No new implementation needed—testing and validation only.

**Implementation Requirements**:
1. Review commit 7927fac changes in App.jsx
2. Verify all hardcoded strings replaced with `t()` calls
3. Confirm LanguageSwitcher rendered at line 160
4. Test language switching manually in both EN and ES
5. Check console for missing translation key warnings
6. Verify no regressions in existing functionality

**Manual Testing Checklist**:
- [ ] App loads without errors in console
- [ ] Default language is English
- [ ] LanguageSwitcher visible in top-right
- [ ] Clicking ES button switches all text to Spanish
- [ ] Clicking EN button switches all text back to English
- [ ] Page refresh preserves language choice
- [ ] localStorage contains 'worldspinner_language' key
- [ ] Dynamic values interpolate correctly in both languages
- [ ] No missing translation key warnings
- [ ] All buttons, labels, messages display translated text
- [ ] Feedback messages show correct language after switching

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete) - N/A for verification
- [ ] Implementation makes tests pass (GREEN complete) - Manual testing
- [ ] Code refactored with tests still passing (REFACTOR complete) - N/A
- [ ] All hardcoded English strings replaced with t() calls
- [ ] LanguageSwitcher rendered in App.jsx line 160
- [ ] Language switching works correctly (EN ↔ ES)
- [ ] Dynamic interpolation works (country names, counters)
- [ ] No missing translation key warnings in console
- [ ] All t() calls use correct translation keys
- [ ] Existing functionality unchanged (smoke tests pass)
- [ ] App.test.js updated and passing
- [ ] Manual testing checklist complete

**Design Reference**: See `/Users/zoso/Dropbox/Liam/WorldSpinner/docs/design-specs/T-004-context-architecture.md` section "T-004e Implementation Requirements"

---

### T-005: Add i18n Documentation for Contributors
**Status**: Ready
**Assignee**: Unassigned
**Parent Story**: US-005
**Priority**: Medium

**Description**:
Create clear, friendly documentation explaining how community contributors can add new languages to World Spinner.

**Technical Details**:
- Add "Adding a New Language" section to README.md
- Create inline comments in `en.json` explaining structure
- Document the translation key naming conventions
- Explain the PR process for new languages

**Documentation Should Cover**:
1. How to create a new `[lang].json` file
2. Required structure and naming conventions
3. How to test translations locally
4. Where to find the language switcher component to add new language option
5. Submission guidelines (PR process)

**Tone**:
- Welcoming and beginner-friendly
- Assume contributor may not be a developer
- Provide examples and clear steps

**Dependencies**: T-001, T-002, T-003, T-004 (all i18n work complete)

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete) - N/A for docs
- [ ] Implementation makes tests pass (GREEN complete) - N/A for docs
- [ ] Code refactored with tests still passing (REFACTOR complete) - N/A for docs
- [ ] README.md has "Adding a New Language" section
- [ ] Section includes step-by-step instructions
- [ ] Translation file structure documented with examples
- [ ] Naming conventions clearly explained
- [ ] Testing instructions provided
- [ ] PR submission guidelines included
- [ ] Inline comments added to en.json for guidance
- [ ] Documentation reviewed for clarity
- [ ] Links to relevant files included

---

## Deferred Stories (Post-Day 1)

The following features are valuable but deferred until after Day 1 working version:

- **Progression Systems**: Passport stamps, badges, explorer levels (from I-003, I-005)
- **World Map Visualization**: Interactive map that fills in (from I-004)
- **Game Host Character**: Capytan the capybara (from I-022)
- **Enhanced Content**: Full 10-20+ country database, historical/anthropology/astronomy depth (from I-006, I-007, I-008, I-021)
- **Audio/Visual Polish**: Sound effects, complex animations (from I-009, I-019, I-020)
- **Game Modes**: Mini missions, multiplayer, offline mode (from I-010, I-011, I-012)
- **Advanced i18n**: RTL support, cultural adaptation, automated validation (from I-023, I-024 full scope)

---

## Backlog Management

**Prioritization Factors**:
1. Day 1 playability - can we spin, guess, and learn?
2. User value - does this improve the core experience?
3. Technical dependencies - what must come first?
4. MVP scope alignment - is this essential or enhancement?

**Story Lifecycle**:
Ready → In Progress → Under Review → Awaiting Approval → Done

**Notes**:
- Stories marked "Critical - Day 1" are the absolute minimum for a playable game
- "High - Day 1" means important for completeness but could be added shortly after if needed
- "Medium - Day 1" means nice to have but game is playable without it
