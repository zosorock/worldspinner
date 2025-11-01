# US-002: Display Progressive Clues

**Status**: Done
**Priority**: Critical - Day 1

## User Story

As a player
I want to see three progressive clues (animal, food, flag) about the mystery country
So that I can make an educated guess based on the information provided

## Acceptance Criteria

- [x] Three clues displayed in sequence: Animal → Food → Flag
- [x] Animal clue: Display image and 1-sentence description
- [x] Food clue: Display image and name of iconic dish
- [x] Flag clue: Display flag image
- [x] Each clue has a "Next Clue" button (or auto-advance after timer)
- [x] All three clues use hardcoded data (images can be placeholder URLs or local assets)
- [x] Clues are clearly visible and readable on desktop and mobile

## Technical Notes

- Images can be placeholder URLs initially (flags from public domain, simple animal/food images)
- Keep layout simple - vertical stack of clues is fine for Day 1
- No fancy reveal animations needed yet

## Implementation

Implemented in v0.1.0