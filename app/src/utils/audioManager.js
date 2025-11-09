// T-017: Create AudioManager Utility

/**
 * Preloads an audio file and returns an Audio instance.
 * Provides graceful degradation if Audio API is unavailable.
 *
 * @param {string} src - Path to the audio file (e.g., '/sounds/click.mp3')
 * @returns {Promise<Audio|null>} Audio instance or null if unavailable
 *
 * @example
 * const clickSound = await preloadSound('/sounds/click.mp3');
 * if (clickSound) {
 *   playClick(clickSound);
 * }
 */
const preloadSound = async (src) => {
  // Check browser support for Audio API
  if (typeof Audio === 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('Audio API not available in this browser');
    return null;
  }

  try {
    const audio = new Audio(src);

    // Preload the audio file
    audio.load();

    return audio;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to preload audio from ${src}:`, error);
    return null;
  }
};

/**
 * Plays a click sound from an Audio instance.
 * Resets playback to start before playing for consistent behavior.
 * Handles errors gracefully (e.g., autoplay restrictions).
 *
 * @param {Audio|null} audioInstance - The Audio instance to play
 *
 * @example
 * playClick(clickSound);
 */
const playClick = (audioInstance) => {
  if (!audioInstance) {
    return; // Gracefully handle null (e.g., when audio failed to load)
  }

  try {
    // Reset to start for consistent playback
    // eslint-disable-next-line no-param-reassign
    audioInstance.currentTime = 0;

    // Play the sound (returns a Promise)
    audioInstance.play().catch((error) => {
      // Handle autoplay restrictions or other play failures
      // eslint-disable-next-line no-console
      console.warn('Audio playback failed:', error);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Error playing audio:', error);
  }
};

/**
 * Stops and resets an audio instance.
 * Useful for cleanup when component unmounts or user mutes.
 *
 * @param {Audio|null} audioInstance - The Audio instance to stop
 *
 * @example
 * stopAllSounds(clickSound);
 */
const stopAllSounds = (audioInstance) => {
  if (!audioInstance) {
    return; // Gracefully handle null
  }

  try {
    audioInstance.pause();
    // eslint-disable-next-line no-param-reassign
    audioInstance.currentTime = 0;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Error stopping audio:', error);
  }
};

export { preloadSound, playClick, stopAllSounds };
