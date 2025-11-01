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
**Status**: Ready | **Priority**: High - Day 1
**Details**: [docs/user-stories/US-005-i18n.md](docs/user-stories/US-005-i18n.md)

Simple internationalization structure for adding new languages easily.

**Implementation Tasks**: T-001, T-002, T-003, T-004, T-005 (see below)

---

## Implementation Tasks

### T-001: Create Translation JSON Files and Directory Structure
**Status**: In Progress
**Assignee**: Developer
**Started**: 2025-11-01
**Parent Story**: US-005
**Priority**: Critical

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
**Status**: Ready
**Assignee**: Unassigned
**Parent Story**: US-005
**Priority**: Critical

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
**Status**: Ready
**Assignee**: Unassigned
**Parent Story**: US-005
**Priority**: High

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

### T-004: Refactor App.jsx to Use Translation Keys
**Status**: Ready
**Assignee**: Unassigned
**Parent Story**: US-005
**Priority**: Critical

**Description**:
Replace all hardcoded English strings in App.jsx with translation key lookups using the `useTranslation` hook. Ensure no English text remains hardcoded in the component.

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

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] All hardcoded English strings removed from App.jsx
- [ ] `useTranslation()` hook integrated at component top
- [ ] All `t()` calls use correct translation keys
- [ ] Dynamic values (country names) interpolated correctly
- [ ] LanguageSwitcher component rendered in UI
- [ ] App works correctly in both EN and ES modes
- [ ] No missing translation key warnings in console
- [ ] Existing functionality unchanged (smoke tests pass)
- [ ] Unit tests updated to work with translation keys
- [ ] Coverage ≥80% maintained for App.jsx
- [ ] ESLint passes with no new warnings

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
