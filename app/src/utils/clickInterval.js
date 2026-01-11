// T-019: Click Interval Algorithm

/**
 * Calculates click sound interval based on animation progress with easing.
 * Maps progress (0.0-1.0) to interval (50-300ms) using easeOut curve
 * to match the visual animation deceleration.
 *
 * @param {number} progress - Animation progress from 0.0 (start) to 1.0 (end)
 * @returns {number} Click interval in milliseconds (50-300ms)
 *
 * @example
 * calculateClickInterval(0.0) // ~50ms (fast clicks at start)
 * calculateClickInterval(0.5) // ~175ms (medium speed)
 * calculateClickInterval(1.0) // ~300ms (slow clicks at end)
 */
const calculateClickInterval = (progress) => {
  const MIN_INTERVAL = 100; // Fast clicks: ~20 per second
  const MAX_INTERVAL = 750; // Slow clicks: ~3 per second

  // Clamp progress to 0.0-1.0 range for safety
  const clampedProgress = Math.max(0, Math.min(1, progress));

  // Apply easeOut curve (same as animation): starts fast, ends slow
  // Using cubic-bezier approximation: easeOut = 1 - (1-t)^3
  const easedProgress = 1 - (1 - clampedProgress) ** 3;

  // Linear interpolation from MIN to MAX using eased progress
  const interval = MIN_INTERVAL + (MAX_INTERVAL - MIN_INTERVAL) * easedProgress;

  return interval;
};

export default calculateClickInterval;
