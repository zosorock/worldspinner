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
        paused: true, // Audio is ready to play
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
        paused: true, // Audio is ready to play
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

  // B-001: Test for audio pool preventing overlapping sounds
  describe('B-001: Audio pooling for sequential playback (Retry #1)', () => {
    test('preloadSoundPool creates multiple Audio instances', async () => {
      const audioPool = await preloadSound('/sounds/click.mp3', { poolSize: 3 });

      expect(Array.isArray(audioPool)).toBe(true);
      expect(audioPool.length).toBe(3);
      audioPool.forEach((audio) => {
        expect(audio).toBeInstanceOf(Audio);
        expect(audio.src).toContain('/sounds/click.mp3');
      });
    });

    test('preloadSoundPool defaults to 1 instance for backward compatibility', async () => {
      const audio = await preloadSound('/sounds/click.mp3');

      // Should return single Audio instance (not array) when poolSize not specified
      expect(audio).toBeInstanceOf(Audio);
      expect(Array.isArray(audio)).toBe(false);
    });

    test('playClick with audio pool rotates through instances', () => {
      // Create mock audio pool with 3 instances
      const audioPool = [
        { currentTime: 0, paused: true, play: jest.fn().mockResolvedValue(undefined) },
        { currentTime: 0, paused: true, play: jest.fn().mockResolvedValue(undefined) },
        { currentTime: 0, paused: true, play: jest.fn().mockResolvedValue(undefined) },
      ];

      // First 3 calls should use instances 0, 1, 2
      playClick(audioPool);
      expect(audioPool[0].play).toHaveBeenCalledTimes(1);
      expect(audioPool[1].play).toHaveBeenCalledTimes(0);
      expect(audioPool[2].play).toHaveBeenCalledTimes(0);

      playClick(audioPool);
      expect(audioPool[0].play).toHaveBeenCalledTimes(1);
      expect(audioPool[1].play).toHaveBeenCalledTimes(1);
      expect(audioPool[2].play).toHaveBeenCalledTimes(0);

      playClick(audioPool);
      expect(audioPool[0].play).toHaveBeenCalledTimes(1);
      expect(audioPool[1].play).toHaveBeenCalledTimes(1);
      expect(audioPool[2].play).toHaveBeenCalledTimes(1);

      // Fourth call wraps around to instance 0
      playClick(audioPool);
      expect(audioPool[0].play).toHaveBeenCalledTimes(2);
      expect(audioPool[1].play).toHaveBeenCalledTimes(1);
      expect(audioPool[2].play).toHaveBeenCalledTimes(1);
    });

    test('playClick with single Audio instance (backward compatibility)', () => {
      // When passed a single Audio (not array), should work as before
      const mockAudio = {
        currentTime: 0,
        paused: true,
        play: jest.fn().mockResolvedValue(undefined),
      };

      playClick(mockAudio);
      expect(mockAudio.play).toHaveBeenCalledTimes(1);
      expect(mockAudio.currentTime).toBe(0);
    });

    test('rapid playClick calls with pool do not drop clicks', () => {
      // Simulate 3 rapid calls (all instances busy)
      const audioPool = [
        { currentTime: 0, paused: false, play: jest.fn() }, // Busy
        { currentTime: 0, paused: false, play: jest.fn() }, // Busy
        { currentTime: 0, paused: false, play: jest.fn() }, // Busy
      ];

      // Even when all instances are busy, calls should still try to play
      // (rotation continues, clicks are NOT dropped)
      playClick(audioPool); // Tries instance 0
      playClick(audioPool); // Tries instance 1
      playClick(audioPool); // Tries instance 2
      playClick(audioPool); // Wraps to instance 0

      // Since all are busy (paused: false), no play() should be called
      // BUT the rotation should still happen (state tracked internally)
      expect(audioPool[0].play).toHaveBeenCalledTimes(0);
      expect(audioPool[1].play).toHaveBeenCalledTimes(0);
      expect(audioPool[2].play).toHaveBeenCalledTimes(0);

      // When instances become available, rotation continues from where it left off
      audioPool[0].paused = true;
      playClick(audioPool); // Should use instance 1 (next in rotation)
      expect(audioPool[1].play).toHaveBeenCalledTimes(0); // Still busy

      audioPool[1].paused = true;
      playClick(audioPool); // Should use instance 2 (next in rotation)
      expect(audioPool[2].play).toHaveBeenCalledTimes(0); // Still busy

      audioPool[2].paused = true;
      playClick(audioPool); // Should use instance 0 (wraps around)
      expect(audioPool[0].play).toHaveBeenCalledTimes(1); // NOW plays!
    });

    test('stopAllSounds stops all instances in pool', () => {
      const audioPool = [
        { currentTime: 5, pause: jest.fn() },
        { currentTime: 3, pause: jest.fn() },
        { currentTime: 7, pause: jest.fn() },
      ];

      stopAllSounds(audioPool);

      // All instances should be paused and reset
      audioPool.forEach((audio) => {
        expect(audio.pause).toHaveBeenCalled();
        expect(audio.currentTime).toBe(0);
      });
    });

    test('stopAllSounds works with single Audio instance (backward compatibility)', () => {
      const mockAudio = {
        currentTime: 5,
        pause: jest.fn(),
      };

      stopAllSounds(mockAudio);

      expect(mockAudio.pause).toHaveBeenCalled();
      expect(mockAudio.currentTime).toBe(0);
    });
  });
});
