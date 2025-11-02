# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) where applicable.

## [Unreleased]

### Added
- **T-001: Translation JSON structure** - Created `app/src/locales/` directory with `en.json` (English) and `es.json` (Spanish) translation files containing all UI strings from App.jsx, organized by component/feature with max 2-level nesting. Added `_README.json` documenting structure and guidelines. Includes comprehensive test suite validating JSON structure, key matching, and required UI string presence.

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
