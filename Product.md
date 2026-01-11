# Product

## Product Vision

World Spinner is an educational geography game for children ages 7-12 that makes learning about countries fun and engaging. Players spin a virtual wheel to reveal mystery countries, receive progressive clues, make guesses, and earn discovery cards with fascinating facts. The game blends entertainment with education, fostering curiosity about global cultures, wildlife, and history.

## Product Scope

### Day 1 MVP (In Scope)
- Core game loop: Spin → 3 progressive clues → Guess → Discovery card
- 5-10 hardcoded countries with complete data
- Basic internationalization (EN/ES)
- Responsive web interface (React + Tailwind CSS)
- Clean, functional UI for ages 7-12

### Post-Day 1 (Out of Scope - Deferred)
- Progression systems (passport, badges, levels)
- World map visualization
- Game host character (Capytan)
- Extensive country database (20+)
- Deep educational content (history, anthropology, astronomy)
- Audio effects and complex animations
- Additional game modes (missions, multiplayer, offline)
- Advanced i18n (RTL, cultural adaptation)

## User Stories

### Day 1 MVP Stories (Completed)

1. **US-001 — Spin Mechanism and Country Selection**
   - **Summary**: Implement random country selection with spin button and visual animation. Selects from hardcoded pool of 5-10 countries.
   - **Business Value**: Core mechanic that starts the game loop, provides element of surprise and excitement for players.
   - **Acceptance Criteria**: See Done.md for detailed criteria covering spin trigger, animation, random selection, state transition, and duplicate prevention.
   - **Status**: Done (v0.1.0)

2. **US-002 — Display Progressive Clues**
   - **Summary**: Show three sequential clues (animal, food, flag) with images and text to help players guess the country.
   - **Business Value**: Educational scaffolding that teaches children about countries through recognizable cultural elements.
   - **Acceptance Criteria**: See Done.md for detailed criteria covering clue sequence, image display, readability, and responsive layout.
   - **Status**: Done (v0.1.0)

3. **US-003 — Accept and Validate Player Guess**
   - **Summary**: Text input for country guesses with flexible validation (case-insensitive, common variations) and immediate feedback.
   - **Business Value**: Core interaction that validates learning and provides instant gratification or teaching moment.
   - **Acceptance Criteria**: See Done.md for detailed criteria covering input validation, answer variations, feedback messages, and state transitions.
   - **Status**: Done (v0.1.0)

4. **US-004 — Display Discovery Card Rewards**
   - **Summary**: Educational card showing country facts (2-3 age-appropriate facts) after each guess, regardless of correctness.
   - **Business Value**: Primary learning outcome - ensures every interaction teaches something new about world geography and culture.
   - **Acceptance Criteria**: See Done.md for detailed criteria covering fact display, readability, replay functionality, and visual presentation.
   - **Status**: Done (v0.1.0)

5. **US-005 — Basic Translation Structure**
   - **Summary**: JSON-based internationalization system with EN/ES support and language switcher UI.
   - **Business Value**: Makes game accessible to Spanish-speaking families and establishes foundation for community-contributed translations.
   - **Acceptance Criteria**: See Done.md for detailed criteria covering translation files, language switcher, code integration, and contributor-friendly structure.
   - **Status**: Done (v0.2.0)

6. **US-006 — Minimal UI Layout and Styling**
   - **Summary**: Responsive layout with cheerful teal-based design, readable typography, and clear visual hierarchy.
   - **Business Value**: Professional presentation that feels like a complete game experience, not a prototype, suitable for 7-12 age range.
   - **Acceptance Criteria**: See Done.md for detailed criteria covering responsive breakpoints, color palette, accessibility, and transitions.
   - **Status**: Done (v0.1.0)

### Post-Day 1 Stories (Completed)

7. **US-007 — Smart Card Removal from Shuffle Deck**
   - **Summary**: Each country appears only once per game session to improve discovery flow and prevent repetition frustration.
   - **Business Value**: Enhances game progression by eliminating repeated countries, provides clear completion feedback, and allows player-controlled resets.
   - **Acceptance Criteria**: See Done.md for detailed criteria covering unique country appearances, progress tracking, game completion state, and manual reset functionality.
   - **Status**: Done (v0.3.0)

8. **US-008 — Clock-Hand Style Globe Spinning Animation**
   - **Summary**: Dramatic roulette-style spinning animation with synchronized click sounds that decelerate as the globe slows, plus mute control with preference persistence.
   - **Business Value**: Transforms the spin action into an exciting, anticipation-building moment that mimics real prize wheels. Audio feedback enhances engagement while respecting user preferences.
   - **Acceptance Criteria**: See Backlog.md for detailed criteria covering globe rotation (360°+ per spin), easeOut deceleration, click sound synchronization, mute toggle, and cumulative rotation tracking.
   - **Status**: Done (v0.4.0)

## Traceability
- RACI ownership and handoff obligations are governed by [Workflow.md], [RACI.md], and [Schema.md].
- Definition of Done checkpoints must map back to [DoD.md], with evaluation artifacts logged per [Evals.md].
- Guardrails enforcing role boundaries and risk limits are detailed in [GuardRails.md] and remain applicable to every user story above.
