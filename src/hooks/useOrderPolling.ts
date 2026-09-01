'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customerName: string | null;
  createdAt: string;
  table: {
    id: string;
    name: string;
  };
}

interface UseOrderPollingOptions {
  branchId: string;
  intervalMs?: number;
  enabled?: boolean;
  onNewOrders?: (orders: Order[]) => void;
}

export function useOrderPolling({
  branchId,
  intervalMs = 20000, // 20 seconds
  enabled = true,
  onNewOrders,
}: UseOrderPollingOptions) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastPollTime, setLastPollTime] = useState<Date | null>(null);
  
  const seenOrderIds = useRef<Set<string>>(new Set());
  const isMounted = useRef(true);

  const poll = useCallback(async () => {
    if (!enabled || !isMounted.current) return;

    setIsPolling(true);
    
    try {
      const response = await fetch(`/api/admin/orders?branchId=${branchId}&limit=20`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      const fetchedOrders = data.orders || [];

      // Detect new orders
      const newOrders = fetchedOrders.filter(
        (order: Order) => !seenOrderIds.current.has(order.id)
      );

      // Update seen orders
      newOrders.forEach((order: Order) => {
        seenOrderIds.current.add(order.id);
      });

      // Notify about new orders
      if (newOrders.length > 0 && onNewOrders) {
        onNewOrders(newOrders);
      }

      if (isMounted.current) {
        setOrders(fetchedOrders);
        setLastPollTime(new Date());
        setError(null);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err as Error);
        console.error('Order polling error:', err);
      }
    } finally {
      if (isMounted.current) {
        setIsPolling(false);
      }
    }
  }, [branchId, enabled, onNewOrders]);

  useEffect(() => {
    isMounted.current = true;

    if (!enabled) {
      return;
    }

    // Initial poll
    poll();

    // Set up interval
    const intervalId = setInterval(poll, intervalMs);

    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
    };
  }, [poll, intervalMs, enabled]);

  return {
    orders,
    isPolling,
    error,
    lastPollTime,
  };
}
