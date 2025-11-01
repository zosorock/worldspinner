# US-001: Spin Mechanism and Country Selection

**Status**: Done
**Priority**: Critical - Day 1

## User Story

As a player
I want to spin a wheel that randomly selects a mystery country
So that I can start the guessing game with an element of surprise and excitement

## Acceptance Criteria

- [x] Spin button triggers country selection from hardcoded list of 5-10 countries
- [x] Visual spin animation (can be simple CSS rotation, no need for complex physics)
- [x] Country is randomly selected from available pool
- [x] After spin completes, game transitions to clue display state
- [x] Same country is not shown twice in a row
- [x] No network calls needed - all data hardcoded in code

## Technical Notes

- Start with 5-10 countries hardcoded directly in code (USA, Japan, Australia, Mexico, France, Egypt, Brazil, Kenya, India, Italy)
- No separate data files needed for Day 1
- Focus on functional mechanics, not visual polish

## Implementation

Implemented in v0.1.0