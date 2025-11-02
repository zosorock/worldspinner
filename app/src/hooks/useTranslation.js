/**
 * T-004b: useTranslation Hook (Context Consumer)
 *
 * Custom React hook for accessing translation functionality from TranslationContext.
 * This hook must be used within a TranslationProvider component.
 *
 * State management and localStorage persistence are handled by TranslationContext.
 * This hook simply provides a convenient way to access the Context value.
 *
 * @returns {Object} Translation utilities from Context
 * @returns {Function} returns.t - Translation function with nested key lookup and variable interpolation
 * @returns {string} returns.language - Current language code ('en' or 'es')
 * @returns {Function} returns.setLanguage - Function to switch language and persist to localStorage
 *
 * @throws {Error} Throws error if used outside TranslationProvider
 *
 * @example
 * // Wrap your app with TranslationProvider first
 * <TranslationProvider>
 *   <YourComponent />
 * </TranslationProvider>
 *
 * // Then use the hook in your component
 * const { t, language, setLanguage } = useTranslation();
 *
 * // Simple lookup
 * t('buttons.spinGlobe') // => "🎡 Spin the Globe"
 *
 * // With interpolation
 * t('feedback.correct', { country: 'Brazil' }) // => "Yes! You discovered Brazil..."
 *
 * // Switch language
 * setLanguage('es')
 */

import { useContext } from 'react';
import { TranslationContext } from '../contexts/TranslationContext';

/**
 * Custom hook for accessing translation Context
 * @returns {Object} Translation utilities (t, language, setLanguage)
 * @throws {Error} If used outside TranslationProvider
 */
const useTranslation = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }

  return context;
};

export default useTranslation;
