/**
 * T-004a: TranslationContext and TranslationProvider Tests
 *
 * Tests validate:
 * - TranslationProvider renders children correctly
 * - Context provides t, language, setLanguage
 * - Language state defaults to 'en' when localStorage empty
 * - Language loads from localStorage on mount
 * - setLanguage updates state and persists to localStorage
 * - t() function translates keys correctly
 * - Interpolation works with variables
 * - Invalid language codes fall back to 'en'
 * - localStorage errors handled gracefully
 * - Coverage ≥80%
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { TranslationContext, TranslationProvider } from './TranslationContext';

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

// Helper component to test Context consumption
const TestConsumer = () => {
  const context = React.useContext(TranslationContext);

  if (!context) {
    return <div>No context</div>;
  }

  const { t, language, setLanguage } = context;

  return (
    <div>
      <div data-testid="language">{language}</div>
      <div data-testid="translation">{t('buttons.spinGlobe')}</div>
      <button type="button" onClick={() => setLanguage('es')}>
        Switch
      </button>
    </div>
  );
};

describe('T-004a: TranslationContext and TranslationProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.clear();
    // Clear console warnings
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Provider Rendering', () => {
    test('renders children components', () => {
      render(
        <TranslationProvider>
          <div data-testid="child">Test Child</div>
        </TranslationProvider>,
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    test('renders multiple children', () => {
      render(
        <TranslationProvider>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </TranslationProvider>,
      );

      expect(screen.getByTestId('child1')).toBeInTheDocument();
      expect(screen.getByTestId('child2')).toBeInTheDocument();
    });
  });

  describe('Context Value Shape', () => {
    test('provides t, language, setLanguage in context value', () => {
      render(
        <TranslationProvider>
          <TestConsumer />
        </TranslationProvider>,
      );

      // Verify context is provided (not "No context")
      expect(screen.queryByText('No context')).not.toBeInTheDocument();

      // Verify language is displayed
      expect(screen.getByTestId('language')).toBeInTheDocument();

      // Verify translation function works
      expect(screen.getByTestId('translation')).toBeInTheDocument();
    });

    test('context is null when used outside Provider', () => {
      render(<TestConsumer />);
      expect(screen.getByText('No context')).toBeInTheDocument();
    });
  });

  describe('Language Initialization', () => {
    test('defaults to "en" when localStorage is empty', () => {
      render(
        <TranslationProvider>
          <TestConsumer />
        </TranslationProvider>,
      );

      expect(screen.getByTestId('language')).toHaveTextContent('en');
    });

    test('loads saved language from localStorage', () => {
      localStorageMock.setItem('worldspinner_language', 'es');

      render(
        <TranslationProvider>
          <TestConsumer />
        </TranslationProvider>,
      );

      expect(screen.getByTestId('language')).toHaveTextContent('es');
    });

    test('validates and defaults invalid language codes to "en"', () => {
      localStorageMock.setItem('worldspinner_language', 'invalid');

      render(
        <TranslationProvider>
          <TestConsumer />
        </TranslationProvider>,
      );

      expect(screen.getByTestId('language')).toHaveTextContent('en');
    });

    test('handles empty string language code', () => {
      localStorageMock.setItem('worldspinner_language', '');

      render(
        <TranslationProvider>
          <TestConsumer />
        </TranslationProvider>,
      );

      expect(screen.getByTestId('language')).toHaveTextContent('en');
    });
  });

  describe('Language Persistence', () => {
    test('persists language changes to localStorage', () => {
      render(
        <TranslationProvider>
          <TestConsumer />
        </TranslationProvider>,
      );

      const switchButton = screen.getByRole('button', { name: /switch/i });

      act(() => {
        switchButton.click();
      });

      expect(localStorageMock.getItem('worldspinner_language')).toBe('es');
      expect(screen.getByTestId('language')).toHaveTextContent('es');
    });

    test('handles localStorage write errors gracefully', () => {
      // Mock setItem to throw QuotaExceededError
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = jest.fn(() => {
        const error = new Error('QuotaExceededError');
        error.name = 'QuotaExceededError';
        throw error;
      });

      const consoleWarnSpy = jest.spyOn(console, 'warn');

      render(
        <TranslationProvider>
          <TestConsumer />
        </TranslationProvider>,
      );

      const switchButton = screen.getByRole('button', { name: /switch/i });

      act(() => {
        switchButton.click();
      });

      // Language should still update in state
      expect(screen.getByTestId('language')).toHaveTextContent('es');

      // Should log warning
      expect(consoleWarnSpy).toHaveBeenCalled();

      // Restore
      localStorageMock.setItem = originalSetItem;
    });
  });

  describe('Translation Function', () => {
    test('translates simple keys correctly', () => {
      render(
        <TranslationProvider>
          <TestConsumer />
        </TranslationProvider>,
      );

      const translation = screen.getByTestId('translation');
      expect(translation).toHaveTextContent('🎡 Spin the Globe');
    });

    test('translates nested keys with dot notation', () => {
      const TestComponent = () => {
        const { t } = React.useContext(TranslationContext);
        return <div data-testid="result">{t('feedback.correct')}</div>;
      };

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>,
      );

      const result = screen.getByTestId('result');
      expect(result.textContent).toContain('Yes!');
    });

    test('performs variable interpolation', () => {
      const TestComponent = () => {
        const { t } = React.useContext(TranslationContext);
        return <div data-testid="result">{t('feedback.correct', { country: 'Brazil' })}</div>;
      };

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>,
      );

      const result = screen.getByTestId('result');
      expect(result.textContent).toContain('Brazil');
    });

    test('returns key string when translation missing', () => {
      const TestComponent = () => {
        const { t } = React.useContext(TranslationContext);
        return <div data-testid="result">{t('missing.key.path')}</div>;
      };

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>,
      );

      expect(screen.getByTestId('result')).toHaveTextContent('missing.key.path');
    });

    test('updates translations when language changes', () => {
      const TestComponent = () => {
        const { t, language, setLanguage } = React.useContext(TranslationContext);
        return (
          <div>
            <div data-testid="translation">{t('buttons.spinGlobe')}</div>
            <div data-testid="language">{language}</div>
            <button type="button" onClick={() => setLanguage('es')}>
              Switch to Spanish
            </button>
          </div>
        );
      };

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>,
      );

      // Check English translation
      expect(screen.getByTestId('translation')).toHaveTextContent('🎡 Spin the Globe');

      // Switch to Spanish
      const switchButton = screen.getByRole('button', { name: /switch to spanish/i });
      act(() => {
        switchButton.click();
      });

      // Check Spanish translation
      expect(screen.getByTestId('translation')).toHaveTextContent('🎡 Girar el Globo');
      expect(screen.getByTestId('language')).toHaveTextContent('es');
    });
  });

  describe('Error Handling', () => {
    test('handles localStorage read errors on mount', () => {
      // Mock getItem to throw SecurityError
      const originalGetItem = localStorageMock.getItem;
      localStorageMock.getItem = jest.fn(() => {
        const error = new Error('SecurityError');
        error.name = 'SecurityError';
        throw error;
      });

      const consoleWarnSpy = jest.spyOn(console, 'warn');

      render(
        <TranslationProvider>
          <TestConsumer />
        </TranslationProvider>,
      );

      // Should default to 'en'
      expect(screen.getByTestId('language')).toHaveTextContent('en');

      // Should log warning
      expect(consoleWarnSpy).toHaveBeenCalled();

      // Restore
      localStorageMock.getItem = originalGetItem;
    });

    test('validates language code on setLanguage', () => {
      const TestComponent = () => {
        const { language, setLanguage } = React.useContext(TranslationContext);
        return (
          <div>
            <div data-testid="language">{language}</div>
            <button type="button" onClick={() => setLanguage('fr')}>
              Set Invalid
            </button>
          </div>
        );
      };

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>,
      );

      const button = screen.getByRole('button');
      act(() => {
        button.click();
      });

      // Should fall back to 'en'
      expect(screen.getByTestId('language')).toHaveTextContent('en');
    });
  });

  describe('Performance Optimization', () => {
    test('context value is memoized (does not re-create on every render)', () => {
      let renderCount = 0;
      const contextValues = [];

      const TestComponent = () => {
        const context = React.useContext(TranslationContext);
        contextValues.push(context);
        renderCount += 1;
        return <div>Render {renderCount}</div>;
      };

      const { rerender } = render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>,
      );

      // Force re-render with same language
      rerender(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>,
      );

      // Context values should be referentially equal (memoized)
      expect(contextValues[0]).toBe(contextValues[1]);
    });

    test('context value updates when language changes', () => {
      const contextValues = [];

      const TestComponent = () => {
        const context = React.useContext(TranslationContext);
        contextValues.push(context);

        return (
          <div>
            <div data-testid="language">{context.language}</div>
            <button type="button" onClick={() => context.setLanguage('es')}>
              Switch
            </button>
          </div>
        );
      };

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>,
      );

      const switchButton = screen.getByRole('button');
      act(() => {
        switchButton.click();
      });

      // Context values should be different (new reference due to language change)
      expect(contextValues[0]).not.toBe(contextValues[1]);
      expect(contextValues[0].language).toBe('en');
      expect(contextValues[1].language).toBe('es');
    });
  });
});
