import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import PropTypes from 'prop-types';
import countryCards from './data/countryCards';
import useTranslation from './hooks/useTranslation';
import LanguageSwitcher from './components/LanguageSwitcher';
import calculateSpinRotation from './utils/spinAnimation';
import { preloadSound, playClick, stopAllSounds } from './utils/audioManager';
import calculateClickInterval from './utils/clickInterval';

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

const DiscoveryItem = ({ card, t }) => (
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
      <span className="text-2xl" role="img" aria-label={t('ariaLabels.countryFlag', { country: card.displayName })}>
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
  t: PropTypes.func.isRequired,
};

const App = () => {
  const { t } = useTranslation();
  const [activeCountryId, setActiveCountryId] = useState(null);
  const [clueIndex, setClueIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [tipIndex, setTipIndex] = useState(0);
  const [discoveredIds, setDiscoveredIds] = useState([]);
  const [resetConfirmPending, setResetConfirmPending] = useState(false);
  // T-011: Track spinning animation state to prevent overlapping spins
  const [isSpinning, setIsSpinning] = useState(false);
  // T-018: Sound mute state with localStorage persistence
  const [isSoundMuted, setIsSoundMuted] = useState(() => {
    try {
      const saved = localStorage.getItem('worldspinner_soundMuted');
      return saved === 'true';
    } catch {
      return false;
    }
  });
  const resetTimeoutRef = useRef(null);
  const clickSoundRef = useRef(null);
  const clickTimeoutsRef = useRef([]);
  // B-003: Track cumulative rotation for forward-only spinning
  const cumulativeRotationRef = useRef(0);
  // B-004: Token to detect reset during an active spin
  const spinTokenRef = useRef(0);
  // T-013: Framer Motion animation scope for globe rotation
  const [scope, animate] = useAnimate();

  // T-020: Preload click sound on mount
  // B-001 (Retry #1): Use audio pool with 3 instances for sequential playback
  useEffect(() => {
    preloadSound('/sounds/click.mp3', { poolSize: 3 }).then((audioPool) => {
      clickSoundRef.current = audioPool;
    });
  }, []);

  // Cleanup timer and audio on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      // T-020: Clear all scheduled click timeouts
      clickTimeoutsRef.current.forEach(clearTimeout);
      clickTimeoutsRef.current = [];
      // T-020: Stop any playing audio
      if (clickSoundRef.current) {
        stopAllSounds(clickSoundRef.current);
      }
    };
  }, []);

  const capytanTips = [t('capytan.tip1'), t('capytan.tip2'), t('capytan.tip3')];

  const activeCard = useMemo(() => countryCards.find((card) => card.id === activeCountryId) ?? null, [activeCountryId]);

  const currentClue = useMemo(() => (activeCard ? activeCard.clues[clueIndex] : null), [activeCard, clueIndex]);

  const discoveredCards = useMemo(
    () => discoveredIds.map((id) => countryCards.find((card) => card.id === id)).filter(Boolean),
    [discoveredIds],
  );

  const availableCountries = useMemo(
    () => countryCards.filter((card) => !discoveredIds.includes(card.id)),
    [discoveredIds],
  );

  const isGameComplete = useMemo(() => discoveredIds.length === countryCards.length, [discoveredIds]);

  // T-013: Make spinGlobe async to support animation completion
  const spinGlobe = async () => {
    if (availableCountries.length === 0) {
      return;
    }

    // T-011: Set spinning state to prevent multiple simultaneous spins
    setIsSpinning(true);
    const spinToken = spinTokenRef.current;

    // T-012: Calculate rotation degrees and duration
    const { totalDegrees, duration } = calculateSpinRotation();

    // T-020: Schedule click sounds during animation (unless muted)
    if (!isSoundMuted && clickSoundRef.current) {
      let elapsedTime = 0;
      const scheduleNextClick = () => {
        if (elapsedTime >= duration - 1000) return;

        const progress = elapsedTime / duration;
        const interval = calculateClickInterval(progress);

        const timeoutId = setTimeout(() => {
          playClick(clickSoundRef.current);
          scheduleNextClick();
        }, interval);

        clickTimeoutsRef.current.push(timeoutId);
        elapsedTime += interval;
      };
      scheduleNextClick();
    }

    // T-013: Animate globe rotation using Framer Motion
    // T-014: Using easeOut for natural deceleration (slower toward the end)
    // B-003: Accumulate rotation for forward-only spinning (never backwards)
    cumulativeRotationRef.current += totalDegrees;
    await animate(
      '.spinning-globe',
      { rotate: cumulativeRotationRef.current },
      { duration: duration / 1000, ease: 'easeOut' },
    );

    // T-020: Clear any remaining scheduled clicks after animation completes
    clickTimeoutsRef.current.forEach(clearTimeout);
    clickTimeoutsRef.current = [];

    // B-004: Guard against reset during spin before applying state updates
    if (spinTokenRef.current !== spinToken) {
      setIsSpinning(false);
      return;
    }

    // T-015: After animation completes, reveal the mystery country
    const nextCard = availableCountries[Math.floor(Math.random() * availableCountries.length)];
    setActiveCountryId(nextCard.id);
    setClueIndex(0);
    setFeedback(null);
    setTipIndex((prev) => (prev + 1) % capytanTips.length);
    setGuess('');

    // T-011: Reset spinning state after animation and selection complete
    setIsSpinning(false);
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
        message: t('feedback.emptyGuess'),
      });
      setGuess('');
      return;
    }

    if (!activeCard) {
      setFeedback({
        type: 'info',
        message: t('feedback.noActiveCountry'),
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
        message: t('feedback.correct', { country: activeCard.displayName }),
      });
      setDiscoveredIds((prev) => (prev.includes(activeCard.id) ? prev : [...prev, activeCard.id]));
    } else {
      setFeedback({
        type: 'error',
        message: t('feedback.incorrect'),
      });
    }

    setGuess('');
  };

  const handleResetProgress = async () => {
    // Clear any pending timeout to prevent race conditions
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    spinTokenRef.current += 1;
    setIsSpinning(false);
    // B-004: Clear any scheduled click sounds during reset
    clickTimeoutsRef.current.forEach(clearTimeout);
    clickTimeoutsRef.current = [];
    if (clickSoundRef.current) {
      stopAllSounds(clickSoundRef.current);
    }
    setDiscoveredIds([]);
    setActiveCountryId(null);
    setClueIndex(0);
    setGuess('');
    setFeedback(null);
    setTipIndex(0);
    setResetConfirmPending(false);
    // B-003: Reset cumulative rotation for fresh game start
    cumulativeRotationRef.current = 0;
    // B-004: Sync DOM rotation to avoid backwards spins after reset
    await animate('.spinning-globe', { rotate: 0 }, { duration: 0 });
  };

  const handleManualReset = () => {
    if (resetConfirmPending) {
      handleResetProgress();
    } else {
      // Clear any existing timeout before setting a new one
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      setResetConfirmPending(true);
      resetTimeoutRef.current = setTimeout(() => {
        setResetConfirmPending(false);
        resetTimeoutRef.current = null;
      }, 3000);
    }
  };

  // T-018: Toggle sound mute with localStorage persistence
  const handleToggleMute = () => {
    setIsSoundMuted((prev) => {
      const newValue = !prev;
      try {
        localStorage.setItem('worldspinner_soundMuted', String(newValue));
      } catch {
        // Silently fail if localStorage unavailable
      }
      return newValue;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200 px-4 py-6">
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex w-full max-w-md flex-col gap-6"
      >
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        <section className="space-y-4 rounded-3xl bg-white px-5 py-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-4xl" role="img" aria-label={t('capytan.ariaLabel')}>
              🦫
            </span>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{t('capytan.label')}</p>
              <p className="text-lg font-semibold text-slate-800">{capytanTips[tipIndex]}</p>
            </div>
          </div>
          {/* T-013: Add scope ref for Framer Motion animation targeting */}
          <div ref={scope} className="space-y-2">
            <p className="text-center text-sm font-semibold text-slate-600">
              {t('progress.countriesDiscovered', { discovered: discoveredIds.length, total: countryCards.length })}
            </p>
            {/* T-010: Static globe visual element - foundation for future animation tasks */}
            <div className="flex justify-center py-2">
              <img
                src="/images/world.png"
                alt={t('globe.ariaLabel')}
                width="128"
                height="128"
                className="spinning-globe h-32 w-32 origin-center"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={spinGlobe}
                disabled={availableCountries.length === 0 || isSpinning}
                className="flex-1 rounded-2xl bg-emerald-500 px-4 py-3 text-base font-semibold text-white shadow-sm transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('buttons.spinGlobe')}
              </button>
              {/* T-018: Mute/unmute sound control */}
              <button
                type="button"
                onClick={handleToggleMute}
                aria-label={t('ariaLabels.toggleSound')}
                className="rounded-2xl border border-slate-300 px-4 py-3 text-xl transition hover:bg-slate-50 active:scale-95"
              >
                {isSoundMuted ? '🔇' : '🔊'}
              </button>
            </div>
          </div>
        </section>

        {isGameComplete ? (
          <motion.section
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            className="space-y-4 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 px-5 py-6 shadow-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-emerald-800">
                {t('completion.congratulations', { total: countryCards.length })}
              </h2>
              <p className="mt-3 text-base text-emerald-700">{t('completion.message')}</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="button"
              onClick={handleResetProgress}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition active:scale-95"
            >
              {t('completion.resetButton')}
            </motion.button>
          </motion.section>
        ) : (
          <section className="space-y-4 rounded-3xl bg-white px-5 py-6 shadow-sm">
            <header className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                {t('clueBoard.header')}
              </h2>
              <span className="text-xs text-slate-400">
                {activeCard
                  ? t('clueBoard.clueCounter', { current: clueIndex + 1, total: activeCard.clues.length })
                  : t('clueBoard.clueCounter', { current: 0, total: 3 })}
              </span>
            </header>
            {currentClue ? (
              <p className="text-base leading-relaxed text-slate-700">{currentClue.text}</p>
            ) : (
              <p className="text-base text-slate-600">{t('clueBoard.emptyState')}</p>
            )}
            <button
              type="button"
              onClick={revealNextClue}
              disabled={!activeCard || clueIndex >= (activeCard?.clues.length ?? 0) - 1}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t('buttons.nextClue')}
            </button>
            <form className="space-y-3" onSubmit={handleGuessSubmit} noValidate>
              <label htmlFor="guess" className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">{t('form.guessLabel')}</span>
                <input
                  id="guess"
                  name="guess"
                  type="text"
                  value={guess}
                  onChange={(event) => setGuess(event.target.value)}
                  placeholder={t('form.guessPlaceholder')}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-base font-semibold text-white transition active:scale-95"
              >
                {t('buttons.submitGuess')}
              </button>
            </form>
          </section>
        )}

        {feedback ? <FeedbackBanner type={feedback.type} message={feedback.message} /> : null}

        <section className="space-y-4 rounded-3xl bg-white px-5 py-6 shadow-sm">
          <header className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              {t('discoveryLog.header')}
            </h2>
            <span className="text-xs text-slate-400">
              {t('discoveryLog.counter', { discovered: discoveredCards.length, total: countryCards.length })}
            </span>
          </header>
          {discoveredCards.length === 0 ? (
            <p className="text-sm text-slate-600">{t('discoveryLog.emptyState')}</p>
          ) : (
            <ul className="space-y-3">
              {discoveredCards.map((card) => (
                <DiscoveryItem key={card.id} card={card} t={t} />
              ))}
            </ul>
          )}
          {discoveredCards.length > 0 && !isGameComplete ? (
            <button
              type="button"
              onClick={handleManualReset}
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 active:scale-95"
            >
              {resetConfirmPending ? t('completion.resetButtonConfirm') : t('completion.resetButton')}
            </button>
          ) : null}
        </section>
      </motion.main>
    </div>
  );
};

export default App;
