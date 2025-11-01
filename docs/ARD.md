# Architecture Requirements Document (ARD)

**Project**: World Spinner
**Last Updated**: 2025-11-01
**Status**: Active

---

## Executive Summary

World Spinner is a React-based educational geography game targeting children ages 7-12. The application follows a preseed development philosophy: simple, fast, MVP-focused implementations that prioritize getting working features into users' hands quickly over architectural perfection. The system uses a hardcoded data approach for initial release, with architecture designed to support future expansion to dynamic data sources.

---

## 1. Business Context

### 1.1 Product Vision
Enable children ages 7-12 to learn about world geography through an engaging game that combines visual clues, progressive discovery, and educational rewards.

### 1.2 Key Business Goals
- Launch playable MVP within preseed timeline
- Support multiple languages to reach Spanish-speaking families
- Establish foundation for community-contributed translations and content
- Maintain zero backend infrastructure cost (static hosting only)
- Ensure game works seamlessly on mobile and desktop devices

### 1.3 Success Criteria
- Children can complete full game loop (spin → clues → guess → discovery) independently
- Game loads in <2 seconds on 3G connection
- UI is intuitive enough for 7-year-olds without adult assistance
- Test coverage ≥80% ensures quality and maintainability

---

## 2. System Architecture

### 2.1 High-Level Architecture

**Architecture Pattern**: Single-Page Application (SPA) with client-side state management

```
┌─────────────────────────────────────┐
│         Static Web Host             │
│      (Vercel/Netlify/GitHub)        │
└─────────────────────────────────────┘
                 │
                 │ HTTP/S
                 ▼
┌─────────────────────────────────────┐
│         React SPA (Vite)            │
│  ┌───────────────────────────────┐  │
│  │     App.jsx (Main Game)       │  │
│  ├───────────────────────────────┤  │
│  │    Components Layer           │  │
│  │  - LanguageSwitcher           │  │
│  │  - FeedbackBanner             │  │
│  │  - DiscoveryItem              │  │
│  ├───────────────────────────────┤  │
│  │    Hooks Layer                │  │
│  │  - useTranslation             │  │
│  ├───────────────────────────────┤  │
│  │    Data Layer                 │  │
│  │  - countryCards.js (static)   │  │
│  │  - translations/*.json        │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│       Browser localStorage          │
│  - worldspinner_language            │
│  - Future: game progress/state      │
└─────────────────────────────────────┘
```

### 2.2 Technology Stack

**Core Technologies** (from Stack.md):
- **Frontend Framework**: React 19 (JavaScript, not TypeScript for MVP)
- **Build Tool**: Vite (fast dev server, optimized production builds)
- **Styling**: Tailwind CSS (utility-first)
- **Animation**: Framer Motion (declarative animations)
- **Testing**: Jest (≥80% coverage requirement)
- **Code Quality**: ESLint (Airbnb config), Prettier (120 char line length)

**Rationale**:
- React 19: Modern, well-documented, large community for future contributors
- Vite: Fast iteration cycles critical for preseed speed
- Tailwind CSS: Rapid UI development without custom CSS architecture
- Framer Motion: Smooth animations with minimal code
- No TypeScript: Reduces preseed complexity, can be added post-MVP

### 2.3 Component Architecture

**Design Principles**:
- **Composition over Configuration**: Small, focused components
- **Colocation**: Keep related code close (components, hooks, tests)
- **Minimal Abstraction**: Avoid premature generalization (preseed principle)
- **Progressive Enhancement**: Core functionality works, animations enhance

**Component Hierarchy**:
```
App.jsx (main container)
├── LanguageSwitcher
├── Capytan Section (host character tips)
│   └── Spin Button
├── Clue Board Section
│   ├── Clue Display
│   ├── Next Clue Button
│   └── Guess Form
├── FeedbackBanner (conditional)
└── Discovery Log Section
    └── DiscoveryItem[] (list of collected cards)
```

### 2.4 State Management

**Approach**: React hooks (useState, useMemo, useEffect) - no external state library

**State Structure** (App.jsx):
```javascript
// Game State
activeCountryId: string | null        // Current mystery country
clueIndex: number                     // 0, 1, or 2 (animal, food, flag)
guess: string                         // User input value
feedback: {type, message} | null      // Success/error/info banner
tipIndex: number                      // Rotating Capytan tips
discoveredIds: string[]               // IDs of countries guessed correctly

// Derived State (useMemo)
activeCard: CountryCard | null        // Full country data object
currentClue: Clue | null              // Current clue based on index
discoveredCards: CountryCard[]        // Full card objects for log

// i18n State (in useTranslation hook)
language: 'en' | 'es'                 // Current UI language
```

