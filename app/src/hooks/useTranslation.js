/**
 * T-002: useTranslation Hook
 *
 * Custom React hook for managing internationalization (i18n) in World Spinner.
 * Provides translation lookup, language switching, and localStorage persistence.
 *
 * @returns {Object} Translation utilities
 * @returns {Function} returns.t - Translation function with nested key lookup and variable interpolation
 * @returns {string} returns.language - Current language code ('en' or 'es')
 * @returns {Function} returns.setLanguage - Function to switch language and persist to localStorage
 *
 * @example
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

import { useState, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';

const STORAGE_KEY = 'worldspinner_language';
const VALID_LANGUAGES = ['en', 'es'];
const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: enTranslations,
  es: esTranslations,
};

/**
 * Safely access localStorage, handling environments where it throws on access
 * @returns {Storage|null} localStorage object or null if unavailable
 */
const getSafeLocalStorage = () => {
  try {
    // Guard against SSR where window is undefined
    if (typeof window === 'undefined') {
      return null;
    }
    // Accessing window.localStorage itself can throw in Safari Private Mode
    // eslint-disable-next-line no-unused-vars
    const storage = window.localStorage;
    return storage;
  } catch (e) {
    // Property access threw (Safari Private Mode, etc.)
    return null;
  }
};

/**
 * Validates and normalizes a language code
 * @param {string} code - Language code to validate
 * @returns {string} Valid language code or default
 */
const validateLanguageCode = (code) => {
  if (!code || typeof code !== 'string') {
    return DEFAULT_LANGUAGE;
  }

  const normalized = code.toLowerCase().trim();
  return VALID_LANGUAGES.includes(normalized) ? normalized : DEFAULT_LANGUAGE;
};

/**
 * Performs variable interpolation in a translation string
 * @param {string} text - Translation string with {variable} placeholders
 * @param {Object} variables - Key-value pairs for interpolation
 * @returns {string} Interpolated string
 */
const interpolate = (text, variables) => {
  if (!variables || typeof variables !== 'object') {
    if (variables !== undefined && variables !== null) {
      console.warn(
        `Invalid variables for interpolation. Expected object, got ${typeof variables}. Returning template string as-is.`,
      );
    }
    return text;
  }

  let result = text;
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    result = result.replace(new RegExp(placeholder, 'g'), String(value));
  });

  return result;
};

/**
 * Looks up a translation by nested key path
 * @param {Object} translationData - Translation data object
 * @param {string} key - Dot-notation key path (e.g., 'buttons.spinGlobe')
 * @returns {string|null} Translation string or null if not found
 */
const lookupTranslation = (translationData, key) => {
  if (!key || typeof key !== 'string') {
    return String(key);
  }

  const keys = key.split('.');

  const result = keys.reduce((current, k) => {
    if (current && typeof current === 'object' && k in current) {
      return current[k];
    }
    return null;
  }, translationData);

  return typeof result === 'string' ? result : null;
};

/**
 * Custom hook for translation and language management
 */
const useTranslation = () => {
  // Initialize language from localStorage or default
  const [language, setLanguageState] = useState(() => {
    const storage = getSafeLocalStorage();
    if (storage) {
      try {
        const stored = storage.getItem(STORAGE_KEY);
        return validateLanguageCode(stored);
      } catch (e) {
        // Handle SecurityError or other access errors
        console.warn('Failed to read language preference from localStorage:', e);
      }
    }
    return DEFAULT_LANGUAGE;
  });

  // Sync language to localStorage whenever it changes
  useEffect(() => {
    const storage = getSafeLocalStorage();
    if (storage) {
      try {
        storage.setItem(STORAGE_KEY, language);
      } catch (e) {
        // Handle QuotaExceededError or SecurityError gracefully
        console.warn('Failed to persist language preference:', e);
      }
    }
  }, [language]);

  /**
   * Translation function with nested key lookup and variable interpolation
   * @param {string} key - Dot-notation translation key (e.g., 'buttons.spinGlobe')
   * @param {Object} variables - Optional variables for interpolation
   * @returns {string} Translated and interpolated string, or key if translation missing
   */
  const t = (key, variables) => {
    const translationData = translations[language];
    const translation = lookupTranslation(translationData, key);

    // Return key itself if translation not found (dev-friendly fallback)
    if (translation === null) {
      return String(key);
    }

    // Perform variable interpolation if variables provided
    return interpolate(translation, variables);
  };

  /**
   * Updates the current language and persists to localStorage
   * @param {string} code - Language code to switch to
   */
  const setLanguage = (code) => {
    const validatedCode = validateLanguageCode(code);
    setLanguageState(validatedCode);
  };

  return {
    t,
    language,
    setLanguage,
  };
};

export default useTranslation;
