# Development Backlog

---

## Active Stories

### US-008: Clock-Hand Style Globe Spinning Animation
**Status**: In Progress
**Priority**: Medium
**Details**: [docs/user-stories/US-008-globe-spin-animation.md](docs/user-stories/US-008-globe-spin-animation.md)

Dramatic roulette-style spinning animation for the globe that builds anticipation before revealing the mystery country.

---

## Implementation Tasks

### Foundation Tasks (Visual & State)

### T-010: Add Spinning Globe Visual Element
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: High | **Owner**: Human Gatekeeper | **Retries**: 1 (successful)

Add a visible spinning globe element (located in `app/public/images/world.png`) to the UI that will rotate during the spin animation.

**Description**:
Create a visual element representing the globe that will rotate like a clock hand during the spin animation. This task focuses solely on adding the static visual element with proper positioning and styling - no animation logic yet.

**Technical Details**:
- Add globe image ([app/public/images/world.png])
- Position above or near the "Spin the Globe" button
- Style with Tailwind CSS: appropriate size, centered, transform-origin set to center
- Add ARIA label for accessibility: "Spinning globe animation"
- Element should be visible but static (no rotation yet)
- Use CSS class for easy targeting in animation tasks

**Acceptance Checklist**:
- [x] Tests written and failing (RED complete)
- [x] Implementation makes tests pass (GREEN complete)
- [x] Code refactored with tests still passing (REFACTOR complete)
- [x] Globe visual element visible in UI near spin button
- [x] Element has proper ARIA label for screen readers
- [x] Styled appropriately with Tailwind CSS
- [x] Transform-origin set to center for future rotation
- [x] Element does not interfere with existing layout
- [x] Unit tests cover rendering and styling
- [x] Coverage ≥80% of modified code
- [x] Documentation updated in code comments

**Notes**:
- Retry #1 completed successfully with all DoD violations remediated
- Code Reviewer approval received
- Build successful, all 140 tests passing (100% pass rate)
- Coverage: 97.87% overall, 96.84% on App.jsx (exceeds ≥80%)
- ESLint: 0 errors, 0 warnings
- TDD Evidence: Comprehensive RED → GREEN → REFACTOR documentation
- ARIA Label: Internationalized with en/es translations
- Commits: dfc5bf1, 27d9c58, dbdd7bf
- CHANGELOG updated with commit SHA
- All 11 acceptance criteria satisfied
- Ready for Human Gatekeeper final approval

---

### T-011: Add Spinning State Management
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: High | **Owner**: Human Gatekeeper | **Retries**: 0

Add state management to track when the globe is spinning and prevent multiple simultaneous spin animations.

**Description**:
Introduce `isSpinning` boolean state to App.jsx to track animation status. Update the spin button's disabled logic to prevent users from triggering multiple overlapping animations. This is pure state logic with no animation implementation yet.

**Technical Details**:
- Add `isSpinning` state using `useState(false)` in App.jsx
- Update spin button disabled condition: `disabled={availableCountries.length === 0 || isSpinning}`
- Add placeholder logic: `setIsSpinning(true)` in spinGlobe, `setIsSpinning(false)` after operation
- No actual animation yet - just state tracking infrastructure

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] `isSpinning` state added to App.jsx
- [ ] Spin button disabled when `isSpinning === true`
- [ ] Spin button enabled when `isSpinning === false` and countries available
- [ ] State properly resets after operation completes
- [ ] Unit tests verify button disabled state logic
- [ ] Integration test verifies state flow
- [ ] Coverage ≥80% of modified code
- [ ] Documentation updated in code comments

---

### T-012: Create Rotation Calculation Utility
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: High | **Owner**: Human Gatekeeper

Create a pure utility function that calculates the total rotation degrees and duration for the two-phase spin animation.

**Description**:
Build the mathematical foundation for the spinning animation. This function calculates: Phase 1 (full 360° cycle) + Phase 2 (random 0-360° stop position) = total rotation in degrees. Returns both the total degrees and the animation duration.

