'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export interface NotificationSettings {
  soundEnabled: boolean;
  browserEnabled: boolean;
  volume: number;
}

export function useNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>({
    soundEnabled: true,
    browserEnabled: false,
    volume: 0.5,
  });
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const audioContextRef = useRef<AudioContext | null>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }

    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Save settings to localStorage
  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('notificationSettings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Request browser notification permission
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('Browser does not support notifications');
      return false;
    }

    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      updateSettings({ browserEnabled: perm === 'granted' });
      return perm === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, [updateSettings]);

  // Play beep sound using Web Audio API
  const playBeep = useCallback(() => {
    if (!settings.soundEnabled) return;

    try {
      // Create or reuse AudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Pleasant notification sound (two-tone beep)
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(settings.volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);

      // Second tone
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();

      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);

      oscillator2.frequency.value = 1000;
      oscillator2.type = 'sine';

      gainNode2.gain.setValueAtTime(settings.volume, audioContext.currentTime + 0.15);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.45);

      oscillator2.start(audioContext.currentTime + 0.15);
      oscillator2.stop(audioContext.currentTime + 0.45);
    } catch (error) {
      console.error('Failed to play beep:', error);
    }
  }, [settings.soundEnabled, settings.volume]);

  // Show browser notification
  const showNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (!settings.browserEnabled || permission !== 'granted') return;

      try {
        const notification = new Notification(title, {
          icon: '/logo.png',
          badge: '/logo.png',
          ...options,
        });

        // Auto-close after 10 seconds
        setTimeout(() => notification.close(), 10000);

        // Handle click
        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        return notification;
      } catch (error) {
        console.error('Failed to show notification:', error);
      }
    },
    [settings.browserEnabled, permission]
  );

  // Combined notification (sound + browser)
  const notify = useCallback(
    (title: string, body: string, options?: NotificationOptions) => {
      playBeep();
      showNotification(title, { body, ...options });
    },
    [playBeep, showNotification]
  );

  return {
    settings,
    permission,
    updateSettings,
    requestPermission,
    playBeep,
    showNotification,
    notify,
  };
}
