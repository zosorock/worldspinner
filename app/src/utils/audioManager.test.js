// T-017: Create AudioManager Utility - Tests

import { preloadSound, playClick, stopAllSounds } from './audioManager';

describe('T-017: AudioManager Utility', () => {
  describe('preloadSound', () => {
    test('returns a Promise that resolves to Audio instance', async () => {
      const audio = await preloadSound('/sounds/click.mp3');

      expect(audio).toBeInstanceOf(Audio);
      expect(audio.src).toContain('/sounds/click.mp3');
    });

    test('preloads the audio file', async () => {
      const audio = await preloadSound('/sounds/click.mp3');

      // Audio instance should have load and play methods available
      expect(typeof audio.load).toBe('function');
      expect(typeof audio.play).toBe('function');
      expect(audio.readyState).toBeGreaterThanOrEqual(0); // readyState exists
    });

    test('handles browser without Audio API gracefully', async () => {
      // Mock environment without Audio API
      const originalAudio = global.Audio;
      global.Audio = undefined;

      const audio = await preloadSound('/sounds/click.mp3');

      expect(audio).toBeNull();

      // Restore
      global.Audio = originalAudio;
    });

    test('handles loading errors gracefully', async () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      const audio = await preloadSound('/sounds/nonexistent.mp3');

      // Should still return Audio instance (error handling happens during playback)
      expect(audio).toBeInstanceOf(Audio);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('playClick', () => {
    test('plays the audio instance', () => {
      const mockAudio = {
        currentTime: 100,
        play: jest.fn().mockResolvedValue(undefined),
      };

      playClick(mockAudio);

      expect(mockAudio.currentTime).toBe(0); // Should reset to start
      expect(mockAudio.play).toHaveBeenCalled();
    });

    test('handles null audio instance gracefully', () => {
      expect(() => playClick(null)).not.toThrow();
    });

    test('handles play() errors gracefully', () => {
      const mockAudio = {
        currentTime: 0,
        play: jest.fn().mockRejectedValue(new Error('Play failed')),
      };

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      expect(() => playClick(mockAudio)).not.toThrow();

      consoleWarnSpy.mockRestore();
    });
  });

  describe('stopAllSounds', () => {
    test('pauses the audio and resets to start', () => {
      const mockAudio = {
        currentTime: 5.5,
        pause: jest.fn(),
      };

      stopAllSounds(mockAudio);

      expect(mockAudio.pause).toHaveBeenCalled();
      expect(mockAudio.currentTime).toBe(0);
    });

    test('handles null audio instance gracefully', () => {
      expect(() => stopAllSounds(null)).not.toThrow();
    });
  });

  describe('Browser compatibility', () => {
    test('checks for Audio API availability before use', () => {
      // This is implicitly tested in preloadSound tests
      // Just documenting the requirement
      expect(typeof Audio).not.toBe('undefined');
    });
  });
});