**Technical Details**:
- Create function: `calculateSpinRotation(): { totalDegrees: number, duration: number }`
- Phase 1: Always 360 degrees (one full cycle)
- Phase 2: `Math.floor(Math.random() * 360)` (random stop position)
- Total: `360 + phase2Random`
- Duration: 8 seconds (full speed for 3 seconds, deceleration for 5 seconds to full stop)
- Pure function with no side effects
- Location: Could be in App.jsx or separate utils file

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Function returns object with `totalDegrees` and `duration`
- [ ] `totalDegrees` always between 360 and 720 (360 + 0-360)
- [ ] `duration` is constant 8 seconds
- [ ] Function is pure (same inputs = same outputs, no side effects)
- [ ] Unit tests cover minimum (360), maximum (720), and random values
- [ ] Tests verify return type structure
- [ ] Coverage 100% on this utility function
- [ ] Documentation includes usage examples

---

### Animation Tasks

### T-013: Implement Basic Framer Motion Rotation
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: High | **Owner**: Human Gatekeeper

Implement the visual rotation animation using Framer Motion's animate API with linear motion (no easing yet).

**Description**:
Use Framer Motion to rotate the globe element created in T-010. Apply the rotation calculation from T-012 to animate from 0° to the calculated total degrees. This task implements basic linear rotation without deceleration - easing comes in T-014.

**Technical Details**:
- Use Framer Motion's imperative `animate()` API or `useAnimate()` hook
- Target the globe element from T-010
- Apply CSS transform: `rotate(${totalDegrees}deg)`
- Use linear easing initially: `ease: "linear"`
- Duration from T-012 calculation (8s)
- Set `isSpinning: true` at start, `false` at completion
- Use `await animate()` or completion callback

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Globe element rotates when spin button clicked
- [ ] Rotation uses degrees calculated by T-012
- [ ] Animation duration matches T-012 duration (8s)
- [ ] Linear motion (constant speed throughout)
- [ ] `isSpinning` state updated correctly (true during, false after)
- [ ] Animation completes before proceeding
- [ ] Unit tests with mocked Framer Motion
- [ ] Coverage ≥80% of animation logic
- [ ] Documentation explains animation approach

---

### T-014: Add Deceleration Easing Curve
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: High | **Owner**: Human Gatekeeper

Apply a smooth deceleration easing curve to the rotation animation to create a realistic roulette-style spinning effect.

**Description**:
Replace the linear easing from T-013 with a custom ease-out bezier curve that creates a realistic deceleration effect. The globe should spin fast initially and smoothly slow down to a stop, mimicking a real roulette wheel or prize wheel.

**Technical Details**:
- Replace `ease: "linear"` with custom bezier curve
- Recommended: `ease: [0.33, 1, 0.68, 1]` (ease-out cubic)
- Or use Framer Motion preset: `ease: "easeOut"`
- Test visually to ensure smooth, natural deceleration
- May need to adjust curve coefficients for best feel
- Document chosen easing curve and rationale

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Easing curve applied to rotation animation
- [ ] Visual deceleration effect is smooth and realistic
- [ ] Animation starts fast and ends slow
- [ ] Total duration remains 8 seconds
- [ ] Easing curve documented in code comments
- [ ] Unit tests verify easing configuration
- [ ] Manual visual QA confirms natural motion
- [ ] Coverage ≥80% of modified code
- [ ] Documentation includes easing rationale

---

### T-015: Integrate Animation with Country Selection
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: High | **Owner**: Human Gatekeeper

Refactor the spinGlobe function to wait for animation completion before revealing the mystery country and showing clues.

**Description**:
Connect the animation system (T-013/T-014) with the existing country selection logic. The country should be randomly selected but NOT revealed until the animation completes. This creates anticipation and preserves the dramatic effect. All existing game flow (clues, tips, state updates) must be preserved.

**Technical Details**:
- Refactor `spinGlobe()` to be async or callback-based
- Call animation first (T-013/T-014 rotation)
- Wait for animation completion
- Then execute existing country selection logic:
  - `setActiveCountryId(nextCard.id)`
  - `setClueIndex(0)`
  - `setFeedback(null)`
  - `setTipIndex(...)`
  - `setGuess('')`