**Rationale**: Preseed simplicity - avoid Redux/Zustand until state complexity justifies it. Current state is simple enough for component-level useState.

---

## 3. Data Architecture

### 3.1 Country Data Model

**Current Structure** (countryCards.js):
```javascript
{
  id: string,                    // Unique kebab-case identifier
  name: string,                  // Official name for matching
  displayName: string,           // User-facing name
  emoji: string,                 // Country emoji icon
  continent: string,             // Geographic region
  flag: string,                  // Flag emoji
  aliases: string[],             // Alternate spellings/names for guess validation
  clues: [                       // Progressive clue system
    { label: string, text: string },  // Animal clue
    { label: string, text: string },  // Food clue
    { label: string, text: string }   // Flag clue
  ],
  discovery: {                   // Educational facts
    animalFact: string,
    greeting: string,
    fossil: string,              // Currently unused in UI
    history: string,
    space: string                // Currently unused in UI
  }
}
```

**Data Location**: Hardcoded in `app/src/data/countryCards.js` (no API, no database)

**Future Migration Path**: Structure designed to be JSON-serializable for future CMS/API integration

### 3.2 Translation Data Model

**Structure** (`app/src/locales/{lang}.json`):
```json
{
  "capytan": {
    "name": "string",
    "tip1": "string",
    "tip2": "string",
    "tip3": "string"
  },
  "buttons": {
    "spinGlobe": "string",
    "nextClue": "string",
    "submitGuess": "string"
  },
  "clueBoard": {
    "title": "string",
    "emptyState": "string",
    "guessLabel": "string",
    "guessPlaceholder": "string"
  },
  "feedback": {
    "emptyGuess": "string",
    "noActiveCountry": "string",
    "correct": "string with {variable}",
    "incorrect": "string"
  },
  "discoveryLog": {
    "title": "string",
    "emptyState": "string"
  }
}
```

**Design Decisions**:
- **Flat Structure**: Max 2 levels deep (category.key), easy for non-developers to contribute
- **Simple Interpolation**: Only `{variable}` replacement, no plural forms yet
- **No i18n Library**: Custom `useTranslation` hook keeps bundle size small
- **Fallback Strategy**: Missing keys return the key itself (dev-friendly debugging)

### 3.3 Persistence Layer

**Current**: Browser localStorage only
- `worldspinner_language`: User's language preference ('en' | 'es')

**Future**:
- Game progress (discovered countries)
- Earned badges/levels
- User preferences

---

## 4. Key Architectural Decisions

### 4.1 No Backend / Static Hosting

**Decision**: Deploy as static SPA with no server-side logic

**Rationale**:
- Zero hosting cost (critical for preseed/indie)
- Instant deployment to Vercel/Netlify/GitHub Pages
- No security concerns with user data (no PII collected)
- Simplified CI/CD pipeline

**Tradeoffs**:
- No user accounts or cross-device sync (acceptable for MVP)
- Content updates require redeployment (acceptable with small country set)
- No analytics beyond client-side tools (acceptable)

### 4.2 Hardcoded Country Data

**Decision**: Country data embedded in JavaScript, not fetched from API

**Rationale**:
- Instant load time (no API latency)
- Works offline after initial load
- No backend maintenance
- Preseed speed: focus on game mechanics, not data pipelines

**Tradeoffs**:
- Content updates require code changes and redeployment
- Bundle size grows with more countries (manageable up to ~50 countries)

**Migration Path**: Data structure is JSON-serializable and can be moved to CMS/API when scale justifies it

### 4.3 Custom i18n vs Library (i18next, react-intl)

**Decision**: Build custom `useTranslation` hook instead of using external library

**Rationale**:
- **Bundle Size**: External i18n libraries add 10-50KB (react-intl is 50KB+)
- **Complexity**: We only need simple key lookup and variable interpolation, not pluralization, date formatting, or RTL
- **Preseed Speed**: Writing 50 lines of custom hook code is faster than learning library API
- **Learning Curve**: Future contributors don't need to learn i18n library docs

**Tradeoffs**:
- No advanced features (pluralization, number formatting, RTL support)
- Custom maintenance burden (acceptable for simple implementation)

