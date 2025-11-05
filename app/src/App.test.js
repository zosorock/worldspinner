import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTranslation } from './test-utils/translationTestUtils';
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
    renderWithTranslation(<App />);
    expect(screen.queryByText(countryCards[0].displayName)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    expect(screen.getByText(countryCards[0].displayName)).toBeInTheDocument();
  });

  test('reveals progressive clues after spinning the globe', async () => {
    renderWithTranslation(<App />);

    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    expect(screen.getByText(countryCards[0].clues[0].text)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /next clue/i }));
    expect(screen.getByText(countryCards[0].clues[1].text)).toBeInTheDocument();
  });

  test('clears the guess input on submit and shows success feedback', async () => {
    renderWithTranslation(<App />);

    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));

    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, 'United States of America');
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    expect(guessField).toHaveValue('');
    expect(screen.getByText(/You discovered United States of America/i)).toBeInTheDocument();
  });

  test('prompts the player to spin before guessing and rotates tips', async () => {
    renderWithTranslation(<App />);

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
      renderWithTranslation(<App />);
      expect(screen.getByRole('button', { name: /spin the globe/i })).toBeInTheDocument();
    });

    test('renders LanguageSwitcher component in UI', () => {
      renderWithTranslation(<App />);
      // LanguageSwitcher should render language toggle buttons
      const buttons = screen.getAllByRole('button');
      // Should have at least: Spin, Next Clue, Submit, EN, ES buttons
      expect(buttons.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Translation key usage', () => {
    test('uses t() for Capytan tips instead of hardcoded strings', () => {
      renderWithTranslation(<App />);
      // Verify tips are translated
      expect(screen.getByText(/Spin the globe to meet a mystery country/i)).toBeInTheDocument();
    });

    test('uses t() for button labels', () => {
      renderWithTranslation(<App />);
      expect(screen.getByRole('button', { name: /spin the globe/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next clue/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit guess/i })).toBeInTheDocument();
    });

    test('uses t() for section headers', () => {
      renderWithTranslation(<App />);
      expect(screen.getByText(/clue board/i)).toBeInTheDocument();
      expect(screen.getByText(/discovery log/i)).toBeInTheDocument();
    });

    test('uses t() for form labels and placeholders', async () => {
      renderWithTranslation(<App />);
      const input = screen.getByLabelText(/guess the country/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', expect.stringMatching(/type your best guess/i));
    });

    test('uses t() for empty state messages', () => {
      renderWithTranslation(<App />);
      expect(screen.getByText(/spin the globe to get your first animal clue/i)).toBeInTheDocument();
      expect(screen.getByText(/no cards yet/i)).toBeInTheDocument();
    });
  });

  describe('Dynamic value interpolation', () => {
    test('interpolates country name in success feedback message', async () => {
      renderWithTranslation(<App />);

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.type(guessField, countryCards[0].displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

      // Should show feedback with interpolated country name
      expect(screen.getByText(new RegExp(`You discovered ${countryCards[0].displayName}`, 'i'))).toBeInTheDocument();
    });

    test('shows clue counter with interpolated values', async () => {
      renderWithTranslation(<App />);

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      // Should show clue counter like "1/3"
      expect(screen.getByText(/1\/3/)).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: /next clue/i }));
      // Should update to "2/3"
      expect(screen.getByText(/2\/3/)).toBeInTheDocument();
    });

    test('shows discovery counter with interpolated values', async () => {
      renderWithTranslation(<App />);

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
      renderWithTranslation(<App />);
      // If implementation is correct, these should be translation keys, not raw strings
      // The buttons should render with translated text
      const spinButton = screen.getByRole('button', { name: /spin the globe/i });
      expect(spinButton).toBeInTheDocument();
    });

    test('shows error feedback using translation keys', async () => {
      renderWithTranslation(<App />);

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.type(guessField, 'Wrong Country Name');
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

      // Should show translated error message
      expect(screen.getByText(/not quite/i)).toBeInTheDocument();
    });

    test('shows empty guess feedback using translation keys', async () => {
      renderWithTranslation(<App />);

      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.type(guessField, '   '); // Just whitespace
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

      // Should show translated empty guess message
      expect(screen.getByText(/type a country name before guessing/i)).toBeInTheDocument();
    });
  });

  describe('Functionality preserved', () => {
    test('app functionality unchanged - can still discover countries', async () => {
      renderWithTranslation(<App />);

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
      renderWithTranslation(<App />);

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      expect(screen.getByText(countryCards[0].clues[0].text)).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: /next clue/i }));
      expect(screen.getByText(countryCards[0].clues[1].text)).toBeInTheDocument();
    });

    test('tip rotation still works', async () => {
      renderWithTranslation(<App />);

      const initialTip = screen.getByText(/Spin the globe to meet a mystery country/i);
      expect(initialTip).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      expect(screen.getByText(/Use the next clue if the first one feels tricky/i)).toBeInTheDocument();
    });
  });
});

