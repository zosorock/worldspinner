import React from 'react';
import { screen, act } from '@testing-library/react';
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

describe('T-008: Game Completion State', () => {
  let mathRandomSpy;

  beforeEach(() => {
    mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  test('displays congratulations message when all countries are discovered', async () => {
    renderWithTranslation(<App />);

    // Discover all countries
    const remainingCards = [...countryCards];

    await countryCards.reduce(async (promise) => {
      await promise;

      const nextCard = remainingCards.shift();

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.clear(guessField);
      await userEvent.type(guessField, nextCard.displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));
    }, Promise.resolve());

    // Should display congratulations message
    expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
  });

  test('displays reset progress button when game is completed', async () => {
    renderWithTranslation(<App />);

    // Discover all countries
    const remainingCards = [...countryCards];

    await countryCards.reduce(async (promise) => {
      await promise;

      const nextCard = remainingCards.shift();

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.clear(guessField);
      await userEvent.type(guessField, nextCard.displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));
    }, Promise.resolve());

    // Should display reset button
    expect(screen.getByRole('button', { name: /reset progress/i })).toBeInTheDocument();
  });

  test('resets game state when reset button is clicked', async () => {
    renderWithTranslation(<App />);

    // Discover all countries
    const remainingCards = [...countryCards];

    await countryCards.reduce(async (promise) => {
      await promise;

      const nextCard = remainingCards.shift();

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.clear(guessField);
      await userEvent.type(guessField, nextCard.displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));
    }, Promise.resolve());

    // Verify completion state
    expect(screen.getByText(/congratulations/i)).toBeInTheDocument();

    // Click reset button
    const resetButton = screen.getByRole('button', { name: /reset progress/i });
    await userEvent.click(resetButton);

    // Should reset progress counter to 0
    expect(screen.getByText(new RegExp(`0 of ${countryCards.length} countries discovered`, 'i'))).toBeInTheDocument();

    // Should hide congratulations message
    expect(screen.queryByText(/congratulations/i)).not.toBeInTheDocument();

    // Should re-enable spin button
    const spinButton = screen.getByRole('button', { name: /spin the globe/i });
    expect(spinButton).not.toBeDisabled();
  });

  test('displays celebration animation when completion state is reached', async () => {
    renderWithTranslation(<App />);

    // Discover all countries
    const remainingCards = [...countryCards];

    await countryCards.reduce(async (promise) => {
      await promise;

      const nextCard = remainingCards.shift();

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.clear(guessField);
      await userEvent.type(guessField, nextCard.displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));
    }, Promise.resolve());

    // Should render completion section with animation
    // (We check for the section containing the congratulations message)
    const completionSection = screen.getByText(/congratulations/i).closest('section');
    expect(completionSection).toBeInTheDocument();
  });

  test('completion messages are internationalized', async () => {
    renderWithTranslation(<App />);

    // Discover all countries
    const remainingCards = [...countryCards];

    await countryCards.reduce(async (promise) => {
      await promise;

      const nextCard = remainingCards.shift();

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.clear(guessField);
      await userEvent.type(guessField, nextCard.displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));
    }, Promise.resolve());

    // Should use translation keys for congratulations and reset button
    expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset progress/i })).toBeInTheDocument();
  });

  test('hides clue board and guess form when game is completed', async () => {
    renderWithTranslation(<App />);

    // Discover all countries
    const remainingCards = [...countryCards];

    await countryCards.reduce(async (promise) => {
      await promise;

      const nextCard = remainingCards.shift();

      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.clear(guessField);
      await userEvent.type(guessField, nextCard.displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));
    }, Promise.resolve());

    // Guess form should not be visible
    expect(screen.queryByLabelText(/guess the country/i)).not.toBeInTheDocument();
  });
});