**Future**: If we add languages requiring complex features (Arabic RTL, Japanese plurals), reassess and potentially migrate to i18next

### 4.4 Component State vs Global State Management

**Decision**: Use component-level `useState` instead of Redux/Zustand/Context

**Rationale**:
- Current state is simple and contained in App.jsx
- No prop drilling issues (single-component app)
- Preseed principle: avoid premature optimization

**Trigger for Change**: When state needs to be shared across 3+ unrelated components or we add user accounts/persistence

### 4.5 No TypeScript for MVP

**Decision**: Continue using JavaScript instead of migrating to TypeScript

**Rationale**:
- **Preseed Speed**: TS setup and type definition time doesn't align with preseed philosophy
- **Contributor Friction**: JavaScript has lower barrier to entry for community contributions
- **PropTypes**: Using PropTypes provides basic type checking

**Future**: Consider TypeScript after v1.0 if codebase grows beyond 5,000 LOC or type-related bugs become frequent

---

## 5. Quality & Testing Strategy

### 5.1 Test Coverage Requirements

**Requirement**: ≥80% code coverage on all new code (per DoD.md)

**Testing Approach**:
- **Unit Tests**: All hooks, utility functions, pure logic
- **Component Tests**: User interactions, conditional rendering, prop handling
- **Integration Tests**: Full game flow (spin → clue → guess → discovery)
- **Manual Testing**: Visual QA on mobile and desktop breakpoints

**Test Structure** (TDD - Red/Green/Refactor):
1. **RED Phase**: Write failing tests defining expected behavior
2. **GREEN Phase**: Implement minimal code to pass tests
3. **REFACTOR Phase**: Improve code structure while keeping tests green

### 5.2 Code Quality Gates

**Automated Checks** (enforced via CI):
- ESLint (Airbnb config) must pass with zero errors
- Prettier formatting (120 char line length) must be applied
- Jest tests must achieve ≥80% coverage
- Build must succeed without errors

**Manual Checks**:
- Code review by Reviewer role
- Human Gatekeeper final approval
- Visual QA on mobile and desktop

---

## 6. Security & Performance

### 6.1 Security Considerations

**Threat Model**:
- **No User Data**: App doesn't collect PII, accounts, or sensitive information
- **localStorage Only**: Language preference is not sensitive
- **Static Assets**: No server-side code to exploit
- **Public Content**: Country facts and clues are public knowledge

**Current Mitigations**:
- No authentication/authorization needed
- No XSS risk (React escapes by default)
- No SQL injection risk (no database)
- HTTPS enforced by static hosting providers

**Future**: If we add user accounts or backend, implement proper auth and data validation

### 6.2 Performance Requirements

**Targets**:
- **Initial Load**: <2 seconds on 3G connection
- **Interaction Latency**: <100ms for UI responses (button clicks, input typing)
- **Animation Frame Rate**: 60fps for smooth Framer Motion animations
- **Bundle Size**: Keep total JS bundle <200KB gzipped

**Current Performance**:
- Vite's code splitting keeps initial bundle small
- Framer Motion animations use GPU acceleration
- Tailwind CSS purges unused styles in production

**Monitoring**: Use Chrome DevTools Lighthouse for performance audits before each release

---

## 7. Constraints & Assumptions

### 7.1 Technical Constraints

1. **Browser Support**: Modern browsers only (last 2 versions of Chrome, Firefox, Safari, Edge)
   - No IE11 support required
   - Assumes JavaScript enabled

2. **Device Support**:
   - Desktop: 1024px+ screens
   - Mobile: 375px+ screens (iPhone SE minimum)
   - No tablet-specific optimizations (responsive design covers)

3. **Network**:
   - Assumes internet connection for initial load
   - Works offline after first load (service worker not implemented yet)

4. **Data Volume**:
   - Current: 5 countries
   - Future: Up to 50 countries before considering API/lazy loading

### 7.2 Assumptions

1. **User Demographics**:
   - Ages 7-12 with basic reading comprehension
   - Access to device with screen keyboard (no voice input)
   - Adult supervision available for younger children (ages 7-8)

2. **Usage Patterns**:
   - Session duration: 5-15 minutes
   - Casual play (not daily habit building)
   - Solo play (multiplayer deferred)

3. **Content**:
   - English and Spanish are sufficient for initial market
   - Country facts remain in English for MVP (only UI translated initially)
   - Community contributors will help with future language expansion

