/**
 * T-004f: Translation Test Utilities
 *
 * Provides test helpers to wrap components in TranslationProvider,
 * preventing "useTranslation must be used within TranslationProvider" errors.
 *
 * Usage:
 * ```javascript
 * import { renderWithTranslation } from '../test-utils/translationTestUtils';
 *
 * test('my test', () => {
 *   renderWithTranslation(<MyComponent />);
 *   // ... test assertions
 * });
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { TranslationProvider } from '../contexts/TranslationContext';

/**
 * Renders a component wrapped in TranslationProvider for testing.
 *
 * This is a drop-in replacement for @testing-library/react's `render()`
 * that automatically wraps components in the required TranslationProvider.
 *
 * @param {React.ReactElement} ui - The component to render
 * @param {Object} options - Optional render options (passed to @testing-library/react render)
 * @returns {Object} Render result from @testing-library/react
 *
 * @example
 * renderWithTranslation(<App />);
 * renderWithTranslation(<LanguageSwitcher />, { container: document.body });
 */
export const renderWithTranslation = (ui, options = {}) => {
  const Wrapper = ({ children }) => <TranslationProvider>{children}</TranslationProvider>;
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return render(ui, { ...options, wrapper: Wrapper });
};

/**
 * Creates a wrapper component for use with renderHook from @testing-library/react.
 *
 * Use this when testing hooks that depend on TranslationProvider.
 *
 * @returns {React.FC} Wrapper component that provides TranslationContext
 *
 * @example
 * import { renderHook } from '@testing-library/react';
 * import { createTranslationWrapper } from '../test-utils/translationTestUtils';
 *
 * const { result } = renderHook(() => useTranslation(), {
 *   wrapper: createTranslationWrapper()
 * });
 */
export const createTranslationWrapper = () => {
  const Wrapper = ({ children }) => <TranslationProvider>{children}</TranslationProvider>;
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return Wrapper;
};
