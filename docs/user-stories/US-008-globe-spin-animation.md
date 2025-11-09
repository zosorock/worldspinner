# US-008: Clock-Hand Style Globe Spinning Animation

**Status**: Ready

**Priority**: High

**CRITICAL**: This is the core mechanic that defines "World Spinner" - the game is named after this feature.

## User Story

As a player
I want to see and hear a dramatic roulette-style spinning animation when I click "Spin the Globe"
So that I feel anticipation and excitement before the mystery country is revealed

## Acceptance Criteria

### Spin Mechanics
- [ ] Clicking "Spin the Globe" button triggers a roulette-style spin animation where the globe rotates around a central pivot point (like a clock hand or prize wheel)
- [ ] The globe spins exactly 1 full cycle (360 degrees) first
- [ ] After completing the first full cycle, the globe randomly picks a stopping point in the next lap (1 of the 360 degrees in the second rotation)
- [ ] The animation is smooth and visually engaging, using Framer Motion for the rotation effect
- [ ] The spin smoothly decelerates to a stop at the randomly selected position
- [ ] The animation reveals the mystery country at the end of the spin sequence

### Sound Effects (IN SCOPE - Core Mechanic)
- [ ] A simple click sound plays during the spin, similar to a roulette wheel clicking past markers
- [ ] The click sound frequency decelerates proportionally with the spinning animation (clicks are frequent during fast spin, slow down as the globe decelerates)
- [ ] The sound effect is simple and lightweight (no complex audio processing required)
- [ ] Sound plays appropriately on both desktop and mobile devices
- [ ] Sound can be muted/controlled by user if needed

### Performance & Compatibility
- [ ] The animation works smoothly on both desktop and mobile devices without performance issues
- [ ] The existing game flow is preserved: spin → clues display → guess input
- [ ] Animation doesn't block user interaction or cause layout shifts
- [ ] Total spin duration is approximately 8 seconds (including deceleration), full speed for about 3 seconds.

## Technical Notes

### Animation Implementation
- Use Framer Motion's rotate animation capabilities for smooth transitions
- Consider using CSS transforms for performance (GPU acceleration)
- Implement two-phase rotation: phase 1 (full 360° cycle) + phase 2 (0-360° random stop position)
- Use easing functions to create realistic deceleration effect (e.g., ease-out or custom bezier curve)

### Sound Implementation
- Simple roulette-style click sound (short, clean audio file - likely < 100ms duration)
- Use HTML5 Audio API or lightweight audio library
- Calculate click frequency based on current rotation velocity
- Sound frequency must decrease proportionally as animation decelerates
- Keep sound file size minimal for fast loading

### Scope Clarification
- **Previously deferred**: Complex sound effects, music, ambient audio
- **NOW IN SCOPE**: Simple roulette click sounds that enhance the core "World Spinner" mechanic
- **Rationale**: The click sound is essential to the roulette/wheel experience and simple enough to implement without significant complexity. This is not "sound effects expansion" - this IS the core mechanic.

### Design Constraints
- Must maintain current responsive design and mobile-first approach
- Animation should feel dramatic but not too slow (8 seconds maximum)
- Sound must work across browsers and devices (consider fallbacks for browsers without audio support)
- Ensure animation doesn't impact game state management or cause race conditions
