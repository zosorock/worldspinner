# Ideas Backlog

This file captures out-of-scope or future ideas.
Ideas are logged here instead of Backlog.md to keep the MVP focused.
Each entry gets an **I-###** ID.

---

## Format
- **I-###** <short title>
  - **source:** who/what raised it (PO, Architect, Developer, Reviewer, Human Gatekeeper)
  - **date:** YYYY-MM-DD
  - **notes:** 1–2 lines of context

---

## Ideas

- **I-001** Spin and Clue System
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Core mechanic where players spin a world wheel to reveal a mystery country, then receive three progressive clues (animal, food, flag) before guessing.

- **I-002** Discovery Card Rewards
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** After correct guesses, display educational cards featuring animal facts, local greetings, dinosaur/fossil info, historical notes, and space connections for each country.

- **I-003** Explorer Passport and Stamp Collection
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Progression system where each correct country earns a stamp. Completing all countries in a continent unlocks that continent's themed badge.

- **I-004** World Puzzle Map Visualization
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Interactive map that fills in piece-by-piece with each correct answer. Completed continents light up, and finishing the world unlocks an animated globe.

- **I-005** Continental Badges and Explorer Levels
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Six themed continental badges (Savanna Specialist, History Hero, Cultural Voyager, Nature Guardian, Ocean Explorer, Polar Scientist) and four explorer levels from Junior Adventurer to Cosmic Voyager.

- **I-006** Historical Civilizations Integration
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Educational content connecting modern countries to ancient civilizations and historical kingdoms (Ancient Greece, The Franks, Mesopotamia, Yugoslavia, etc.).

- **I-007** Anthropology and Fossil Discoveries
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Feature highlighting early human sites, fossils, and cultural artifacts found in each country to connect geography with human evolution and archaeology.

- **I-008** Astronomy and Space Connections
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Link geography to cosmos by showing how countries contributed to space exploration, telescopes, satellites, or have mythological constellations.

- **I-009** Sound Effects and Visual Theming
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Audio/visual polish including whooshes, celebration sounds, and cheerful color palette featuring teal. Playful sounds and bright colors for engagement. UI should be intuitive for younger children while not feeling babyish to older kids.

- **I-010** Mini Missions and Challenges
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Special challenge modes like "Find all countries with volcanoes" or "Unlock 5 countries that speak Spanish" to add variety to gameplay.

- **I-011** Offline Play Mode
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Printable world map puzzle where physical stickers or stamps can be placed as the player progresses through the digital game.

- **I-012** Multiplayer Expansion
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Future competitive mode similar to Jeopardy where multiple players guess countries simultaneously. POC is single-player only, but architecture should plan for multiplayer.

- **I-013** Responsive Web Platform
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Browser-based game that works seamlessly on laptops, phones, and tablets without requiring app downloads or installations.

- **I-014** Country Selection
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Select 10-20 countries (1-2 per continent) with easily recognizable flags, well-known animals, and common foods. Focus on countries kids likely already know (USA, Japan, Australia, Egypt, etc.).

- **I-015** Flag Image Sourcing
  - **source:** Product Owner
  - **date:** 2025-11-01
  - **notes:** Source flag images from public domain (Wikipedia Commons). Simple PNG/SVG files.

- **I-016** Animal Image Sourcing
  - **source:** Product Owner
  - **date:** 2025-11-01
  - **notes:** Find 1 iconic animal image per country. Use free stock photo sites or public domain sources. Choose visually striking animals kids will recognize (panda, kangaroo, elephant, etc.).

- **I-017** Clue Text
  - **source:** Product Owner
  - **date:** 2025-11-01
  - **notes:** Write simple clue text. Animal clues: species names + 1 sentence. Food clues: common dish names (sushi, tacos, pizza). Flag clues: distinctive features (colors, symbols). Use common knowledge.