- Preserve duplicate prevention logic
- Ensure `isSpinning` state properly managed

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Animation completes before country is revealed
- [ ] Country selection still random from available pool
- [ ] All existing state updates preserved (clues, tips, feedback)
- [ ] No duplicate countries selected consecutively
- [ ] Game flow works identically to before (with animation delay)
- [ ] Integration tests cover full spin → animate → reveal flow
- [ ] Edge case: spinning when no countries available (handled gracefully)
- [ ] Coverage ≥80% of modified code
- [ ] Documentation explains integration flow

---

### Sound System Tasks

### T-016: Source and Add Click Sound File
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: Medium | **Owner**: Human Gatekeeper

Find or create a short roulette-style click sound and add it to the project.

**Description**:
Locate a suitable public domain click/tick sound that mimics a roulette wheel clicking past markers. The sound should be short (50-100ms), crisp, and lightweight (< 50KB). If no suitable sound is found, create a simple beep using an audio generation tool.

**Technical Details**:
- Format: MP3 (broad browser support)
- Duration: 50-100ms ideal
- File size: < 50KB (optimize for web delivery)
- Source options:
  - Freesound.org (public domain/CC0)
  - Zapsplat.com (free tier)
  - Generate with Audacity or online tone generator
- Add to `app/public/sounds/click.mp3`
- Document source/license in README if applicable
- Test file plays in browser before committing

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Sound file located or created
- [ ] File format is MP3
- [ ] Duration is 50-100ms
- [ ] File size < 50KB
- [ ] File added to `app/public/sounds/click.mp3`
- [ ] Sound plays correctly in Chrome, Firefox, Safari
- [ ] Source/license documented in README if needed
- [ ] File committed to repository
- [ ] Coverage: N/A (asset file)
- [ ] Documentation includes audio source information

---

### T-017: Create AudioManager Utility
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: Medium | **Owner**: Human Gatekeeper

Create a utility module for managing sound playback with browser compatibility checks and error handling.

**Description**:
Build a reusable audio management utility that encapsulates HTML5 Audio API usage. This utility will handle sound preloading, playback, browser compatibility detection, and graceful fallback when audio is unavailable. Keep it simple and focused - no complex audio processing needed for preseed.

**Technical Details**:
- Create `app/src/utils/audioManager.js`
- Export functions:
  - `preloadSound(src: string): Promise<Audio>` - Preloads audio file
  - `playClick(audioInstance: Audio): void` - Plays click sound
  - `stopAllSounds(audioInstance: Audio): void` - Cleanup
- Use HTML5 Audio API: `new Audio(src)`
- Check browser support: `typeof Audio !== 'undefined'`
- Error handling: try-catch with console.warn on failure
- Return null on failure (graceful degradation)
- No external audio library (preseed simplicity)

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] `preloadSound()` function loads audio file
- [ ] `playClick()` function plays sound
- [ ] `stopAllSounds()` function stops playback
- [ ] Browser compatibility check implemented
- [ ] Error handling with graceful fallback
- [ ] Functions return null/undefined on failure (no crashes)
- [ ] Unit tests with mocked Audio API
- [ ] Tests cover success and failure paths
- [ ] Coverage 100% on this utility module
- [ ] Documentation includes usage examples and error cases

---

### T-018: Add Mute/Unmute Control UI
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: Medium | **Owner**: Human Gatekeeper

Add a mute/unmute button to the UI that allows users to control sound effects with preference persistence.

**Description**:
Create a small, unobtrusive mute control button near the spin button. The button should toggle between muted and unmuted states, persist the preference to localStorage, and update state immediately. The control should use speaker emojis (🔇 muted / 🔊 unmuted) for clarity.

**Technical Details**:
- Add `isSoundMuted` state using `useState(false)` in App.jsx
- Load initial state from localStorage: `worldspinner_soundMuted`
- Create mute button component or inline button element
- Button shows: 🔇 when muted, 🔊 when unmuted
- On click: toggle state, save to localStorage
- Position near spin button but not prominent
- Style with Tailwind CSS (small button, border, hover state)
- Add ARIA label: "Toggle sound effects"

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] `isSoundMuted` state added to App.jsx
- [ ] Mute button visible near spin button
- [ ] Button shows correct icon (🔇 or 🔊) based on state
- [ ] Clicking button toggles state
- [ ] Preference persists to localStorage: `worldspinner_soundMuted`
- [ ] Preference loads on component mount
- [ ] Button has ARIA label for accessibility
- [ ] Unit tests cover state toggle logic
- [ ] Tests verify localStorage read/write
- [ ] Coverage ≥80% of modified code
- [ ] Documentation explains localStorage key

