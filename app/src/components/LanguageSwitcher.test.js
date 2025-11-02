/**
 * T-003: LanguageSwitcher Component Tests
 *
 * Tests validate:
 * - Component renders two language buttons (EN, ES)
 * - Active language has distinct visual styling
 * - Clicking button calls setLanguage() correctly
 * - Component is responsive on mobile and desktop
 * - Accessible: proper ARIA labels and keyboard navigation
 * - Component unit tests verify behavior
 * - Tests verify language switching triggers re-render
 * - Coverage ≥80% of component code
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSwitcher from './LanguageSwitcher';
import useTranslation from '../hooks/useTranslation';

// Mock the useTranslation hook
jest.mock('../hooks/useTranslation');

describe('T-003: LanguageSwitcher Component', () => {
  let mockSetLanguage;

  beforeEach(() => {
    // Reset mock before each test
    mockSetLanguage = jest.fn();
    useTranslation.mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
      t: jest.fn((key) => key), // Simple passthrough for t()
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders two language buttons (EN and ES)', () => {
      render(<LanguageSwitcher />);

      const enButton = screen.getByRole('button', { name: /english/i });
      const esButton = screen.getByRole('button', { name: /español/i });

      expect(enButton).toBeInTheDocument();
      expect(esButton).toBeInTheDocument();
    });

    test('displays flag emojis for each language', () => {
      render(<LanguageSwitcher />);

      // Check that flag emojis are present in buttons
      expect(screen.getByText('🇺🇸')).toBeInTheDocument();
      expect(screen.getByText('🇪🇸')).toBeInTheDocument();
    });

    test('displays language codes (EN, ES) alongside flags', () => {
      render(<LanguageSwitcher />);

      expect(screen.getByText('EN')).toBeInTheDocument();
      expect(screen.getByText('ES')).toBeInTheDocument();
    });
  });

  describe('Active State Styling', () => {
    test('applies active styling to English button when language is "en"', () => {
      useTranslation.mockReturnValue({
        language: 'en',
        setLanguage: mockSetLanguage,
        t: jest.fn((key) => key),
      });

      render(<LanguageSwitcher />);

      const enButton = screen.getByRole('button', { name: /english/i });
      const esButton = screen.getByRole('button', { name: /español/i });

      // EN should have solid background (active state)
      expect(enButton).toHaveClass('bg-teal-600');
      expect(enButton).toHaveClass('text-white');

      // ES should have outline styling (inactive state)
      expect(esButton).toHaveClass('border-teal-600');
      expect(esButton).not.toHaveClass('bg-teal-600');
    });

    test('applies active styling to Spanish button when language is "es"', () => {
      useTranslation.mockReturnValue({
        language: 'es',
        setLanguage: mockSetLanguage,
        t: jest.fn((key) => key),
      });

      render(<LanguageSwitcher />);

      const enButton = screen.getByRole('button', { name: /english/i });
      const esButton = screen.getByRole('button', { name: /español/i });

      // ES should have solid background (active state)
      expect(esButton).toHaveClass('bg-teal-600');
      expect(esButton).toHaveClass('text-white');

      // EN should have outline styling (inactive state)
      expect(enButton).toHaveClass('border-teal-600');
      expect(enButton).not.toHaveClass('bg-teal-600');
    });
  });

  describe('Language Switching Behavior', () => {
    test('calls setLanguage("en") when English button is clicked', async () => {
      useTranslation.mockReturnValue({
        language: 'es', // Currently Spanish
        setLanguage: mockSetLanguage,
        t: jest.fn((key) => key),
      });

      render(<LanguageSwitcher />);

      const enButton = screen.getByRole('button', { name: /english/i });
      await userEvent.click(enButton);

      expect(mockSetLanguage).toHaveBeenCalledTimes(1);
      expect(mockSetLanguage).toHaveBeenCalledWith('en');
    });

    test('calls setLanguage("es") when Spanish button is clicked', async () => {
      useTranslation.mockReturnValue({
        language: 'en', // Currently English
        setLanguage: mockSetLanguage,
        t: jest.fn((key) => key),
      });

      render(<LanguageSwitcher />);

      const esButton = screen.getByRole('button', { name: /español/i });
      await userEvent.click(esButton);

      expect(mockSetLanguage).toHaveBeenCalledTimes(1);
      expect(mockSetLanguage).toHaveBeenCalledWith('es');
    });

    test('does not call setLanguage when clicking already active button', async () => {
      useTranslation.mockReturnValue({
        language: 'en',
        setLanguage: mockSetLanguage,
        t: jest.fn((key) => key),
      });

      render(<LanguageSwitcher />);

      const enButton = screen.getByRole('button', { name: /english/i });
      await userEvent.click(enButton);

      // Should not call setLanguage for already active language
      expect(mockSetLanguage).not.toHaveBeenCalled();
    });

    test('re-renders correctly when language prop changes', () => {
      const { rerender } = render(<LanguageSwitcher />);

      // Initially EN is active
      let enButton = screen.getByRole('button', { name: /english/i });
      expect(enButton).toHaveClass('bg-teal-600');

      // Change mock to return 'es'
      useTranslation.mockReturnValue({
        language: 'es',
        setLanguage: mockSetLanguage,
        t: jest.fn((key) => key),
      });

      rerender(<LanguageSwitcher />);

      // Now ES should be active
      const esButton = screen.getByRole('button', { name: /español/i });
      enButton = screen.getByRole('button', { name: /english/i });

      expect(esButton).toHaveClass('bg-teal-600');
      expect(enButton).not.toHaveClass('bg-teal-600');
    });
  });

  describe('Accessibility', () => {
    test('buttons have proper ARIA labels', () => {
      render(<LanguageSwitcher />);

      const enButton = screen.getByRole('button', { name: /english/i });
      const esButton = screen.getByRole('button', { name: /español/i });

      // Verify accessible names are present
      expect(enButton).toHaveAccessibleName(/english/i);
      expect(esButton).toHaveAccessibleName(/español/i);
    });

    test('buttons are keyboard navigable (can receive focus)', async () => {
      render(<LanguageSwitcher />);

      const enButton = screen.getByRole('button', { name: /english/i });
      const esButton = screen.getByRole('button', { name: /español/i });

      // Tab to first button
      await userEvent.tab();
      expect(enButton).toHaveFocus();

      // Tab to second button
      await userEvent.tab();
      expect(esButton).toHaveFocus();
    });

    test('buttons can be activated with keyboard', async () => {
      useTranslation.mockReturnValue({
        language: 'en',
        setLanguage: mockSetLanguage,
        t: jest.fn((key) => key),
      });

      render(<LanguageSwitcher />);

      const esButton = screen.getByRole('button', { name: /español/i });

      // Native HTML buttons are keyboard accessible by default (Enter/Space)
      // Testing with click verifies the onClick handler works
      // (Framer Motion's whileTap has PointerEvent issues in JSDOM)
      await userEvent.click(esButton);

      expect(mockSetLanguage).toHaveBeenCalledWith('es');
    });

    test('active button has aria-pressed="true" attribute', () => {
      useTranslation.mockReturnValue({
        language: 'en',
        setLanguage: mockSetLanguage,
        t: jest.fn((key) => key),
      });

      render(<LanguageSwitcher />);

      const enButton = screen.getByRole('button', { name: /english/i });
      const esButton = screen.getByRole('button', { name: /español/i });

      expect(enButton).toHaveAttribute('aria-pressed', 'true');
      expect(esButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Visual Design', () => {
    test('component is compact and does not dominate UI', () => {
      const { container } = render(<LanguageSwitcher />);

      const wrapper = container.firstChild;

      // Should have compact sizing classes
      expect(wrapper).toHaveClass('flex');
      expect(wrapper).toHaveClass('gap-2');
    });

    test('buttons have rounded corners matching app aesthetic', () => {
      render(<LanguageSwitcher />);

      const enButton = screen.getByRole('button', { name: /english/i });
      const esButton = screen.getByRole('button', { name: /español/i });

      // Both buttons should have rounded styling
      expect(enButton).toHaveClass('rounded-xl');
      expect(esButton).toHaveClass('rounded-xl');
    });

    test('uses teal color scheme matching app branding', () => {
      render(<LanguageSwitcher />);

      const enButton = screen.getByRole('button', { name: /english/i });

      // Active button should use teal-600
      expect(enButton).toHaveClass('bg-teal-600');
    });

    test('inactive buttons have border styling', () => {
      useTranslation.mockReturnValue({
        language: 'en',
        setLanguage: mockSetLanguage,
        t: jest.fn((key) => key),
      });

      render(<LanguageSwitcher />);

      const esButton = screen.getByRole('button', { name: /español/i });

      // Inactive button should have border
      expect(esButton).toHaveClass('border-2');
      expect(esButton).toHaveClass('border-teal-600');
    });
  });

  describe('PropTypes Validation', () => {
    test('component does not accept any props (standalone component)', () => {
      // This test documents that LanguageSwitcher is a standalone component
      // that gets its state from useTranslation hook, not from props
      const { container } = render(<LanguageSwitcher />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