- **I-018** Discovery Card Facts
  - **source:** Product Owner
  - **date:** 2025-11-01
  - **notes:** 2-3 simple, well-known facts per country. Use Wikipedia or kids' geography sites. Facts should be surprising or fun, not encyclopedic.

- **I-019** UI Transitions and Animations
  - **source:** Product Owner
  - **date:** 2025-11-01
  - **notes:** Smooth transitions between game states (spin → clue reveal → guess → discovery card). Satisfying animations for correct/incorrect answers, card flips, world spin. Snappy, playful animations make the game feel polished and fun.

- **I-020** Visual Feedback for Interactions
  - **source:** Product Owner
  - **date:** 2025-11-01
  - **notes:** Immediate visual feedback for all user interactions. Button hover states, click animations, correct/incorrect answer indicators, progress bar fills. Responsive UI elements make the game feel alive.

- **I-021** Full Country Database Expansion
  - **source:** Product Owner
  - **date:** 2025-11-01
  - **notes:** Future expansion to comprehensive global coverage. Create complete content for all countries: clue data, discovery card facts (animal facts, greetings, fossils, historical notes, space connections), and continental groupings. Age-appropriate with 5th-6th grade reading level.

- **I-022** Capytan Game Host Character
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **notes:** Friendly capybara character named Capytan acts as game host. Provides clues, encouragement, and fun facts in a whimsical way. Adds personality and guidance throughout the game.

- **I-023** Basic Internationalization Structure
  - **source:** Product Owner
  - **date:** 2025-11-01
  - **notes:** Simple JSON translation files (en.json, es.json, etc.) with translation keys used throughout the codebase. Basic language switcher UI component. Focus on making it easy for community contributors to add new languages later. Deferred: RTL support, complex validation workflows, automated cultural adaptation, pluralization rules.

- **I-024** Community Translation Guide
  - **source:** Product Owner
  - **date:** 2025-11-01
  - **priority:** 7
  - **notes:** Simple CONTRIBUTING.md section explaining how community members can add a new language. Include JSON structure, naming conventions, and basic PR guidelines. Keep it lightweight and welcoming. Deferred: Automated validation tools, translation management platforms, complex review workflows.

- **I-025** Internationalize ARIA Label Attributes for Accessibility
  - **source:** Code Reviewer (T-001 review via ask-codex)
  - **date:** 2025-11-01
  - **priority:** 4
  - **notes:** Externalize hardcoded ARIA label strings in App.jsx to translation files (en.json, es.json) to support screen readers in multiple languages. Current hardcoded strings include Capytan image label and flag card labels. Related to US-005 but marked out-of-scope for T-001 by Human Gatekeeper.

- **I-026** Rename 'greeting' Field to 'expression' for Greater Variety
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **priority:** 3
  - **notes:** Modify the country data model to rename the 'greeting' field to 'expression' to support more varied cultural expressions. Current implementation would result in "Hola!" appearing for all 36 Spanish-speaking countries. The 'expression' field would allow for country-specific phrases, idioms, or local variations that better represent each nation's unique culture while still maintaining the educational goal of teaching greetings and common expressions.

- **I-027** Add Open Source Footer with Contribution Link
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **priority:** 5
  - **notes:** Add a footer component to the application stating this is an open source project and welcoming community contributions. Include link to GitHub repository (https://github.com/zosorock/worldspinner). This promotes community engagement and transparency about the project's open source nature. Footer should be subtle and non-intrusive while clearly communicating the collaborative spirit of the project.

- **I-028** Refactor Country Card Data Storage for Scalability
  - **source:** Human Gatekeeper
  - **date:** 2025-11-01
  - **priority:** 2
  - **notes:** As the country database expands, the countryCards.js file will become large and difficult to maintain. Need a scalable solution for storing and translating country card data. Consider options like: splitting into individual JSON files per country, using a database, implementing lazy loading/code splitting, or organizing data by continent. The solution should support efficient loading, easy translation workflows, and maintainable file sizes while preserving the existing data structure and internationalization requirements.