---

### Sound Integration Tasks

### T-019: Implement Click Interval Algorithm
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: Medium | **Owner**: Human Gatekeeper

Create an algorithm that calculates click sound intervals based on animation progress, creating a deceleration effect for the audio.

**Description**:
Build a pure function that maps animation progress (0.0 to 1.0) to click sound intervals (50ms to 300ms). The function should apply the same easing curve used in the visual animation so that click frequency decelerates proportionally with the spinning motion. Fast clicks at the start, slow clicks at the end.

**Technical Details**:
- Create function: `calculateClickInterval(progress: number): number`
- Input: `progress` from 0.0 (start) to 1.0 (end)
- Output: interval in milliseconds (50-300ms)
- Start: 50ms intervals (fast clicking, ~20 clicks/second)
- End: 300ms intervals (slow clicking, ~3 clicks/second)
- Apply easing curve: same as animation easing `[0.33, 1, 0.68, 1]`
- Formula: `minInterval + (maxInterval - minInterval) * easedProgress`
- Pure function with no side effects
- 100% test coverage

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Function accepts progress (0.0-1.0) and returns interval (ms)
- [ ] Progress 0.0 returns ~50ms (fast clicks)
- [ ] Progress 1.0 returns ~300ms (slow clicks)
- [ ] Intermediate values smoothly interpolate
- [ ] Easing curve matches animation easing
- [ ] Function is pure (no side effects)
- [ ] Unit tests cover edge cases (0.0, 0.5, 1.0)
- [ ] Coverage 100% on this function
- [ ] Documentation explains easing application

---

### T-020: Sync Sound Clicks with Animation
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: High | **Owner**: Human Gatekeeper

Integrate the sound system with the animation, triggering click sounds at calculated intervals that decelerate with the visual motion.

**Description**:
Connect AudioManager (T-017), click interval algorithm (T-019), and the rotation animation (T-013/T-014). Use Framer Motion's animation callbacks to track progress and trigger sounds at the right moments. Respect the mute state before each play. This is the most complex integration task.

**Technical Details**:
- Use Framer Motion's `onUpdate` callback to get animation progress
- Call `calculateClickInterval(progress)` from T-019
- Use `requestAnimationFrame` or dynamic timers for precision
- Call `AudioManager.playClick()` at calculated intervals
- Check `isSoundMuted` state before each play
- Clean up timers when animation completes
- Handle edge cases: animation interrupted, audio fails to load

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Click sounds play during animation
- [ ] Click frequency starts fast (50ms intervals)
- [ ] Click frequency ends slow (300ms intervals)
- [ ] Deceleration matches visual animation
- [ ] No clicks play when `isSoundMuted === true`
- [ ] Timers properly cleaned up after animation
- [ ] No crashes if audio fails to load
- [ ] Integration tests with mocked timers and audio
- [ ] Coverage ≥80% of integration code
- [ ] Documentation explains sync mechanism

---

### T-021: Add Translation Keys for Sound Controls
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: Low | **Owner**: Human Gatekeeper

Add internationalization keys for the new sound control UI elements to both English and Spanish translation files.

**Description**:
Following the existing i18n structure, add translation keys for the mute button labels and ARIA labels for the spinning globe element. Update both `en.json` and `es.json` files, ensuring structure integrity and proper variable interpolation.

**Technical Details**:
- Add to `buttons` section: `muteSound`, `unmuteSound`
- Add to `ariaLabels` section: `spinningGlobe`, `soundControl`
- English values:
  - `muteSound`: "🔇 Mute"
  - `unmuteSound`: "🔊 Sound"
  - `spinningGlobe`: "Spinning globe animation"
  - `soundControl`: "Toggle sound effects"