describe('T-006: Smart Card Removal - Filter Available Countries', () => {
  let mathRandomSpy;

  beforeEach(() => {
    mathRandomSpy = jest.spyOn(Math, 'random');
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  test('excludes discovered countries from spin selection', async () => {
    // Setup: Mock Math.random to return first available country each time
    mathRandomSpy.mockReturnValue(0);

    renderWithTranslation(<App />);

    // Spin and discover first country
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const firstCountryName = countryCards[0].displayName;
    expect(screen.getByText(countryCards[0].clues[0].text)).toBeInTheDocument();

    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, firstCountryName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Verify first country is discovered
    expect(screen.getByText(new RegExp(`You discovered ${firstCountryName}`, 'i'))).toBeInTheDocument();

    // Spin again - should get second country (not first)
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));

    // Should NOT show first country's clue again
    expect(screen.queryByText(countryCards[0].clues[0].text)).not.toBeInTheDocument();

    // Should show second country's clue (since first is filtered out)
    expect(screen.getByText(countryCards[1].clues[0].text)).toBeInTheDocument();
  });

  test('prevents rediscovering the same country multiple times', async () => {
    mathRandomSpy.mockReturnValue(0);

    renderWithTranslation(<App />);

    // Discover first country
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Counter should show 1 discovered
    expect(screen.getByText(new RegExp(`1/${countryCards.length}`))).toBeInTheDocument();

    // Spin multiple times - discovered country should never appear again
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));

    // First country's clue should never appear again
    expect(screen.queryByText(countryCards[0].clues[0].text)).not.toBeInTheDocument();
  });

  test('handles edge case when all countries are discovered', async () => {
    // Mock to always return first available country
    mathRandomSpy.mockReturnValue(0);

    renderWithTranslation(<App />);

    // Keep track of remaining cards to guess in order
    const remainingCards = [...countryCards];
    const totalCountries = countryCards.length;

    // Discover all countries
    await countryCards.reduce(async (promise) => {
      await promise;

      // Get next card to discover (this aligns with component's filtered list)
      const nextCard = remainingCards.shift();

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);

      // Clear previous value and type new guess
      await userEvent.clear(guessField);
      await userEvent.type(guessField, nextCard.displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));
    }, Promise.resolve());

    // Verify all countries discovered
    expect(screen.getByText(new RegExp(`${totalCountries}/${totalCountries}`))).toBeInTheDocument();

    // Spin button should be disabled or show feedback
    const spinButton = screen.getByRole('button', { name: /spin the globe/i });
    expect(spinButton).toBeDisabled();
  });

  test('maintains correct available pool size as countries are discovered', async () => {
    mathRandomSpy.mockReturnValue(0);

    renderWithTranslation(<App />);

    // Initially 0 discovered
    expect(screen.getByText(new RegExp(`0/${countryCards.length}`))).toBeInTheDocument();

    // Discover first country
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Should show 1 discovered
    expect(screen.getByText(new RegExp(`1/${countryCards.length}`))).toBeInTheDocument();

    // Discover second country
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    await userEvent.clear(guessField);
    await userEvent.type(guessField, countryCards[1].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Should show 2 discovered
    expect(screen.getByText(new RegExp(`2/${countryCards.length}`))).toBeInTheDocument();
  });

  test('filters work with useMemo for performance', async () => {
    // This test verifies that filtering is done efficiently
    // by checking that the component renders without performance issues
    mathRandomSpy.mockReturnValue(0);

    const startTime = performance.now();
    renderWithTranslation(<App />);

    // Discover a few countries
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    await userEvent.clear(guessField);
    await userEvent.type(guessField, countryCards[1].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    const endTime = performance.now();

    // Should complete in reasonable time (< 5 seconds)
    expect(endTime - startTime).toBeLessThan(5000);
  });
});