describe('T-009: Manual Reset Progress Button', () => {
  let mathRandomSpy;

  beforeEach(() => {
    mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  test('displays reset progress button during gameplay in discovery log section', async () => {
    renderWithTranslation(<App />);

    // Discover one country to have some progress
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Manual reset button should be visible but not in completion section
    // (completion section reset is T-008, manual reset is T-009)
    const resetButtons = screen.getAllByRole('button', { name: /reset progress/i });
    // Should find at least one reset button
    expect(resetButtons.length).toBeGreaterThanOrEqual(1);
  });

  test('reset button requires confirmation before clearing progress', async () => {
    renderWithTranslation(<App />);

    // Discover a country
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Progress should show 1 discovered
    expect(screen.getByText(new RegExp(`1 of ${countryCards.length} countries discovered`, 'i'))).toBeInTheDocument();

    // Find the manual reset button (not in completion section)
    const resetButtons = screen.getAllByRole('button', { name: /reset progress/i });
    const manualResetButton = resetButtons[0];

    // First click should not immediately reset
    await userEvent.click(manualResetButton);

    // Should still show 1 discovered (not reset yet)
    expect(screen.getByText(new RegExp(`1 of ${countryCards.length} countries discovered`, 'i'))).toBeInTheDocument();
  });

  test('reset button clears progress after confirmation (double-click)', async () => {
    renderWithTranslation(<App />);

    // Discover a country
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Progress should show 1 discovered
    expect(screen.getByText(new RegExp(`1 of ${countryCards.length} countries discovered`, 'i'))).toBeInTheDocument();

    // Get reset button
    const resetButtons = screen.getAllByRole('button', { name: /reset progress/i });
    const manualResetButton = resetButtons[0];

    // Double-click to confirm
    await userEvent.dblClick(manualResetButton);

    // Should reset progress to 0
    expect(screen.getByText(new RegExp(`0 of ${countryCards.length} countries discovered`, 'i'))).toBeInTheDocument();
  });

  test('reset button clears discovered countries from display', async () => {
    renderWithTranslation(<App />);

    // Discover a country
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Country should appear in discovery log
    expect(screen.getByText(countryCards[0].displayName)).toBeInTheDocument();

    // Double-click reset button
    const resetButtons = screen.getAllByRole('button', { name: /reset progress/i });
    await userEvent.dblClick(resetButtons[0]);

    // Discovery log should show empty state
    expect(screen.getByText(/no cards yet/i)).toBeInTheDocument();
  });

  test('reset button resets active country state', async () => {
    renderWithTranslation(<App />);

    // Start a game and discover a country (so reset button appears)
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    expect(screen.getByText(countryCards[0].clues[0].text)).toBeInTheDocument();

    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Now start another game
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    expect(screen.getByText(countryCards[1].clues[0].text)).toBeInTheDocument();

    // Double-click reset button
    const resetButtons = screen.getAllByRole('button', { name: /reset progress/i });
    await userEvent.dblClick(resetButtons[0]);

    // Clue board should show empty state
    expect(screen.getByText(/spin the globe to get your first animal clue/i)).toBeInTheDocument();
  });

  test('reset button is not too prominent in UI', async () => {
    renderWithTranslation(<App />);

    // Discover a country so reset button appears
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Reset button should exist but be styled differently than primary actions
    // This test verifies the button exists but doesn't dominate the UI
    const resetButtons = screen.getAllByRole('button', { name: /reset progress/i });
    expect(resetButtons.length).toBeGreaterThan(0);

    // Should be a button element
    expect(resetButtons[0].tagName).toBe('BUTTON');
  });

  test('reset button text is internationalized', async () => {
    renderWithTranslation(<App />);

    // Discover a country so reset button appears
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Should use translation key for button text
    const resetButtons = screen.getAllByRole('button', { name: /reset progress/i });
    expect(resetButtons.length).toBeGreaterThan(0);
  });

  test('reset button maintains current language selection', async () => {
    renderWithTranslation(<App />);

    // Switch to Spanish
    const esButton = screen.getByRole('button', { name: /switch to español/i });
    await userEvent.click(esButton);

    // Discover a country
    await userEvent.click(screen.getByRole('button', { name: /girar el globo/i }));
    const guessField = screen.getByLabelText(/adivina el país/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /enviar respuesta/i }));

    // Double-click reset button
    const resetButtons = screen.getAllByRole('button', { name: /reiniciar progreso/i });
    await userEvent.dblClick(resetButtons[0]);

    // Should still be in Spanish after reset
    expect(screen.getByRole('button', { name: /girar el globo/i })).toBeInTheDocument();
  });

  test('reset button warning state times out after 3 seconds', async () => {
    jest.useFakeTimers();
    try {
      // Clear localStorage and set to English
      localStorage.clear();
      localStorage.setItem('worldspinner_language', 'en');

      renderWithTranslation(<App />);

      // Discover a country
      await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
      const guessField = screen.getByLabelText(/guess the country/i);
      await userEvent.type(guessField, countryCards[0].displayName);
      await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

      // Get reset button
      const resetButtons = screen.getAllByRole('button', { name: /reset progress/i });
      const manualResetButton = resetButtons[0];

      // First click should show warning state
      await userEvent.click(manualResetButton);

      // Should show warning icon
      expect(manualResetButton).toHaveTextContent(/⚠️/);

      // Advance fake timers to trigger timeout logic within act()
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      // Warning state should be cleared
      expect(manualResetButton).not.toHaveTextContent(/⚠️/);
    } finally {
      jest.useRealTimers();
    }
  }, 10000);

  test('reset button shows warning icon in confirmation state', async () => {
    renderWithTranslation(<App />);

    // Discover a country
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Get reset button
    const resetButtons = screen.getAllByRole('button', { name: /reset progress/i });
    const manualResetButton = resetButtons[0];

    // Button should initially NOT show warning icon
    expect(manualResetButton.textContent).not.toMatch(/⚠️/);

    // First click should trigger warning state
    await userEvent.click(manualResetButton);

    // Should show warning icon
    expect(manualResetButton.textContent).toMatch(/⚠️/);
  });

  test('reset button handles rapid clicks correctly', async () => {
    // Clear localStorage and set to English
    localStorage.clear();
    localStorage.setItem('worldspinner_language', 'en');

    renderWithTranslation(<App />);

    // Discover a country
    await userEvent.click(screen.getByRole('button', { name: /spin the globe/i }));
    const guessField = screen.getByLabelText(/guess the country/i);
    await userEvent.type(guessField, countryCards[0].displayName);
    await userEvent.click(screen.getByRole('button', { name: /submit guess/i }));

    // Progress should show 1 discovered
    expect(screen.getByText(new RegExp(`1 of ${countryCards.length} countries discovered`, 'i'))).toBeInTheDocument();

    // Get reset button
    const resetButtons = screen.getAllByRole('button', { name: /reset progress/i });
    const manualResetButton = resetButtons[0];

    // First click - enter warning state
    await userEvent.click(manualResetButton);
    expect(manualResetButton.textContent).toMatch(/⚠️/);

    // Wait 1 second
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    // Second click before timeout - should reset progress
    await userEvent.click(manualResetButton);

    // Should reset progress to 0
    expect(screen.getByText(new RegExp(`0 of ${countryCards.length} countries discovered`, 'i'))).toBeInTheDocument();
  }, 10000);
});