- Spanish translations (work with native speaker if possible)
- Update `locales.test.js` if needed
- Verify max 2-level nesting maintained

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Keys added to `en.json`: `buttons.muteSound`, `buttons.unmuteSound`
- [ ] Keys added to `en.json`: `ariaLabels.spinningGlobe`, `ariaLabels.soundControl`
- [ ] Same keys added to `es.json` with Spanish translations
- [ ] Translation structure remains max 2 levels deep
- [ ] Emojis preserved in button labels
- [ ] `locales.test.js` passes (structure validation)
- [ ] All existing tests still pass
- [ ] Coverage maintained ≥80%
- [ ] Documentation updated if translation guide needs changes

---

### Polish & Testing Tasks

### T-022: Mobile Audio Compatibility Testing
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: Medium | **Owner**: Human Gatekeeper

Test and verify audio functionality on mobile devices (iOS and Android), implementing workarounds for platform-specific limitations.

**Description**:
Mobile browsers, especially iOS Safari, have strict audio policies. Test the audio system on real devices and implement necessary workarounds. iOS requires user interaction to "unlock" the audio context - the first spin button click should unlock it, allowing subsequent spins to play sound. Document any limitations and provide graceful fallback.

**Technical Details**:
- Test on iOS Safari (iPhone)
- Test on Android Chrome
- iOS: Audio context unlock on first user interaction
- Android: Generally more permissive, verify functionality
- Fallback: If audio fails, visual animation still works
- Consider adding user-visible message if audio unavailable
- Document mobile limitations in README
- Manual testing checklist (cannot fully automate mobile audio)

**Acceptance Checklist**:
- [ ] Tested on iOS Safari (real device)
- [ ] Tested on Android Chrome (real device)
- [ ] First spin button click unlocks audio on iOS
- [ ] Subsequent spins play sound correctly
- [ ] Visual animation works even if audio fails
- [ ] No crashes or errors when audio unavailable
- [ ] User feedback if audio cannot play (optional, nice-to-have)
- [ ] Manual testing checklist documented
- [ ] Mobile limitations documented in README
- [ ] Code comments explain mobile workarounds
- [ ] Coverage maintained ≥80% (automated tests)
- [ ] Workshop entry for mobile audio gotchas

---

### T-023: Performance Optimization
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: Medium | **Owner**: Human Gatekeeper

Optimize the animation and sound system for smooth 60fps performance on mobile and low-end devices.

**Description**:
Apply performance optimizations to ensure the spinning animation runs smoothly at 60fps on target devices (iPhone SE, mid-range Android). Use CSS performance best practices, verify GPU acceleration, profile with React DevTools, and optimize timing if needed.

**Technical Details**:
- Add CSS `will-change: transform` to spinning globe element
- Verify GPU acceleration in Chrome DevTools (Rendering > Layer Borders)
- Profile animation with React DevTools Profiler
- Test on iPhone SE (low-end iOS device)
- Test on mid-range Android device
- Measure frame rate (target: 60fps)
- Optimize if frame drops detected:
  - Reduce animation complexity
  - Simplify sound triggering logic
  - Use `transform` instead of other properties
- Document performance benchmarks

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] `will-change: transform` applied to spinning element
- [ ] GPU acceleration verified in DevTools
- [ ] Animation runs at ~60fps on desktop
- [ ] Animation runs at ≥30fps on iPhone SE
- [ ] Animation runs at ≥30fps on mid-range Android
- [ ] No layout thrashing or jank
- [ ] React DevTools profiler shows acceptable render times
- [ ] Performance benchmarks documented
- [ ] Coverage maintained ≥80%
- [ ] Documentation includes optimization notes

---

### T-024: Integration Tests & Final Verification
**Status**: Awaiting Approval | **Parent Story**: US-008 | **Priority**: High | **Owner**: Human Gatekeeper

Create comprehensive integration tests covering the complete spin animation flow and verify all acceptance criteria are met.

**Description**:
Write full integration tests that verify the entire feature from button click through animation, sound, and country reveal. Test all edge cases, error conditions, and user interactions. This is the final quality gate ensuring everything works together correctly before Human Gatekeeper review.

