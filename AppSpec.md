# Application Specification

## Overview
- **Product Vision**: World Spinner is an educational geography game for children ages 7-12 that makes learning about countries fun and engaging. Players spin a virtual wheel to reveal mystery countries, receive progressive clues (animal, food, flag), make guesses, and earn discovery cards with fascinating facts. The game blends entertainment with education, fostering curiosity about global cultures, wildlife, and history.

- **Primary Scope - Day 1 MVP**:
  - Core game loop: Spin wheel → Show 3 progressive clues → Accept guess → Validate answer → Display discovery card
  - 5-10 hardcoded countries with complete clue data (animal, food, flag) and educational facts
  - Basic internationalization structure (EN/ES) with simple language switcher
  - Responsive web interface using React + Tailwind CSS
  - Clean, functional UI suitable for target age range (7-12)
  - From player perspective: a complete game experience within its scope (not labeled as POC/MVP)

- **Out of Scope - Day 1 (Deferred Post-Launch)**:
  - Progression systems (passport stamps, badges, explorer levels)
  - World map visualization and puzzle mechanics
  - Game host character (Capytan the capybara) - text tips implemented, visual character deferred
  - Extensive country database (20+ countries)
  - Deep educational content (historical civilizations, anthropology, astronomy)
  - Complex audio (celebration sounds, background music) - basic click sounds implemented in v0.4.0
  - Game modes (mini missions, multiplayer, offline mode)
  - Advanced i18n features (RTL, cultural adaptation, complex validation)

## Feature Set

### F-001. Core Game Mechanics
The fundamental gameplay loop that enables players to learn about countries through an interactive guessing game with progressive clue reveals.

**Functional Capabilities**
- Random country selection from pool of 5-10 countries
- Visual spin animation with smooth transition to clue display
- Progressive clue reveal system (Animal → Food → Flag)
- Text-based guess input with flexible answer validation
- Immediate feedback on correct/incorrect guesses
- Discovery card display with educational facts post-guess

**Acceptance Criteria**
1. *Spin & Selection*: Clicking spin button randomly selects a country, prevents consecutive duplicates, and smoothly transitions to clue display
2. *Clue Display*: Three clues display sequentially with clear images and text, readable on desktop (1024px+) and mobile (375px+)
3. *Guess Validation*: Case-insensitive matching accepts common variations (e.g., "USA", "United States", "America"), provides immediate feedback
4. *Discovery Cards*: Shows 2-3 age-appropriate facts (7-12 reading level) with country name and flag after every guess
5. *Quality Gates*: Jest tests ≥80% coverage, ESLint (Airbnb config) passes, Prettier formatted (120 char line length)

### F-002. Internationalization Foundation
Simple translation structure enabling community contributors to add new languages without modifying code.

**Functional Capabilities**
- JSON-based translation files (en.json, es.json)
- Translation key system for all UI text
- Language switcher component (EN/ES)
- Persistent language selection via localStorage
- Translation helper hook/function for React components

**Acceptance Criteria**
1. *Translation Files*: Flat JSON structure with clear key naming, documented for contributors
2. *Language Switcher*: Dropdown or button UI to toggle between EN/ES, persists choice across sessions
3. *Code Integration*: All UI strings use translation keys, no hardcoded English in components
4. *Future-Ready*: Structure supports adding new languages by adding JSON files without code changes
5. *Quality Gates*: All translation keys defined in both EN and ES files, no missing translations

### F-003. Responsive User Interface
Clean, playful visual design optimized for the 7-12 age range, working seamlessly across devices.

**Functional Capabilities**
- Responsive layouts for desktop (1024px+), tablet, and mobile (375px+)
- Cheerful color palette with teal as primary brand color
- Clear visual hierarchy with readable typography
- Interactive elements with hover states and visual feedback
- Simple page transitions between game states

**Acceptance Criteria**
1. *Responsive Design*: Layout adapts gracefully to screen sizes from 375px to 1920px+ without horizontal scroll
2. *Visual Identity*: Teal-based color scheme, playful but not childish, suitable for upper elementary age
3. *Accessibility*: Text contrast ratio ≥ 4.5:1, interactive elements clearly identifiable, keyboard navigable
4. *Performance*: Page loads in <2 seconds on 3G connection, smooth 60fps animations
5. *Quality Gates*: Tailwind CSS utility classes, no inline styles, follows Airbnb style guide

### F-004. Globe Animation & Sound Effects
Dramatic roulette-style spinning animation with synchronized audio feedback that builds anticipation before revealing the mystery country.

**Functional Capabilities**
- Globe visual element rotates with Framer Motion animation
- Cumulative rotation tracking (360°+ forward per spin, never backwards)
- EaseOut deceleration curve mimicking real roulette wheel physics
- Click sounds synchronized with rotation speed (fast→slow)
- Audio pooling to prevent sound overlap
- Mute/unmute control with localStorage persistence
- Accessible sound toggle with internationalized ARIA labels

**Acceptance Criteria**
1. *Globe Rotation*: Each spin rotates 360-720° forward from current position, never backwards, with smooth easeOut deceleration
2. *Sound Sync*: Click sounds play at 50ms intervals (start) decelerating to 300ms intervals (end), matching visual rotation speed
3. *Audio Control*: Mute button toggles sound, preference persists across sessions via localStorage
4. *Cross-Browser*: Works on Chrome, Firefox, Safari (desktop) and iOS Safari, Android Chrome (mobile)
5. *Quality Gates*: Jest tests ≥80% coverage, ESLint passes, graceful degradation when Audio API unavailable

## Cross-Cutting Requirements
- **Code Quality**: Jest test coverage ≥80%, ESLint (Airbnb config, line length not enforced), Prettier formatting (120 char limit)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge) - last 2 versions
- **Performance**: Initial page load <2 seconds on 3G, smooth 60fps for animations
- **Data Management**: All country data hardcoded in code for Day 1 (no external data files or API calls)
- **Documentation**: Code comments for i18n structure to guide future contributors
- **Deployment**: Static site deployment (no backend required for Day 1)

## Traceability & Governance
- Completed user stories tracked in Done.md (US-001 through US-008)
- Active development tracked in Backlog.md
- Future enhancements cataloged in Ideas.md (I-001 through I-036)
- Product vision and feature definitions maintained in this document (AppSpec.md)
- All implementation must adhere to DoD.md, GuardRails.md, RACI.md, and Evals.md
- Human Gatekeeper approval required before any story moves to Done status
- Workflow follows: Ready → In Progress → Under Review → Awaiting Approval → Done
