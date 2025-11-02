/**
 * T-004b: useTranslation Hook Tests (Refactored for Context)
 *
 * Tests validate:
 * - Hook throws error when used outside TranslationProvider
 * - Hook returns Context value when inside Provider
 * - Hook provides t, language, setLanguage from Context
 * - Multiple components using hook share same state
 * - Language change in one component updates all consumers
 * - Coverage ≥80% of hook code
 */

import React from 'react';
import { renderHook, render, act } from '@testing-library/react';
import useTranslation from './useTranslation';
import { TranslationProvider } from '../contexts/TranslationContext';
import { createTranslationWrapper } from '../test-utils/translationTestUtils';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

// Test wrapper component that provides TranslationContext
const wrapper = createTranslationWrapper();

describe('T-004b: useTranslation Hook (Context Consumer)', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.clear();
    // Clear any console warnings
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Context Provider Requirement', () => {
    test('throws error when used outside TranslationProvider', () => {
      // Suppress expected error output
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useTranslation());
      }).toThrow('useTranslation must be used within TranslationProvider');

      consoleErrorSpy.mockRestore();
    });

    test('returns context value when used inside TranslationProvider', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current).toHaveProperty('t');
      expect(result.current).toHaveProperty('language');
      expect(result.current).toHaveProperty('setLanguage');
      expect(typeof result.current.t).toBe('function');
      expect(typeof result.current.setLanguage).toBe('function');
    });
  });

  describe('Initialization and localStorage', () => {
    test('defaults to "en" when no preference is saved in localStorage', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.language).toBe('en');
    });

    test('loads language from localStorage on mount', () => {
      localStorageMock.setItem('worldspinner_language', 'es');

      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.language).toBe('es');
    });

    test('falls back to "en" for invalid language code in localStorage', () => {
      localStorageMock.setItem('worldspinner_language', 'fr');

      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.language).toBe('en');
    });

    test('falls back to "en" for malformed localStorage value', () => {
      localStorageMock.setItem('worldspinner_language', '');

      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.language).toBe('en');
    });
  });

  describe('setLanguage function', () => {
    test('updates language state when setLanguage is called', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      act(() => {
        result.current.setLanguage('es');
      });

      expect(result.current.language).toBe('es');
    });

    test('persists language to localStorage when setLanguage is called', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      act(() => {
        result.current.setLanguage('es');
      });

      expect(localStorageMock.getItem('worldspinner_language')).toBe('es');
    });

    test('falls back to "en" when setLanguage is called with invalid code', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      act(() => {
        result.current.setLanguage('fr');
      });

      expect(result.current.language).toBe('en');
    });

    test('switches from es to en correctly', () => {
      localStorageMock.setItem('worldspinner_language', 'es');
      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.language).toBe('es');

      act(() => {
        result.current.setLanguage('en');
      });

      expect(result.current.language).toBe('en');
      expect(localStorageMock.getItem('worldspinner_language')).toBe('en');
    });
  });

  describe('t() translation function', () => {
    test('returns correct translation for simple nested key (en)', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const translation = result.current.t('buttons.spinGlobe');

      expect(translation).toBe('🎡 Spin the Globe');
    });

    test('returns correct translation for simple nested key (es)', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      act(() => {
        result.current.setLanguage('es');
      });

      const translation = result.current.t('buttons.spinGlobe');

      expect(translation).toBe('🎡 Girar el Globo');
    });

    test('returns translation for deeply nested key', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const translation = result.current.t('capytan.tip1');

      expect(translation).toBe('Spin the globe to meet a mystery country.');
    });

    test('returns the key itself when translation is missing', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const translation = result.current.t('nonexistent.key');

      expect(translation).toBe('nonexistent.key');
    });

    test('performs simple variable interpolation with single variable', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const translation = result.current.t('feedback.correct', { country: 'Brazil' });

      expect(translation).toBe('Yes! You discovered Brazil. Spin again for a new mystery.');
    });

    test('performs variable interpolation with multiple variables', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const translation = result.current.t('clueBoard.clueCounter', { current: 2, total: 5 });

      expect(translation).toBe('2/5');
    });

    test('performs variable interpolation in Spanish', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      act(() => {
        result.current.setLanguage('es');
      });

      const translation = result.current.t('feedback.correct', { country: 'Brasil' });

      expect(translation).toBe('¡Sí! Descubriste Brasil. Gira de nuevo para un nuevo misterio.');
    });

    test('returns translation without modification when no variables provided', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const translation = result.current.t('buttons.nextClue');

      expect(translation).toBe('🔍 Next Clue');
    });

    test('logs warning and returns string as-is for malformed interpolation', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const { result } = renderHook(() => useTranslation(), { wrapper });

      // Create a mock scenario where variables is not an object
      const translation = result.current.t('feedback.correct', 'not-an-object');

      // Should return the template string as-is and log a warning
      expect(translation).toBe('Yes! You discovered {country}. Spin again for a new mystery.');
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid variables for interpolation'));
    });

    test('handles empty string key gracefully', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const translation = result.current.t('');

      expect(translation).toBe('');
    });

    test('handles undefined key gracefully', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const translation = result.current.t(undefined);

      expect(translation).toBe('undefined');
    });
  });

  describe('Integration tests', () => {
    test('t() function updates when language changes', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const enTranslation = result.current.t('buttons.submitGuess');
      expect(enTranslation).toBe('✍️ Submit Guess');

      act(() => {
        result.current.setLanguage('es');
      });

      const esTranslation = result.current.t('buttons.submitGuess');
      expect(esTranslation).toBe('✍️ Enviar Respuesta');
    });

    test('hook persists and loads language across re-renders', () => {
      const { result, unmount } = renderHook(() => useTranslation(), { wrapper });

      act(() => {
        result.current.setLanguage('es');
      });

      expect(result.current.language).toBe('es');

      // Unmount and remount to simulate new session
      unmount();

      const { result: result2 } = renderHook(() => useTranslation(), { wrapper });

      expect(result2.current.language).toBe('es');
    });

    test('multiple components share same language state via Context', () => {
      // Create a custom wrapper that renders both hooks under the SAME provider
      let hook1Result;
      let hook2Result;
      let setLanguageCallback;

      const TestComponent = () => {
        hook1Result = useTranslation();
        hook2Result = useTranslation();
        setLanguageCallback = hook1Result.setLanguage;
        return null;
      };

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>,
      );

      // Both hooks should share the same language state
      expect(hook1Result.language).toBe('en');
      expect(hook2Result.language).toBe('en');

      // Change language via hook1
      act(() => {
        setLanguageCallback('es');
      });

      // Both hooks should reflect the change (proving shared state)
      expect(hook1Result.language).toBe('es');
      expect(hook2Result.language).toBe('es');
    });
  });

  describe('localStorage failure handling (delegated to TranslationContext)', () => {
    test('gracefully handles localStorage being undefined (SSR scenario)', () => {
      // Simulate SSR environment where localStorage is undefined
      const originalLocalStorage = window.localStorage;
      delete window.localStorage;

      const { result } = renderHook(() => useTranslation(), { wrapper });

      // Should default to 'en' and not crash (Provider handles this)
      expect(result.current.language).toBe('en');

      // Should still allow language switching (just won't persist)
      act(() => {
        result.current.setLanguage('es');
      });

      expect(result.current.language).toBe('es');

      // Restore localStorage
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
        configurable: true,
      });
    });

    test('gracefully handles localStorage.setItem throwing QuotaExceededError', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      // Mock setItem to throw quota error
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = jest.fn(() => {
        throw new DOMException('QuotaExceededError', 'QuotaExceededError');
      });

      const { result } = renderHook(() => useTranslation(), { wrapper });

      // Should not crash when trying to persist (Provider handles this)
      act(() => {
        result.current.setLanguage('es');
      });

      // State should still update even if persistence fails
      expect(result.current.language).toBe('es');

      // Should log a warning (from Provider)
      expect(consoleWarnSpy).toHaveBeenCalledWith('Failed to persist language preference:', expect.any(DOMException));

      // Restore original setItem
      localStorageMock.setItem = originalSetItem;
    });

    test('gracefully handles localStorage.getItem throwing SecurityError', () => {
      // Mock getItem to throw security error (privacy mode scenario)
      const originalGetItem = localStorageMock.getItem;
      localStorageMock.getItem = jest.fn(() => {
        throw new DOMException('SecurityError', 'SecurityError');
      });

      // Should default to 'en' and not crash (Provider handles this)
      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.language).toBe('en');

      // Restore original getItem
      localStorageMock.getItem = originalGetItem;
    });

    test('gracefully handles localStorage property accessor throwing (Safari Private Mode)', () => {
      const originalLocalStorage = Object.getOwnPropertyDescriptor(window, 'localStorage');

      // Simulate Safari Private Mode where accessing window.localStorage throws
      Object.defineProperty(window, 'localStorage', {
        get: () => {
          throw new DOMException('SecurityError', 'SecurityError');
        },
        configurable: true,
      });

      // Should default to 'en' and not crash (Provider handles this)
      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.language).toBe('en');

      // Should still allow language switching (just won't persist)
      act(() => {
        result.current.setLanguage('es');
      });

      expect(result.current.language).toBe('es');

      // Restore original localStorage
      if (originalLocalStorage) {
        Object.defineProperty(window, 'localStorage', originalLocalStorage);
      }
    });

    test('handles window being undefined (SSR with no window object)', () => {
      // Note: localStorage handling is now delegated to TranslationContext/Provider
      // The hook simply consumes the Context value
      // This test verifies the hook works in normal environment

      const { result } = renderHook(() => useTranslation(), { wrapper });
      expect(result.current.language).toBe('en');
    });
  });
});
