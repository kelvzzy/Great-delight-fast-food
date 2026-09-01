'use client';

import { useState, useEffect, useCallback } from 'react';

export interface NotificationPreferences {
  audioEnabled: boolean;
  visualEnabled: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  audioEnabled: true,
  visualEnabled: true,
};

const STORAGE_KEY = 'admin-notification-preferences';

export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch (err) {
      console.error('Failed to load notification preferences:', err);
    }
  }, []);

  const updatePreferences = useCallback((update: Partial<NotificationPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...update };

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (err) {
          console.error('Failed to save notification preferences:', err);
        }
      }

      return updated;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error('Failed to reset notification preferences:', err);
      }
    }
  }, []);

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    mounted,
  };
}
