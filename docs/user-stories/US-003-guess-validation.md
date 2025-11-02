# US-003: Accept and Validate Player Guess

**Status**: Done
**Priority**: Critical - Day 1

## User Story

As a player
I want to type my guess for the country name and get immediate feedback
So that I know if I answered correctly or incorrectly

## Acceptance Criteria

- [x] Text input field for country name
- [x] Submit button to confirm guess
- [x] Case-insensitive matching (e.g., "usa" matches "USA")
- [x] Handles common variations (e.g., "United States", "USA", "America" all match)
- [x] Shows "Correct!" message with celebration visual (can be simple text/color change)
- [x] Shows "Incorrect - it was [Country Name]" message for wrong answers
- [x] After feedback, automatically transitions to discovery card

## Technical Notes

- Hardcode acceptable answer variations for each country
- No partial credit or spelling suggestions needed for Day 1
- Simple validation logic is sufficient

## Implementation

Implemented in v0.1.0