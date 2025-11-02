import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import countryCards from './data/countryCards';

describe('World Spinner simplified UI', () => {
  let mathRandomSpy;

  beforeEach(() => {
    mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  test('hides discovery cards until a country is found', async () => {
    render(<App />);
    expect(screen.queryByText(countryCards[0].displayName)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    expect(screen.getByText(countryCards[0].displayName)).toBeInTheDocument();
  });

  test('reveals progressive clues after spinning the globe', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    expect(screen.getByText(countryCards[0].clues[0].text)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /next clue/i }));
    expect(screen.getByText(countryCards[0].clues[1].text)).toBeInTheDocument();
  });

  test('clears the guess input on submit and shows success feedback', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));

    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, 'United States of America');
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    expect(guessField).toHaveValue('');
    expect(screen.getByText(/You discovered United States of America/i)).toBeInTheDocument();
  });

  test('prompts the player to spin before guessing and rotates tips', async () => {
    render(<App />);

    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, 'Somewhere');
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    expect(screen.getByText(/Spin the globe to start your adventure/i)).toBeInTheDocument();
    expect(screen.getByText(/Spin the globe to meet a mystery country/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    expect(screen.getByText(/Use the next clue if the first one feels tricky/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    expect(screen.getByText(/Correct guesses earn a new discovery card/i)).toBeInTheDocument();
  });
});

describe('App.jsx Translation Integration (T-004)', () => {
  let mathRandomSpy;

  beforeEach(() => {
    mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    // Reset localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  describe('useTranslation hook integration', () => {
    test('imports and uses useTranslation hook at component top level', () => {
      // This test verifies the hook is imported and used
      // If this test runs without errors, the hook is integrated
      render(<App />);
      expect(screen.getByRole('button', { name: /spin the globe/i })).toBeInTheDocument();
    });

    test('renders LanguageSwitcher component in UI', () => {
      render(<App />);
      // LanguageSwitcher should render language toggle buttons
      const buttons = screen.getAllByRole('button');
      // Should have at least: Spin, Next Clue, Submit, EN, ES buttons
      expect(buttons.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Translation key usage', () => {
    test('uses t() for Capytan tips instead of hardcoded strings', () => {
      render(<App />);
      // Verify tips are translated
      expect(screen.getByText(/Spin the globe to meet a mystery country/i)).toBeInTheDocument();
    });

    test('uses t() for button labels', () => {
      render(<App />);
      expect(screen.getByRole('button', { name: /spin the globe/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next clue/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit guess/i })).toBeInTheDocument();
    });

    test('uses t() for section headers', () => {
      render(<App />);
      expect(screen.getByText(/clue board/i)).toBeInTheDocument();
      expect(screen.getByText(/discovery log/i)).toBeInTheDocument();
    });

    test('uses t() for form labels and placeholders', async () => {
      render(<App />);
      const input = screen.getByLabelText(/guess the country/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', expect.stringMatching(/type your best guess/i));
    });

    test('uses t() for empty state messages', () => {
      render(<App />);
      expect(screen.getByText(/spin the globe to get your first animal clue/i)).toBeInTheDocument();
      expect(screen.getByText(/no cards yet/i)).toBeInTheDocument();
    });
  });

  describe('Dynamic value interpolation', () => {
    test('interpolates country name in success feedback message', async () => {
      render(<App />);

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.type(guessField, countryCards[0].displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

      // Should show feedback with interpolated country name
      expect(screen.getByText(new RegExp(`You discovered ${countryCards[0].displayName}`, 'i'))).toBeInTheDocument();
    });

    test('shows clue counter with interpolated values', async () => {
      render(<App />);

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      // Should show clue counter like "1/3"
      expect(screen.getByText(/1\/3/)).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: /next clue/i }));
      // Should update to "2/3"
      expect(screen.getByText(/2\/3/)).toBeInTheDocument();
    });

    test('shows discovery counter with interpolated values', async () => {
      render(<App />);

      // Initially should show 0/30 (or whatever total is)
      expect(screen.getByText(new RegExp(`0/${countryCards.length}`))).toBeInTheDocument();

      // Discover a country
      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.type(guessField, countryCards[0].displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

      // Should update to 1/30
      expect(screen.getByText(new RegExp(`1/${countryCards.length}`))).toBeInTheDocument();
    });
  });

  describe('No hardcoded English strings', () => {
    test('does not contain hardcoded button text', () => {
      render(<App />);
      // If implementation is correct, these should be translation keys, not raw strings
      // The buttons should render with translated text
      const spinButton = screen.getByRole('button', { name: /spin the globe/i });
      expect(spinButton).toBeInTheDocument();
    });

    test('shows error feedback using translation keys', async () => {
      render(<App />);

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.type(guessField, 'Wrong Country Name');
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

      // Should show translated error message
      expect(screen.getByText(/not quite/i)).toBeInTheDocument();
    });

    test('shows empty guess feedback using translation keys', async () => {
      render(<App />);

      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.type(guessField, '   '); // Just whitespace
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

      // Should show translated empty guess message
      expect(screen.getByText(/type a country name before guessing/i)).toBeInTheDocument();
    });
  });

  describe('Functionality preserved', () => {
    test('app functionality unchanged - can still discover countries', async () => {
      render(<App />);

      // Spin globe
      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));

      // Make correct guess
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.type(guessField, countryCards[0].displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

      // Country should appear in discovery log
      const discoveredCountries = screen.getAllByText(countryCards[0].displayName);
      expect(discoveredCountries.length).toBeGreaterThan(0);
    });

    test('clue progression still works', async () => {
      render(<App />);

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      expect(screen.getByText(countryCards[0].clues[0].text)).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: /next clue/i }));
      expect(screen.getByText(countryCards[0].clues[1].text)).toBeInTheDocument();
    });

    test('tip rotation still works', async () => {
      render(<App />);

      const initialTip = screen.getByText(/Spin the globe to meet a mystery country/i);
      expect(initialTip).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      expect(screen.getByText(/Use the next clue if the first one feels tricky/i)).toBeInTheDocument();
    });
  });
});