**Technical Details**:
- Integration test: Click spin → animation starts → sounds play → country revealed
- Test mute control: muted = no sounds, unmuted = sounds
- Test rapid clicks: button disabled during spin (no double-spins)
- Test edge cases:
  - All countries discovered (button disabled, no spin)
  - Audio fails to load (graceful fallback)
  - Animation interrupted (cleanup handled)
- Verify state management: `isSpinning` properly managed
- Verify localStorage persistence: mute preference
- Mock Framer Motion and Audio API for reliable testing
- Verify ≥80% coverage on ALL new code

**Acceptance Checklist**:
- [ ] Tests written and failing (RED complete)
- [ ] Implementation makes tests pass (GREEN complete)
- [ ] Code refactored with tests still passing (REFACTOR complete)
- [ ] Integration test: full spin flow (button → animate → sound → reveal)
- [ ] Test: mute button toggles sound playback
- [ ] Test: rapid button clicks handled correctly
- [ ] Test: edge case - no countries available
- [ ] Test: edge case - audio fails to load
- [ ] Test: localStorage persistence works
- [ ] All unit tests passing (132+ tests)
- [ ] Coverage ≥80% on all new code (branches, functions, lines, statements)
- [ ] ESLint passes with 0 errors
- [ ] Build succeeds without errors
- [ ] Manual QA on desktop and mobile completed
- [ ] All US-008 acceptance criteria verified
- [ ] Documentation complete and accurate

---

## Active Bugs

### B-001: Sound Overlapping During Globe Spin Animation
**Status**: Done | **Parent Story**: US-008 | **Priority**: Critical | **Owner**: Human Gatekeeper | **Retries**: 1 (successful)

Sound effects overlap and stack during globe spin animation, creating chaotic audio playback instead of clean sequential clicks.

**Root Cause**:
The implementation uses a single shared Audio instance (`clickSoundRef.current`) that is played repeatedly at short intervals (50-300ms). When `playClick()` is called before the previous sound has finished playing, it resets `currentTime = 0` on the same Audio instance and calls `play()` again. This causes the browser's audio engine to stack multiple play operations on the same instance, creating overlapping/chaotic audio.

**Steps to Reproduce**:
1. Ensure sound is unmuted (🔊)
2. Click "Spin the Globe" button
3. Listen to the click sounds during the 8-second animation
4. Observe: Sounds overlap and create cacophony, especially at the start when intervals are fastest (50ms)

**Expected Behavior**:
Clean, sequential click sounds with each click completing before the next one plays, creating a roulette-style deceleration effect.

**Actual Behavior**:
Overlapping, stacking click sounds creating audio chaos. Multiple instances of the same sound play simultaneously.

**Technical Details**:
- Affected code: `app/src/App.jsx` lines 156-173 (scheduleNextClick function)
- Affected code: `app/src/utils/audioManager.js` lines 48-68 (playClick function)
- Single Audio instance: `clickSoundRef.current` (App.jsx line 98)
- Problem: Resetting and replaying the same Audio instance before it finishes

**Suggested Fix Approaches**:
1. **Option A (Simplest)**: Add guard to prevent calling `play()` if audio is already playing (check `audioInstance.paused === false`)
2. **Option B (Better control)**: Create new Audio instance for each click (clone or recreate)
3. **Option C (Most robust)**: Use Web Audio API with AudioBufferSourceNode for precise control
4. **Option D (Preseed-friendly)**: Extend the minimum click interval to be longer than the sound file duration

**Acceptance Criteria**:
- [x] Click sounds play sequentially without overlap
- [x] Each click completes before the next one starts
- [x] Audio deceleration effect is smooth and matches visual animation
- [x] No audio chaos or stacking sounds
- [x] Solution works on desktop (Chrome, Firefox, Safari) - VERIFIED BY HG
- [x] Solution works on mobile (iOS Safari, Android Chrome) - VERIFIED BY HG
- [x] Tests verify no overlapping playback
- [x] Coverage ≥80% on modified code

