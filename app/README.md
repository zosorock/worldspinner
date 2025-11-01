# 🌍 World Spinner – React + Vite

A five-card, kid-friendly demo for the **World Spinner** geography game. Capytan the capybara host guides players through spinning a virtual globe, uncovering animal/food/flag clues, and unlocking discovery cards inspired by `prompt_init.md`, `Ideas.md`, and the stack guidelines in `Stack.md`.

## ✨ What's Included
- **React + Vite + Tailwind + Framer Motion** mobile-friendly layout with emoji-first visuals.
- **Five discovery cards** (USA, Japan, Egypt, Brazil, Australia) featuring simple animal, greeting, and history facts.
- **Lightweight flow**: spin for a mystery country, reveal up to three clues, submit a guess, and unlock the card once correct.
- **Jest + Testing Library** coverage ≥80% for modified files.

## 🚀 Quick Start
```bash
npm install
npm start
```
The dev server runs on [http://localhost:5173](http://localhost:5173) with instant hot module replacement (HMR).

## 🧪 Quality Gates
- `npm run lint` – ESLint using the Airbnb config + Prettier.
- `npm run format` – Prettier formatter (line length 120, single quotes).
- `npm run test` – Jest watch mode.
- `npm run test:coverage` – Jest with coverage report (used by the DoD).
- `npm run build` – Production bundle via Vite (outputs to `dist/`).

## 🗂️ Key Files
- `src/data/countryCards.js` – Structured content for all five countries.
- `src/App.jsx` – Simplified mobile-first flow: spin, clues, guessing, and discovery log.
- `src/App.test.js` – Interaction-focused tests covering hidden cards, clue progression, cleared input, and tip rotation.

## 📌 Next Ideas
- Expand the deck beyond the starter five countries.
- Pull card content from a backend or CMS to enable multiplayer later.
- Add lightweight image assets once sourcing is confirmed.