4. **Deployment**:
   - Static hosting (Vercel/Netlify) provides sufficient availability
   - No SLA requirements (indie/educational project)

---

## 8. Open Questions & Risks

### 8.1 Open Questions

1. **Capytan Character (I-022)**:
   - Q: Should Capytan be animated or static emoji?
   - Q: How much personality/dialogue is appropriate for age group?
   - Q: Does this require Product Owner to create formal user story first?
   - Status: **Awaiting HG decision** - recommend Product Owner involvement

2. **Progression System (I-005)**:
   - Q: How should badges/levels persist (localStorage vs future backend)?
   - Q: What is the reward cadence that keeps engagement without addiction?
   - Q: Should this be broken into multiple user stories?
   - Status: **Awaiting HG decision** - recommend Product Owner involvement

3. **Translation Quality**:
   - Q: Who validates Spanish translations for accuracy and age-appropriateness?
   - Q: Should we engage native Spanish-speaking educators for review?
   - Status: **To be resolved in T-001** - recommend community review process

### 8.2 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Custom i18n hook has bugs | High | Medium | Thorough unit tests (≥80% coverage), manual QA in both languages |
| Spanish translations are inaccurate | Medium | Low | Use native speaker for review, document translation guidelines |
| Bundle size exceeds 200KB | Medium | Low | Monitor with bundlephobia, use code splitting if needed |
| Component state becomes unwieldy | Medium | Low | Refactor to Context/Zustand if prop drilling appears |
| Hardcoded data limits scaling | Low | High (expected) | Design data structure to be API-ready, document migration path |

### 8.3 Process Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Capytan/Progression features bypass Product Owner | High | Medium | **Architect escalates to HG** - enforce workflow |
| Tasks implemented without tests | High | Low | DoD.md requires ≥80% coverage, Reviewer enforces |
| Preseed speed leads to technical debt | Medium | High (expected) | Document debt in code comments, log to Ideas.md for future refactor |

---

## 9. Future Architecture Considerations

### 9.1 Future Enhancements

**Content Expansion**:
- Lazy load country data to reduce initial bundle size
- Consider CMS (Contentful, Sanity.io) for non-developer content updates
- API endpoint for dynamic content delivery

**User Accounts** (if needed):
- Firebase Auth or Supabase for authentication
- Cross-device progress sync
- Leaderboards or social features

**Advanced i18n**:
- Migrate to i18next if adding RTL languages (Arabic, Hebrew)
- Pluralization support for languages requiring it
- Region-specific cultural adaptations

**Offline Support**:
- Service Worker for full offline play
- IndexedDB for larger local data storage

**Analytics**:
- Privacy-respecting analytics (Plausible, Fathom)
- Track game completion rates, clue effectiveness
- A/B test clue wording for better hints

### 9.2 Scalability Considerations

**Current Limits**:
- ~50 countries max with current hardcoded approach
- localStorage limited to 5-10MB (sufficient for progress data)
- Single-component architecture works up to ~500 LOC in App.jsx

**Scaling Triggers**:
- App.jsx exceeds 500 LOC → Split into multiple components
- Country data exceeds 100KB → Move to API/lazy loading
- localStorage approaching 1MB → Consider IndexedDB

---

## 10. Traceability

### 10.1 Document References

- **[AppSpec.md]**: Feature definitions, acceptance criteria
- **[Product.md]**: Product vision, user stories
- **[Stack.md]**: Approved technology stack
- **[DoD.md]**: Quality gates and test coverage requirements
- **[GuardRails.md]**: Role boundaries, non-blocking warnings
- **[Evals.md]**: Evaluation schema for design reviews
- **[Backlog.md]**: User stories and implementation tasks

### 10.2 Version History

| Version | Date       | Author    | Changes |
|---------|------------|-----------|---------|
| 1.0     | 2025-11-01 | Architect | Initial ARD creation |

### 10.3 Approval

- **Architect**: [Pending - this document]
- **Human Gatekeeper**: [Awaiting review]

---

## Appendix A: Glossary

- **Preseed**: Development philosophy prioritizing speed and simplicity over perfection
- **MVP**: Minimum Viable Product - smallest feature set that delivers user value
- **POC**: Proof of Concept - initial working version to validate approach
- **TDD**: Test-Driven Development - write tests before implementation
- **SPA**: Single-Page Application - client-rendered web app
- **i18n**: Internationalization - designing software for multiple languages
- **DoD**: Definition of Done - quality checklist for completed work