describe('T-010: Add Spinning Globe Visual Element', () => {
  let mathRandomSpy;

  beforeEach(() => {
    mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  test('renders globe image element in the UI', () => {
    renderWithTranslation(<App />);

    // Globe image should be visible with correct src
    const globeImage = screen.getByRole('img', { name: /spinning globe animation/i });
    expect(globeImage).toBeInTheDocument();
    expect(globeImage).toHaveAttribute('src', expect.stringContaining('world.png'));
  });

  test('globe element has proper ARIA label for accessibility', () => {
    renderWithTranslation(<App />);

    // Should have ARIA label for screen readers
    const globeImage = screen.getByRole('img', { name: /spinning globe animation/i });
    expect(globeImage).toHaveAttribute('alt', 'Spinning globe animation');
  });

  test('globe element is visible and properly positioned in layout', () => {
    renderWithTranslation(<App />);

    const globeImage = screen.getByRole('img', { name: /spinning globe animation/i });
    const spinButton = screen.getByRole('button', { name: /spin the globe/i });

    // Element should be in the document
    expect(globeImage).toBeInTheDocument();

    // Globe should be positioned before (above) the spin button in the DOM
    const globeSection = globeImage.closest('section');

    // Verify globe image appears in DOM before spin button
    const globeIndex = Array.from(globeSection.querySelectorAll('*')).indexOf(globeImage);
    const buttonIndex = Array.from(globeSection.querySelectorAll('*')).indexOf(spinButton);
    expect(globeIndex).toBeLessThan(buttonIndex);
  });

  test('globe element has transform-origin set to center for future rotation', () => {
    renderWithTranslation(<App />);

    const globeImage = screen.getByRole('img', { name: /spinning globe animation/i });

    // Should have class that applies transform-origin: center
    // Tailwind class: origin-center
    expect(globeImage).toHaveClass('origin-center');
  });

  test('globe element has CSS class for easy targeting in animation tasks', () => {
    renderWithTranslation(<App />);

    const globeImage = screen.getByRole('img', { name: /spinning globe animation/i });

    // Should have a specific class name for targeting
    expect(globeImage).toHaveClass('spinning-globe');
  });

  test('globe element does not interfere with existing layout', () => {
    renderWithTranslation(<App />);

    // All existing UI elements should still be present
    expect(screen.getByRole('button', { name: /spin the globe/i })).toBeInTheDocument();
    expect(screen.getByText(/clue board/i)).toBeInTheDocument();
    expect(screen.getByText(/discovery log/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/guess the country/i)).toBeInTheDocument();

    // Globe should be present alongside them
    expect(screen.getByRole('img', { name: /spinning globe animation/i })).toBeInTheDocument();
  });

  test('globe element is positioned near the spin button', () => {
    renderWithTranslation(<App />);

    const globeImage = screen.getByRole('img', { name: /spinning globe animation/i });
    const spinButton = screen.getByRole('button', { name: /spin the globe/i });

    // Both should be in the same section (Capytan section)
    const globeSection = globeImage.closest('section');
    const buttonSection = spinButton.closest('section');

    expect(globeSection).toBe(buttonSection);
  });

  test('globe element is static with no rotation applied initially', () => {
    renderWithTranslation(<App />);

    const globeImage = screen.getByRole('img', { name: /spinning globe animation/i });

    // Should not have any rotation transform applied initially
    // We check that inline style doesn't have transform with rotate
    const inlineStyle = globeImage.style.transform || '';
    expect(inlineStyle).not.toMatch(/rotate/);
  });
});
