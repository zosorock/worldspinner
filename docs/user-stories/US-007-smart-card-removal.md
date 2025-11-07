# US-007: Smart Card Removal from Shuffle Deck

**Status**: Done
**Priority**: Medium
**Completed**: v0.3.0

## User Story

As a player
I want each country to appear only once per game session
So that I can discover new countries without repeating ones I've already guessed

## Acceptance Criteria

- [x] A country that has been correctly guessed does not appear again in the same session
- [x] Players can see visual feedback showing their progress through the available countries (e.g., "5 of 10 countries discovered")
- [x] When all countries have been guessed, players receive clear feedback and can reset to play again
- [x] The reset/reshuffle functionality returns all countries to the available pool
- [x] Progress is lost if the player refreshes the page (session-based only for MVP)
- [x] Incorrect guesses do not remove a country from the shuffle deck

## Technical Notes

- This feature improves game flow by preventing frustration from repeated countries
- Session persistence is intentionally simple (no localStorage) to keep MVP lean
- Visual progress indicator should be clear but non-intrusive
- Consider how this interacts with the existing `discoveredIds` state in App.jsx
- Reset functionality should be easily accessible when all cards are completed