/**
 * T-001: Translation JSON Files Structure and Validation Tests
 *
 * Tests validate:
 * - Directory structure exists
 * - JSON files are valid and parse correctly
 * - Keys match between en.json and es.json
 * - Structure is max 2 levels deep
 * - All required UI strings are present
 */

const fs = require('fs');
const path = require('path');

const localesDir = path.resolve(__dirname);
const enPath = path.resolve(localesDir, 'en.json');
const esPath = path.resolve(localesDir, 'es.json');
const readmePath = path.resolve(localesDir, '_README.json');

/**
 * Helper to check if object structure is max 2 levels deep
 */
const isMaxTwoLevelsDeep = (obj, currentLevel = 1) => {
  if (typeof obj !== 'object' || obj === null) {
    return true;
  }

  if (currentLevel >= 2) {
    // At level 2, all values must be primitives (strings, numbers, etc.)
    return Object.values(obj).every(value => typeof value !== 'object' || value === null);
  }

  // Check nested objects
  return Object.values(obj).every(value => isMaxTwoLevelsDeep(value, currentLevel + 1));
};

/**
 * Recursively extract all leaf keys from nested object
 */
const extractLeafKeys = (obj, prefix = '') => {
  const keys = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...extractLeafKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
};

describe('T-001: Translation JSON Files Structure', () => {
  describe('Directory and File Existence', () => {
    test('locales directory exists', () => {
      expect(fs.existsSync(localesDir)).toBe(true);
    });

    test('en.json exists', () => {
      expect(fs.existsSync(enPath)).toBe(true);
    });

    test('es.json exists', () => {
      expect(fs.existsSync(esPath)).toBe(true);
    });

    test('_README.json exists', () => {
      expect(fs.existsSync(readmePath)).toBe(true);
    });
  });

  describe('JSON File Validity', () => {
    let enData;
    let esData;
    let readmeData;

    beforeAll(() => {
      // These should not throw if JSON is valid
      enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
      esData = JSON.parse(fs.readFileSync(esPath, 'utf-8'));
      readmeData = JSON.parse(fs.readFileSync(readmePath, 'utf-8'));
    });

    test('en.json is valid JSON', () => {
      expect(enData).toBeDefined();
      expect(typeof enData).toBe('object');
    });

    test('es.json is valid JSON', () => {
      expect(esData).toBeDefined();
      expect(typeof esData).toBe('object');
    });

    test('_README.json is valid JSON and has description', () => {
      expect(readmeData).toBeDefined();
      expect(readmeData.description).toBeDefined();
      expect(typeof readmeData.description).toBe('string');
    });
  });

  describe('JSON Structure Validation', () => {
    let enData;
    let esData;

    beforeAll(() => {
      enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
      esData = JSON.parse(fs.readFileSync(esPath, 'utf-8'));
    });

    test('en.json structure is max 2 levels deep', () => {
      expect(isMaxTwoLevelsDeep(enData)).toBe(true);
    });

    test('es.json structure is max 2 levels deep', () => {
      expect(isMaxTwoLevelsDeep(esData)).toBe(true);
    });

    test('en.json and es.json have matching keys', () => {
      const enKeys = extractLeafKeys(enData).sort();
      const esKeys = extractLeafKeys(esData).sort();

      expect(enKeys).toEqual(esKeys);
    });
  });

  describe('Required UI Strings Presence', () => {
    let enData;

    beforeAll(() => {
      enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
    });

    test('contains Capytan tips', () => {
      expect(enData.capytan).toBeDefined();
      expect(enData.capytan.tip1).toBeDefined();
      expect(enData.capytan.tip2).toBeDefined();
      expect(enData.capytan.tip3).toBeDefined();
    });

    test('contains button labels', () => {
      expect(enData.buttons).toBeDefined();
      expect(enData.buttons.spinGlobe).toBeDefined();
      expect(enData.buttons.nextClue).toBeDefined();
      expect(enData.buttons.submitGuess).toBeDefined();
    });

    test('contains clue board labels', () => {
      expect(enData.clueBoard).toBeDefined();
      expect(enData.clueBoard.header).toBeDefined();
      expect(enData.clueBoard.emptyState).toBeDefined();
    });

    test('contains feedback messages', () => {
      expect(enData.feedback).toBeDefined();
      expect(enData.feedback.correct).toBeDefined();
      expect(enData.feedback.incorrect).toBeDefined();
      expect(enData.feedback.emptyGuess).toBeDefined();
      expect(enData.feedback.noActiveCountry).toBeDefined();
    });

    test('contains discovery log labels', () => {
      expect(enData.discoveryLog).toBeDefined();
      expect(enData.discoveryLog.header).toBeDefined();
      expect(enData.discoveryLog.emptyState).toBeDefined();
    });

    test('contains form labels', () => {
      expect(enData.form).toBeDefined();
      expect(enData.form.guessLabel).toBeDefined();
      expect(enData.form.guessPlaceholder).toBeDefined();
    });
  });
});
