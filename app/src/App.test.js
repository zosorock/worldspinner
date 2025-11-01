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
