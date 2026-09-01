'use client';

import { formatNaira } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { RefreshCw, Filter, ChevronRight, Gift } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customerName: string | null;
  createdAt: string;
  itemCount: number;
  isGift: boolean;
  giftSenderName: string | null;
  giftRecipientName: string | null;
  giftClaimed: boolean;
  giftClaimCode: string | null;
  table: {
    name: string;
  };
  items: Array<{
    id: string;
    itemName: string;
    quantity: number;
    variant?: {
      variantName: string;
    } | null;
  }>;
}

interface OrdersClientProps {
  initialOrders: Order[];
  branchId: string;
}

const statusOptions = [
  { value: 'ALL', label: 'All Orders' },
  { value: 'NEW', label: 'New' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'PREPARING', label: 'Preparing' },
  { value: 'READY', label: 'Ready' },
  { value: 'COMPLETED', label: 'Completed' },
];

const nextStatus: Record<string, string> = {
  NEW: 'ACCEPTED',
  ACCEPTED: 'PREPARING',
  PREPARING: 'READY',
  READY: 'COMPLETED',
};

export function OrdersClient({ initialOrders, branchId }: OrdersClientProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [showOnlyGifts, setShowOnlyGifts] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const refreshOrders = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/admin/orders?branchId=${branchId}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Failed to refresh orders:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh every 15 seconds
  useEffect(() => {
    const interval = setInterval(refreshOrders, 15000);
    return () => clearInterval(interval);
  }, [branchId]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        await refreshOrders();
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update order status');
    }
  };

  const filteredOrders = orders
    .filter((order) => selectedStatus === 'ALL' || order.status === selectedStatus)
    .filter((order) => !showOnlyGifts || order.isGift);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PREPARING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'READY':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
          </p>
        </div>
        <button
          onClick={refreshOrders}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-900">Filters</span>
        </div>
        
        {/* Status Filter */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Status</div>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedStatus(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStatus === option.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Gift Order Filter */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyGifts}
              onChange={(e) => setShowOnlyGifts(e.target.checked)}
              className="w-5 h-5 rounded border-purple-400 text-purple-600 focus:ring-purple-500"
            />
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Gift className="w-4 h-4 text-purple-600" />
              Show Gift Orders Only
            </span>
          </label>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {order.orderNumber}
                      </h3>
                      {order.isGift && (
                        <span className="text-sm font-medium px-3 py-1 rounded-full border bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          Gift
                        </span>
                      )}
                      <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      {order.isGift ? (
                        <>
                          <span className="font-medium">
                            🎁 From: {order.giftSenderName} → To: {order.giftRecipientName}
                          </span>
                          <span>•</span>
                          <span className={`font-semibold ${order.giftClaimed ? 'text-green-600' : 'text-purple-600'}`}>
                            {order.giftClaimed ? '✓ Claimed' : '⏳ Unclaimed'}
                          </span>
                        </>
                      ) : (
                        <span className="font-medium">{order.customerName || 'Walk-in Customer'}</span>
                      )}
                      <span>•</span>
                      <span>{order.table.name}</span>
                      <span>•</span>
                      <span>
                        {new Date(order.createdAt).toLocaleString('en-NG', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <span>•</span>
                      <span>{order.itemCount} items</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatNaira(order.total)}
                    </div>
                  </div>
                </div>

                {/* Items Preview */}
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  <ChevronRight className={`w-4 h-4 transition-transform ${expandedOrder === order.id ? 'rotate-90' : ''}`} />
                  {expandedOrder === order.id ? 'Hide' : 'Show'} Items
                </button>

                {expandedOrder === order.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {/* Gift Claim Code */}
                    {order.isGift && order.giftClaimCode && !order.giftClaimed && (
                      <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="text-xs text-purple-600 font-semibold mb-1">CLAIM CODE</div>
                        <div className="text-lg font-mono font-bold text-purple-900">{order.giftClaimCode}</div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">
                            {item.quantity}x {item.itemName}
                            {item.variant && ` (${item.variant.variantName})`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
                  <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                    {/* Claim button for unclaimed gift orders */}
                    {order.isGift && !order.giftClaimed && order.giftClaimCode && (
                      <button
                        onClick={async () => {
                          try {
                            const res = await fetch(`/api/orders/gift/${order.giftClaimCode}/claim`, {
                              method: 'PATCH',
                            });
                            if (res.ok) {
                              await refreshOrders();
                            } else {
                              alert('Failed to claim gift order');
                            }
                          } catch (error) {
                            console.error('Failed to claim gift:', error);
                            alert('Failed to claim gift order');
                          }
                        }}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Gift className="w-4 h-4" />
                        Mark as Claimed
                      </button>
                    )}
                    
                    {nextStatus[order.status] && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, nextStatus[order.status])}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        Mark as {getStatusLabel(nextStatus[order.status])}
                      </button>
                    )}
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'CANCELLED')}
                      className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
