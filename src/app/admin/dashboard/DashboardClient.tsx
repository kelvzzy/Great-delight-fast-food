'use client';

import { formatNaira } from '@/lib/utils';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Clock,
  CheckCircle,
  ArrowRight,
  Bell,
  BellRing,
  Volume2,
  VolumeX
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { useToast } from '@/components/ToastContainer';

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  averageOrderValue: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customerName: string | null;
  createdAt: string;
  table: {
    name: string;
  };
}

interface DashboardClientProps {
  stats: Stats | null;
  recentOrders: Order[];
  branchId: string;
}

export function DashboardClient({ stats: initialStats, recentOrders: initialOrders, branchId }: DashboardClientProps) {
  const [stats, setStats] = useState(initialStats);
  const [recentOrders, setRecentOrders] = useState(initialOrders);
  const [newOrderCount, setNewOrderCount] = useState(0);
  const previousOrderIdsRef = useRef(new Set(initialOrders.map(o => o.id)));
  
  // Notification system
  const { settings, updateSettings, requestPermission, notify } = useNotifications();
  const { showToast } = useToast();

  // Refresh data every 15 seconds and check for new orders
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          fetch(`/api/admin/stats?branchId=${branchId}`),
          fetch(`/api/admin/orders?branchId=${branchId}&limit=5`),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          const newOrders = ordersData.orders || [];
          
          // Check for new orders
          const currentOrderIds = new Set(newOrders.map((o: Order) => o.id));
          const previousOrderIds = previousOrderIdsRef.current;
          
          // Find truly new orders
          const newOrdersList = newOrders.filter((order: Order) => 
            !previousOrderIds.has(order.id) && order.status === 'NEW'
          );

          if (newOrdersList.length > 0) {
            // Process each new order
            newOrdersList.forEach((order: Order) => {
              // Increment badge count
              setNewOrderCount((prev) => prev + 1);

              // Show notification (sound + browser + toast)
              notify(
                '🔔 New Order!',
                `Order ${order.orderNumber} from ${order.customerName || 'Walk-in'} - ${formatNaira(order.total)}`
              );

              // Show toast notification
              showToast(
                'notification',
                '🎉 New Order Received!',
                `${order.orderNumber} - ${formatNaira(order.total)}`
              );
            });
          }

          // Update refs
          previousOrderIdsRef.current = currentOrderIds;
          setRecentOrders(newOrders);
        }
      } catch (error) {
        console.error('Failed to refresh dashboard data:', error);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [branchId, notify, showToast]);

  // Clear new order badge
  const clearNotificationBadge = () => {
    setNewOrderCount(0);
  };

  const statCards = [
    {
      title: "Today's Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'blue',
      bgColor: 'bg-blue-500',
    },
    {
      title: "Today's Revenue",
      value: formatNaira(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: 'green',
      bgColor: 'bg-green-500',
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'Completed',
      value: stats?.completedOrders || 0,
      icon: CheckCircle,
      color: 'purple',
      bgColor: 'bg-purple-500',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'PREPARING':
        return 'bg-yellow-100 text-yellow-800';
      case 'READY':
        return 'bg-purple-100 text-purple-800';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header with Notification Controls */}
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Overview of today&apos;s performance
          </p>
        </div>
        
        {/* Notification Controls */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`p-3 rounded-xl transition-all ${
              settings.soundEnabled
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
            }`}
            title={settings.soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Browser Notification Toggle */}
          <button
            onClick={requestPermission}
            className={`p-3 rounded-xl transition-all ${
              settings.browserEnabled
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
            }`}
            title={settings.browserEnabled ? 'Notifications Enabled' : 'Enable Notifications'}
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* New Order Badge */}
          {newOrderCount > 0 ? (
            <button
              onClick={clearNotificationBadge}
              className="relative p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-all"
            >
              <BellRing className="w-6 h-6 text-orange-600 dark:text-orange-400 animate-bounce" />
              <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-lg">
                {newOrderCount}
              </span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
              <Bell className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders yet today</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className={`flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-all ${
                  order.status === 'NEW' ? 'bg-blue-50 border-blue-300 animate-pulse-slow' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      {order.orderNumber}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                    {order.status === 'NEW' && (
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{order.customerName || 'Walk-in Customer'}</span>
                    <span>•</span>
                    <span>{order.table.name}</span>
                    <span>•</span>
                    <span>
                      {new Date(order.createdAt).toLocaleTimeString('en-NG', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    {formatNaira(order.total)}
                  </div>
                  <Link
                    href={`/admin/orders`}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Average Order Value */}
      {stats && stats.averageOrderValue > 0 && (
        <div className="mt-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-100">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            <div>
              <p className="text-sm text-gray-600">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNaira(stats.averageOrderValue)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
