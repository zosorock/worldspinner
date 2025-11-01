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

## Day 1 MVP Stories (Critical Priority)

### US-001: Spin Mechanism and Country Selection
**Status**: Ready
**Priority**: Critical - Day 1

As a player
I want to spin a wheel that randomly selects a mystery country
So that I can start the guessing game with an element of surprise and excitement

**Acceptance Criteria**:
- [ ] Spin button triggers country selection from hardcoded list of 5-10 countries
- [ ] Visual spin animation (can be simple CSS rotation, no need for complex physics)
- [ ] Country is randomly selected from available pool
- [ ] After spin completes, game transitions to clue display state
- [ ] Same country is not shown twice in a row
- [ ] No network calls needed - all data hardcoded in code

**Technical Notes**:
- Start with 5-10 countries hardcoded directly in code (USA, Japan, Australia, Mexico, France, Egypt, Brazil, Kenya, India, Italy)
- No separate data files needed for Day 1
- Focus on functional mechanics, not visual polish

---

### US-002: Display Progressive Clues
**Status**: Ready
**Priority**: Critical - Day 1

As a player
I want to see three progressive clues (animal, food, flag) about the mystery country
So that I can make an educated guess based on the information provided

**Acceptance Criteria**:
- [ ] Three clues displayed in sequence: Animal → Food → Flag
- [ ] Animal clue: Display image and 1-sentence description
- [ ] Food clue: Display image and name of iconic dish
- [ ] Flag clue: Display flag image
- [ ] Each clue has a "Next Clue" button (or auto-advance after timer)
- [ ] All three clues use hardcoded data (images can be placeholder URLs or local assets)
- [ ] Clues are clearly visible and readable on desktop and mobile

**Technical Notes**:
- Images can be placeholder URLs initially (flags from public domain, simple animal/food images)
- Keep layout simple - vertical stack of clues is fine for Day 1
- No fancy reveal animations needed yet

---

### US-003: Accept and Validate Player Guess
**Status**: Ready
**Priority**: Critical - Day 1

As a player
I want to type my guess for the country name and get immediate feedback
So that I know if I answered correctly or incorrectly

**Acceptance Criteria**:
- [ ] Text input field for country name
- [ ] Submit button to confirm guess
- [ ] Case-insensitive matching (e.g., "usa" matches "USA")
- [ ] Handles common variations (e.g., "United States", "USA", "America" all match)
- [ ] Shows "Correct!" message with celebration visual (can be simple text/color change)
- [ ] Shows "Incorrect - it was [Country Name]" message for wrong answers
- [ ] After feedback, automatically transitions to discovery card

**Technical Notes**:
- Hardcode acceptable answer variations for each country
- No partial credit or spelling suggestions needed for Day 1
- Simple validation logic is sufficient

---

### US-004: Display Discovery Card Rewards
**Status**: Ready
**Priority**: Critical - Day 1

As a player
I want to see an educational discovery card after guessing
So that I can learn interesting facts about the country

**Acceptance Criteria**:
- [ ] Discovery card appears after guess (whether correct or incorrect)
- [ ] Shows country name and flag
- [ ] Displays 2-3 simple, fun facts about the country
- [ ] Facts are age-appropriate for 7-12 year olds
- [ ] "Play Again" button returns to spin screen
- [ ] Card is visually distinct from game screen (can use simple border/background color)

**Technical Notes**:
- Facts hardcoded in code with country data
- No need for elaborate card animations on Day 1
- Focus on readability and clear presentation

---

### US-005: Basic Translation Structure
**Status**: Ready
**Priority**: High - Day 1

As a developer and future contributor
I want a simple internationalization structure in place
So that new languages can be added easily without code changes

**Acceptance Criteria**:
- [ ] Create translation JSON files: en.json (English), es.json (Spanish)
- [ ] Translation keys used for all UI text (buttons, messages, instructions)
- [ ] Simple useTranslation hook or helper function to access translations
- [ ] Language switcher UI component (dropdown or buttons for EN/ES)
- [ ] Selected language persists in localStorage
- [ ] All game text uses translation keys (no hardcoded English strings in components)

**Technical Notes**:
- Keep structure flat and simple - no nested namespaces needed yet
- Start with just English and Spanish
- Country names and facts can stay in English for Day 1 (only UI translated)
- Document JSON structure in code comments for future contributors

---

### US-006: Minimal UI Layout and Styling
**Status**: Ready
**Priority**: Medium - Day 1

As a player
I want the game to have a clean, playful visual layout
So that it feels like a complete game experience

**Acceptance Criteria**:
- [ ] Responsive layout works on desktop (1024px+) and mobile (375px+)
- [ ] Cheerful color palette featuring teal as primary color
- [ ] Clear visual hierarchy (headings, buttons, content areas)
- [ ] Buttons have hover states and clear clickable appearance
- [ ] Text is readable with good contrast ratios
- [ ] Simple page transitions between game states (can be fade in/out)

**Technical Notes**:
- Use Tailwind CSS utility classes
- No custom animations beyond simple transitions
- Focus on functional clarity over visual polish
- Can use default Tailwind color palette with teal-500 as primary

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