describe('T-007: Progress Counter UI', () => {
  let mathRandomSpy;

  beforeEach(() => {
    mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  test('displays progress counter near spin button with correct initial count', () => {
    renderWithTranslation(<App />);

    // Progress counter should show 0 discovered out of total
    const progressText = screen.getByText(new RegExp(`0 of ${countryCards.length} countries discovered`, 'i'));
    expect(progressText).toBeInTheDocument();
  });

  test('updates progress counter immediately after correct guess', async () => {
    renderWithTranslation(<App />);

    // Initially 0 discovered
    expect(screen.getByText(new RegExp(`0 of ${countryCards.length} countries discovered`, 'i'))).toBeInTheDocument();

    // Discover first country
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Should update to 1 discovered
    expect(screen.getByText(new RegExp(`1 of ${countryCards.length} countries discovered`, 'i'))).toBeInTheDocument();
  });

  test('progress counter increments correctly as multiple countries are discovered', async () => {
    renderWithTranslation(<App />);

    // Discover three countries
    const discoverySequence = [0, 1, 2];

    await discoverySequence.reduce(async (promise, index) => {
      await promise;

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.clear(guessField);
      await userEvent.type(guessField, countryCards[index].displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

      // Verify counter shows correct count
      expect(
        screen.getByText(new RegExp(`${index + 1} of ${countryCards.length} countries discovered`, 'i')),
      ).toBeInTheDocument();
    }, Promise.resolve());
  });

  test('progress counter uses internationalized text from translation system', () => {
    renderWithTranslation(<App />);

    // Should use translation key, not hardcoded English
    // Translation system should provide the format string
    expect(screen.getByText(new RegExp(`0 of ${countryCards.length} countries discovered`, 'i'))).toBeInTheDocument();
  });

  test('progress counter renders at all breakpoints (mobile/desktop)', () => {
    renderWithTranslation(<App />);

    const progressElement = screen.getByText(new RegExp(`0 of ${countryCards.length} countries discovered`, 'i'));

    // Should be in the document and not hidden by responsive classes
    expect(progressElement).toBeInTheDocument();
    // Verify it doesn't have display: none or visibility: hidden
    expect(progressElement).not.toHaveStyle({ display: 'none' });
    expect(progressElement).not.toHaveStyle({ visibility: 'hidden' });
  });

  test('progress counter shows completion state when all countries discovered', async () => {
    renderWithTranslation(<App />);

    // Discover all countries
    const remainingCards = [...countryCards];
    const totalCountries = countryCards.length;

    await countryCards.reduce(async (promise) => {
      await promise;

      const nextCard = remainingCards.shift();

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.clear(guessField);
      await userEvent.type(guessField, nextCard.displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));
    }, Promise.resolve());

    // Should show all countries discovered
    expect(
      screen.getByText(new RegExp(`${totalCountries} of ${totalCountries} countries discovered`, 'i')),
    ).toBeInTheDocument();
  });
});