**Implementation (Retry #1)**:
- Used audio pooling approach (Option A from Code Reviewer's suggestions)
- Created pool of 3 Audio instances via `preloadSound('/sounds/click.mp3', { poolSize: 3 })`
- Modified `playClick()` to rotate through pool in round-robin fashion
- Modified `stopAllSounds()` to stop all instances in pool
- Maintained backward compatibility for single Audio instance usage
- All 178 tests passing (17 tests in audioManager.test.js including 7 new pooling tests)
- Coverage: 86.88% statements, 90% branches, 83.33% functions, 88.13% lines
- ESLint: 0 errors, 0 warnings
- Build: successful

**Cross-Browser Testing Requirements**:
Manual QA must verify on the following browsers:
1. **Desktop**:
   - Chrome (latest): Verify click sounds play sequentially during 8-second spin
   - Firefox (latest): Verify click sounds play sequentially during 8-second spin
   - Safari (latest): Verify click sounds play sequentially during 8-second spin
2. **Mobile**:
   - iOS Safari (real device): Verify sounds work after first user interaction, sequential playback
   - Android Chrome (real device): Verify sequential playback, no audio stacking
3. **Test Procedure**:
   - Unmute sound (🔊)
   - Click "Spin the Globe" button
   - Listen for clean sequential clicks (fast → slow deceleration)
   - Verify no overlapping/stacking sounds
   - Verify clicks sync with visual rotation speed

**Notes**:
- HG Feedback: "sounds like the sounds are overlapping. Are you using more than one sound? if you are starting the sound multiple times perhaps you need to limit the number of starts."
- This is the highest priority bug identified in US-008 assessment
- Audio pooling solution prevents dropped clicks while avoiding overlap
- Rotation index tracked in module-level variable for stateful round-robin behavior
- COMPLETED: Human Gatekeeper approved after manual testing on desktop and mobile
- Manual QA confirmed clean sequential playback with no overlapping sounds
- Approved At: 2025-12-28

---

### B-002: Mute Button Unresponsive During Mid-Spin
**Status**: Ready | **Parent Story**: US-008 | **Priority**: Medium | **Owner**: Scrum Master | **Retries**: 0

The mute/unmute button can be clicked during globe spin animation, but it doesn't affect sounds that are already scheduled. Users expect clicking mute to immediately silence the spinning sound.

**Root Cause**:
The `scheduleNextClick()` function (App.jsx lines 156-173) checks `isSoundMuted` only once at the start of the animation (line 157). All subsequent click sounds are pre-scheduled via `setTimeout` and stored in `clickTimeoutsRef.current`. When the user toggles mute mid-spin, the state changes but the already-scheduled timeouts continue to execute and play sounds.

**Steps to Reproduce**:
1. Ensure sound is unmuted (🔊)
2. Click "Spin the Globe" button
3. While globe is spinning and sounds are playing, click the mute button (🔇)
4. Observe: Sounds continue playing until the animation completes

**Expected Behavior**:
Clicking the mute button during animation should immediately stop all currently playing and scheduled sounds.

**Actual Behavior**:
Mute button changes state, but pre-scheduled click sounds continue to play until animation completes.

**Technical Details**:
- Affected code: `app/src/App.jsx` lines 156-173 (scheduleNextClick)
- Affected code: `app/src/App.jsx` lines 277-288 (handleToggleMute)
- Issue: `isSoundMuted` checked only at spinGlobe invocation, not before each playClick call

**Suggested Fix Approaches**:
1. **Option A**: Check `isSoundMuted` before each `playClick()` call in the timeout callback
2. **Option B**: Clear all scheduled timeouts when mute is toggled, add cleanup to `handleToggleMute`
3. **Option C**: Store interval ID and cancel/restart scheduling when mute changes

**Acceptance Criteria**:
- [ ] Clicking mute during animation immediately silences sounds
- [ ] No click sounds play after mute button is clicked
- [ ] Clicking unmute during animation resumes sounds from current progress point
- [ ] Mute state persists to localStorage correctly
- [ ] Tests verify mid-animation mute behavior
- [ ] Coverage ≥80% on modified code

**Notes**:
- Identified as "Moderate" issue in US-008 assessment
- User experience issue: Players expect immediate response to mute control

---

---
