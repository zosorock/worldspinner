/**
 * T-003: LanguageSwitcher Component
 *
 * A simple, accessible UI component that allows users to toggle between
 * English and Spanish languages. Displays flag emojis and language codes
 * with distinct active/inactive styling.
 *
 * @component
 * @example
 * return (
 *   <LanguageSwitcher />
 * )
 */

import React from 'react';
import { motion } from 'framer-motion';
import useTranslation from '../hooks/useTranslation';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  /**
   * Handles language button click
   * Only calls setLanguage if switching to a different language
   * @param {string} langCode - Language code to switch to ('en' or 'es')
   */
  const handleLanguageClick = (langCode) => {
    if (language !== langCode) {
      setLanguage(langCode);
    }
  };

  /**
   * Generates button classes based on active state
   * @param {boolean} isActive - Whether this button represents the current language
   * @returns {string} Tailwind CSS classes
   */
  const getButtonClasses = (isActive) => {
    const baseClasses =
      'rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2';

    if (isActive) {
      return `${baseClasses} bg-teal-600 text-white shadow-sm`;
    }

    return `${baseClasses} border-2 border-teal-600 text-teal-700 hover:bg-teal-50`;
  };

  return (
    <div className="flex gap-2">
      <motion.button
        type="button"
        onClick={() => handleLanguageClick('en')}
        className={getButtonClasses(language === 'en')}
        aria-label="Switch to English"
        aria-pressed={language === 'en'}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        <span className="flex items-center gap-1.5">
          <span role="img" aria-label="US flag">
            🇺🇸
          </span>
          <span>EN</span>
        </span>
      </motion.button>

      <motion.button
        type="button"
        onClick={() => handleLanguageClick('es')}
        className={getButtonClasses(language === 'es')}
        aria-label="Switch to Español"
        aria-pressed={language === 'es'}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        <span className="flex items-center gap-1.5">
          <span role="img" aria-label="Spanish flag">
            🇪🇸
          </span>
          <span>ES</span>
        </span>
      </motion.button>
    </div>
  );
};

export default LanguageSwitcher;
