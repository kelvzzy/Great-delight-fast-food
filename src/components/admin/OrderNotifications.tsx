'use client';

import { useEffect, useState } from 'react';
import { useOrderPolling } from '@/hooks/useOrderPolling';
import { useAudioAlert } from '@/hooks/useAudioAlert';
import { useNotificationPreferences } from '@/hooks/useNotificationPreferences';
import { Bell, BellOff, Volume2, VolumeX } from 'lucide-react';
import { formatNaira } from '@/lib/utils';

interface OrderNotificationsProps {
  branchId: string;
}

interface Toast {
  id: string;
  orderNumber: string;
  tableName: string;
  total: number;
  timestamp: Date;
}

export function OrderNotifications({ branchId }: OrderNotificationsProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { preferences, updatePreferences, mounted } = useNotificationPreferences();
  const { playAlert, isSupported: audioSupported } = useAudioAlert({
    enabled: preferences.audioEnabled,
  });

  const handleNewOrders = (newOrders: any[]) => {
    // Create toast for each new order
    const newToasts = newOrders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      tableName: order.table.name,
      total: order.total,
      timestamp: new Date(),
    }));

    // Show visual notifications
    if (preferences.visualEnabled) {
      setToasts(prev => [...newToasts, ...prev].slice(0, 5));
    }

    // Play audio alert
    if (preferences.audioEnabled && audioSupported) {
      playAlert();
    }

    // Browser notification
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      newOrders.forEach(order => {
        new Notification('New Order! 🎉', {
          body: `Order ${order.orderNumber} from ${order.table.name}`,
          icon: '/icon.png',
          tag: order.id,
        });
      });
    }
  };

  useOrderPolling({
    branchId,
    enabled: mounted,
    onNewOrders: handleNewOrders,
  });

  // Auto-dismiss toasts after 5 seconds
  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map((toast) =>
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 5000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts]);

  // Request notification permission
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updatePreferences({ audioEnabled: !preferences.audioEnabled })}
          className={`p-2 rounded-lg transition-colors ${
            preferences.audioEnabled
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
          title={preferences.audioEnabled ? 'Sound enabled' : 'Sound disabled'}
        >
          {preferences.audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        <button
          onClick={() => updatePreferences({ visualEnabled: !preferences.visualEnabled })}
          className={`p-2 rounded-lg transition-colors ${
            preferences.visualEnabled
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
          title={preferences.visualEnabled ? 'Notifications enabled' : 'Notifications disabled'}
        >
          {preferences.visualEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
        </button>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 border-l-4 border-green-500 animate-slide-in-right pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 dark:text-gray-100">
                  New Order! 🎉
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <div>Order: <strong>{toast.orderNumber}</strong></div>
                  <div>Table: <strong>{toast.tableName}</strong></div>
                  <div>Total: <strong>{formatNaira(toast.total)}</strong></div>
                </div>
              </div>
              <button
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
