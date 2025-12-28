// T-017: Create AudioManager Utility
// B-001 (Retry #1): Audio pooling for sequential playback without dropped clicks

/**
 * Preloads an audio file and returns an Audio instance or pool of instances.
 * Provides graceful degradation if Audio API is unavailable.
 *
 * B-001 Fix: Supports poolSize option to create multiple Audio instances
 * for sequential playback without overlapping or dropping clicks.
 *
 * @param {string} src - Path to the audio file (e.g., '/sounds/click.mp3')
 * @param {Object} options - Optional configuration
 * @param {number} options.poolSize - Number of Audio instances to create (default: 1)
 * @returns {Promise<Audio|Audio[]|null>} Audio instance, array of instances, or null if unavailable
 *
 * @example
 * // Single instance (backward compatible)
 * const clickSound = await preloadSound('/sounds/click.mp3');
 * if (clickSound) {
 *   playClick(clickSound);
 * }
 *
 * @example
 * // Audio pool for rapid sequential playback (B-001 fix)
 * const clickSoundPool = await preloadSound('/sounds/click.mp3', { poolSize: 3 });
 * if (clickSoundPool) {
 *   playClick(clickSoundPool); // Rotates through instances
 * }
 */
const preloadSound = async (src, options = {}) => {
  const { poolSize = 1 } = options;

  // Check browser support for Audio API
  if (typeof Audio === 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('Audio API not available in this browser');
    return null;
  }

  try {
    // B-001: Create pool of Audio instances if poolSize > 1
    if (poolSize > 1) {
      const audioPool = [];
      for (let i = 0; i < poolSize; i += 1) {
        const audio = new Audio(src);
        audio.load();
        audioPool.push(audio);
      }
      return audioPool;
    }

    // Backward compatibility: return single instance when poolSize = 1
    const audio = new Audio(src);
    audio.load();
    return audio;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to preload audio from ${src}:`, error);
    return null;
  }
};

// B-001 (Retry #1): Track current pool index for round-robin rotation
let poolIndex = 0;

/**
 * Plays a click sound from an Audio instance or rotates through an audio pool.
 * B-001 Fix (Retry #1): Supports audio pooling for sequential playback without dropped clicks.
 *
 * When passed an array (audio pool), rotates through instances in round-robin fashion.
 * When passed a single Audio instance, maintains backward compatibility with paused guard.
 *
 * Resets playback to start before playing for consistent behavior.
 * Handles errors gracefully (e.g., autoplay restrictions).
 *
 * @param {Audio|Audio[]|null} audioInstanceOrPool - Single Audio instance or array of instances
 *
 * @example
 * // Single instance (backward compatible)
 * playClick(clickSound);
 *
 * @example
 * // Audio pool (B-001 fix) - rotates through instances
 * playClick(clickSoundPool);
 */
const playClick = (audioInstanceOrPool) => {
  if (!audioInstanceOrPool) {
    return; // Gracefully handle null (e.g., when audio failed to load)
  }

  // B-001 (Retry #1): Audio pooling support
  if (Array.isArray(audioInstanceOrPool)) {
    const audioPool = audioInstanceOrPool;
    if (audioPool.length === 0) return;

    // Round-robin rotation through pool
    const audioInstance = audioPool[poolIndex];
    poolIndex = (poolIndex + 1) % audioPool.length;

    // Only play if this instance is ready (not already playing)
    if (!audioInstance.paused) {
      return; // Instance is busy, skip this click (but rotation continues)
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
    return;
  }

  // Backward compatibility: single Audio instance with paused guard
  const audioInstance = audioInstanceOrPool;

  // B-001 Fix: Guard against overlapping playback
  // If audio is still playing (paused === false), skip this call
  // This prevents the bug where resetting currentTime and calling play()
  // on a busy Audio instance causes audio stacking and chaos
  if (!audioInstance.paused) {
    return; // Audio is busy, don't interrupt it
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
 * Stops and resets an audio instance or all instances in a pool.
 * B-001 Fix (Retry #1): Supports audio pooling.
 * Useful for cleanup when component unmounts or user mutes.
 *
 * @param {Audio|Audio[]|null} audioInstanceOrPool - Single Audio instance or array of instances
 *
 * @example
 * // Single instance (backward compatible)
 * stopAllSounds(clickSound);
 *
 * @example
 * // Audio pool (B-001 fix)
 * stopAllSounds(clickSoundPool);
 */
const stopAllSounds = (audioInstanceOrPool) => {
  if (!audioInstanceOrPool) {
    return; // Gracefully handle null
  }

  // B-001 (Retry #1): Audio pooling support
  if (Array.isArray(audioInstanceOrPool)) {
    const audioPool = audioInstanceOrPool;
    audioPool.forEach((audioInstance) => {
      try {
        audioInstance.pause();
        // eslint-disable-next-line no-param-reassign
        audioInstance.currentTime = 0;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Error stopping audio:', error);
      }
    });
    return;
  }

  // Backward compatibility: single Audio instance
  const audioInstance = audioInstanceOrPool;

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
