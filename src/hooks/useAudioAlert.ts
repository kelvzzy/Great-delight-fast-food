'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioAlertOptions {
  enabled: boolean;
  frequency?: number;
  duration?: number;
  volume?: number;
}

export function useAudioAlert({
  enabled,
  frequency = 800,
  duration = 500,
  volume = 0.3,
}: UseAudioAlertOptions) {
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Check browser support (client-side only)
    if (typeof window !== 'undefined') {
      const supported = 'AudioContext' in window || 'webkitAudioContext' in (window as any);
      setIsSupported(supported);
    }

    return () => {
      // Cleanup audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playAlert = useCallback(() => {
    if (!enabled || !isSupported) return;

    try {
      // Create audio context lazily
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }

      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration / 1000);

      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Audio alert error:', err);
    }
  }, [enabled, isSupported, frequency, duration, volume]);

  return {
    playAlert,
    isSupported,
    error,
  };
}
