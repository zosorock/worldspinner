// T-019: Click Interval Algorithm - Tests
// B-001 retry #2: Updated MIN_INTERVAL=100, MAX_INTERVAL=750

import calculateClickInterval from './clickInterval';

describe('T-019: calculateClickInterval', () => {
  test('returns ~100ms for progress 0.0 (fast clicks at start)', () => {
    const interval = calculateClickInterval(0.0);
    expect(interval).toBe(100);
  });

  test('returns ~750ms for progress 1.0 (slow clicks at end)', () => {
    const interval = calculateClickInterval(1.0);
    expect(interval).toBe(750);
  });

  test('returns value between 100-750ms for mid-range progress', () => {
    const interval = calculateClickInterval(0.5);
    expect(interval).toBeGreaterThan(100);
    expect(interval).toBeLessThan(750);
  });

  test('applies easeOut curve (non-linear interpolation)', () => {
    const interval10 = calculateClickInterval(0.1);
    const interval90 = calculateClickInterval(0.9);

    // With easeOut curve, most change happens early (not linear)
    // At 0.1, should be significantly above 100ms baseline
    // At 0.9, should be close to 750ms max
    expect(interval10).toBeGreaterThan(100);
    expect(interval90).toBeGreaterThan(650);
  });

  test('clamps negative progress values to 0', () => {
    const interval = calculateClickInterval(-0.5);
    expect(interval).toBe(100); // Same as progress 0.0
  });

  test('clamps progress values > 1.0', () => {
    const interval = calculateClickInterval(1.5);
    expect(interval).toBe(750); // Same as progress 1.0
  });

  test('is a pure function (same input = same output)', () => {
    const result1 = calculateClickInterval(0.7);
    const result2 = calculateClickInterval(0.7);
    expect(result1).toBe(result2);
  });
});
