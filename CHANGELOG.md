# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) where applicable.

## [Unreleased]

### Added
- **T-002: useTranslation Hook** - Implemented custom React hook for i18n with localStorage persistence. Provides `t()` function for nested key lookup (e.g., `buttons.spinGlobe`) with variable interpolation support (e.g., `{country}` replacement). Includes `language` state ('en'/'es') and `setLanguage()` function that persists to localStorage key `worldspinner_language`. Falls back to 'en' for invalid language codes and returns key string for missing translations (dev-friendly). Comprehensive test suite with 100% statement/function/line coverage and 97.14% branch coverage (25 tests covering initialization, localStorage sync, translation lookup, interpolation, language switching, and storage failure handling).
- **T-001 (6924c13): Translation JSON structure** - Created `app/src/locales/` directory with `en.json` (English) and `es.json` (Spanish) translation files containing all UI strings from App.jsx, organized by component/feature with max 2-level nesting. Added `_README.json` documenting structure and guidelines. Includes comprehensive test suite validating JSON structure, key matching, and required UI string presence.
- **T-001 (0edca94): Documentation comments** - Added `_comment` field to both `en.json` and `es.json` files explaining their purpose as inline documentation. Updated test suite to validate presence of documentation comments, preventing regression if comments are removed.

### Fixed
- **T-002 Code Review Fixes**: Added production-critical guards for localStorage access to prevent crashes in SSR, privacy modes, and embedded WebViews. Implemented `getSafeLocalStorage()` helper that wraps localStorage property access in try/catch (fixes Safari Private Mode crash where accessing `window.localStorage` itself throws). All localStorage operations now use this safe accessor. Added comprehensive test coverage (26 tests, 98.33% coverage) for SSR scenarios, storage quota errors, SecurityError exceptions, and property accessor throwing. Fixed ESLint configuration by removing deprecated `react-app` references, adding explicit `env` settings, `vite.config.js` to devDependencies whitelist, and `settings.react.version='detect'` for Vite compatibility. Refactored `lookupTranslation()` to use `.reduce()` instead of `for...of` loop to comply with Airbnb's `no-restricted-syntax` rule.

## [0.1.1] - 2025-11-01

### Changed
- **Migrated from Create React App to Vite** for faster development and builds
- Dev server now runs on port 5173 with instant hot module replacement (HMR)
- Build output directory changed from `build/` to `dist/`
- Renamed `App.js` to `App.jsx` and `index.js` to `index.jsx` for Vite compatibility
- Updated Capytan emoji from compass 🧭 to beaver 🦫 (closest to capybara)

### Added
- `vite.config.js` with React plugin configuration
- `jest.config.js` for Jest + React testing with Vite
- Babel presets for Jest (@babel/preset-env, @babel/preset-react)

### Removed
- Create React App dependencies (react-scripts)

## [0.1.0] - 2025-11-01

### Added
- Core game loop: spin mechanism, progressive clues (animal → food → flag), guess validation
- Discovery card system showing unlocked countries with educational facts
- Responsive mobile-first UI with teal color theme and Tailwind CSS
- Framer Motion animations for smooth transitions
- 5 countries to explore: USA, Japan, Egypt, Brazil, Australia
- Case-insensitive guess validation with country name aliases
- Progress tracking showing discovered countries (X/5)
- Jest tests with 91.8% coverage, ESLint with Airbnb config
- Age-appropriate content for 7-12 year olds
