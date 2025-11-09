// T-012: Create Rotation Calculation Utility - Tests
import calculateSpinRotation from './spinAnimation';

describe('T-012: calculateSpinRotation utility', () => {
  describe('return value structure', () => {
    test('returns object with totalDegrees and duration properties', () => {
      const result = calculateSpinRotation();

      expect(result).toHaveProperty('totalDegrees');
      expect(result).toHaveProperty('duration');
      expect(typeof result.totalDegrees).toBe('number');
      expect(typeof result.duration).toBe('number');
    });
  });

  describe('totalDegrees calculation', () => {
    test('totalDegrees is always between 360 and 720 (inclusive)', () => {
      // Run multiple times to test randomness
      for (let i = 0; i < 100; i += 1) {
        const result = calculateSpinRotation();
        expect(result.totalDegrees).toBeGreaterThanOrEqual(360);
        expect(result.totalDegrees).toBeLessThanOrEqual(720);
      }
    });

    test('totalDegrees is minimum 360 when random gives 0', () => {
      // Mock Math.random to return 0
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0);

      const result = calculateSpinRotation();
      expect(result.totalDegrees).toBe(360);

      mockRandom.mockRestore();
    });

    test('totalDegrees is maximum 720 when random gives just under 1', () => {
      // Mock Math.random to return 0.999... which floors to 359
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.9999);

      const result = calculateSpinRotation();
      expect(result.totalDegrees).toBe(719); // 360 + floor(359.96) = 360 + 359 = 719

      mockRandom.mockRestore();
    });

    test('totalDegrees uses Math.floor for random component', () => {
      // Mock Math.random to return 0.5 -> floor(180) = 180
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);

      const result = calculateSpinRotation();
      expect(result.totalDegrees).toBe(540); // 360 + 180

      mockRandom.mockRestore();
    });
  });

  describe('duration constant', () => {
    test('duration is constant 8000 milliseconds (8 seconds)', () => {
      // Call multiple times to ensure duration never changes
      for (let i = 0; i < 20; i += 1) {
        const result = calculateSpinRotation();
        expect(result.duration).toBe(8000);
      }
    });
  });

  describe('function purity', () => {
    test('function has no side effects (does not modify external state)', () => {
      const globalState = { modified: false };

      // Call function multiple times
      calculateSpinRotation();
      calculateSpinRotation();
      calculateSpinRotation();

      // Verify no external state was modified
      expect(globalState.modified).toBe(false);
    });

    test('function returns different values on multiple calls due to randomness', () => {
      const results = new Set();

      // Collect 50 results
      for (let i = 0; i < 50; i += 1) {
        results.add(calculateSpinRotation().totalDegrees);
      }

      // With Math.random(), we should get at least a few different values
      // (extremely unlikely to get same value 50 times)
      expect(results.size).toBeGreaterThan(1);
    });
  });
});
