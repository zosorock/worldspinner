// T-012: Create Rotation Calculation Utility

/**
 * Calculates the total rotation degrees and duration for the two-phase spinning animation.
 *
 * The animation consists of two phases:
 * - Phase 1: Always completes exactly one full 360° cycle
 * - Phase 2: Randomly stops at any position in the second cycle (0-360°)
 *
 * This creates a roulette-style effect where the globe always spins at least one full rotation
 * before landing on a random position.
 *
 * @returns {{totalDegrees: number, duration: number}} Object containing:
 *   - totalDegrees: Total rotation in degrees (360-720)
 *   - duration: Animation duration in milliseconds (constant 8000ms = 8 seconds)
 *
 * @example
 * const { totalDegrees, duration } = calculateSpinRotation();
 * // totalDegrees might be 545 (360 + 185)
 * // duration is always 8000
 */
const calculateSpinRotation = () => {
  // Phase 1: One complete 360° rotation
  const phase1Degrees = 360;

  // Phase 2: Random stop position between 0-359° (inclusive)
  const phase2Degrees = Math.floor(Math.random() * 360);

  // Total rotation: phase 1 + phase 2 = 360 to 720 degrees
  const totalDegrees = phase1Degrees + phase2Degrees;

  // Animation duration: 8 seconds (8000 milliseconds)
  // Full speed for ~3 seconds, deceleration for ~5 seconds to stop
  const duration = 8000;

  return {
    totalDegrees,
    duration,
  };
};

export default calculateSpinRotation;
