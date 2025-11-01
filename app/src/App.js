import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import countryCards from './data/countryCards';

const capytanTips = [
  'Spin the globe to meet a mystery country.',
  'Use the next clue if the first one feels tricky.',
  'Correct guesses earn a new discovery card!',
];

const normaliseGuess = (value) => value.trim().toLowerCase();

const FeedbackBanner = ({ type, message }) => {
  const tone = {
    success: 'bg-emerald-100 text-emerald-800',
    error: 'bg-rose-100 text-rose-700',
    info: 'bg-slate-100 text-slate-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm ${tone[type] ?? tone.info}`}
    >
      {message}
    </motion.div>
  );
};

FeedbackBanner.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
  message: PropTypes.string.isRequired,
};

const DiscoveryItem = ({ card }) => (
  <motion.li
    layout
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
  >
    <div className="flex items-center justify-between">
      <span className="text-2xl" role="img" aria-label={card.displayName}>
        {card.emoji}
      </span>
      <span className="text-2xl" role="img" aria-label={`${card.displayName} flag`}>
        {card.flag}
      </span>
    </div>
    <h3 className="mt-2 text-lg font-semibold text-slate-800">{card.displayName}</h3>
    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{card.continent}</p>
    <div className="mt-3 space-y-2 text-sm text-slate-600">
      <p>{card.discovery.animalFact}</p>
      <p>{card.discovery.greeting}</p>
      <p>{card.discovery.history}</p>
    </div>
  </motion.li>
);

DiscoveryItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    continent: PropTypes.string.isRequired,
    discovery: PropTypes.shape({
      animalFact: PropTypes.string.isRequired,
      greeting: PropTypes.string.isRequired,
      history: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const App = () => {
  const [activeCountryId, setActiveCountryId] = useState(null);
  const [clueIndex, setClueIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [tipIndex, setTipIndex] = useState(0);
  const [discoveredIds, setDiscoveredIds] = useState([]);

  const activeCard = useMemo(() => countryCards.find((card) => card.id === activeCountryId) ?? null, [activeCountryId]);

  const currentClue = useMemo(() => (activeCard ? activeCard.clues[clueIndex] : null), [activeCard, clueIndex]);

  const discoveredCards = useMemo(
    () => discoveredIds.map((id) => countryCards.find((card) => card.id === id)).filter(Boolean),
    [discoveredIds],
  );

  const spinGlobe = () => {
    const nextCard = countryCards[Math.floor(Math.random() * countryCards.length)];
    setActiveCountryId(nextCard.id);
    setClueIndex(0);
    setFeedback(null);
    setTipIndex((prev) => (prev + 1) % capytanTips.length);
    setGuess('');
  };

  const revealNextClue = () => {
    if (!activeCard) return;
    setClueIndex((prev) => Math.min(prev + 1, activeCard.clues.length - 1));
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    const trimmedGuess = guess.trim();

    if (!trimmedGuess) {
      setFeedback({
        type: 'info',
        message: 'Type a country name before guessing.',
      });
      setGuess('');
      return;
    }

    if (!activeCard) {
      setFeedback({
        type: 'info',
        message: 'Spin the globe to start your adventure.',
      });
      setGuess('');
      return;
    }

    const acceptedGuesses = new Set([
      normaliseGuess(activeCard.name),
      normaliseGuess(activeCard.displayName),
      ...activeCard.aliases.map((alias) => normaliseGuess(alias)),
    ]);

    if (acceptedGuesses.has(normaliseGuess(trimmedGuess))) {
      setFeedback({
        type: 'success',
        message: `Yes! You discovered ${activeCard.displayName}. Spin again for a new mystery.`,
      });
      setDiscoveredIds((prev) => (prev.includes(activeCard.id) ? prev : [...prev, activeCard.id]));
    } else {
      setFeedback({
        type: 'error',
        message: 'Not quite. Peek at another clue and try again.',
      });
    }

    setGuess('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200 px-4 py-6">
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex w-full max-w-md flex-col gap-6"
      >
        <section className="space-y-4 rounded-3xl bg-white px-5 py-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-4xl" role="img" aria-label="Capytan the explorer">
              🧭
            </span>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Capytan</p>
              <p className="text-lg font-semibold text-slate-800">{capytanTips[tipIndex]}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={spinGlobe}
            className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-base font-semibold text-white shadow-sm transition active:scale-95"
          >
            🎡 Spin the Globe
          </button>
        </section>

        <section className="space-y-4 rounded-3xl bg-white px-5 py-6 shadow-sm">
          <header className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Clue Board</h2>
            <span className="text-xs text-slate-400">
              {activeCard ? `${clueIndex + 1}/${activeCard.clues.length}` : '0/3'}
            </span>
          </header>
          {currentClue ? (
            <p className="text-base leading-relaxed text-slate-700">{currentClue.text}</p>
          ) : (
            <p className="text-base text-slate-600">Spin the globe to get your first animal clue.</p>
          )}
          <button
            type="button"
            onClick={revealNextClue}
            disabled={!activeCard || clueIndex >= (activeCard?.clues.length ?? 0) - 1}
            className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            🔍 Next Clue
          </button>
          <form className="space-y-3" onSubmit={handleGuessSubmit} noValidate>
            <label htmlFor="guess" className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Guess the Country</span>
              <input
                id="guess"
                name="guess"
                type="text"
                value={guess}
                onChange={(event) => setGuess(event.target.value)}
                placeholder="Type your best guess..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-base font-semibold text-white transition active:scale-95"
            >
              ✍️ Submit Guess
            </button>
          </form>
        </section>

        {feedback ? <FeedbackBanner type={feedback.type} message={feedback.message} /> : null}

        <section className="space-y-4 rounded-3xl bg-white px-5 py-6 shadow-sm">
          <header className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Discovery Log</h2>
            <span className="text-xs text-slate-400">
              {discoveredCards.length}/{countryCards.length}
            </span>
          </header>
          {discoveredCards.length === 0 ? (
            <p className="text-sm text-slate-600">
              No cards yet. Spin the globe and follow the clues to unlock your first country.
            </p>
          ) : (
            <ul className="space-y-3">
              {discoveredCards.map((card) => (
                <DiscoveryItem key={card.id} card={card} />
              ))}
            </ul>
          )}
        </section>
      </motion.main>
    </div>
  );
};

export default App;
