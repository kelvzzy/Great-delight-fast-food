'use client';

import { formatNaira } from '@/lib/utils';
import { CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customerName: string;
  createdAt: string;
  table: {
    name: string;
  };
  branch: {
    name: string;
    slug: string;
    restaurant: {
      name: string;
      slug: string;
    };
  };
  items: Array<{
    id: string;
    itemName: string;
    quantity: number;
    subtotal: number;
    variant?: {
      variantName: string;
    } | null;
    options: Array<{
      valueName: string;
    }>;
  }>;
}

interface OrderConfirmationClientProps {
  order: Order;
}

const statusInfo = {
  NEW: { label: 'Order Placed', color: 'blue', icon: Clock },
  ACCEPTED: { label: 'Order Accepted', color: 'green', icon: CheckCircle },
  PREPARING: { label: 'Being Prepared', color: 'yellow', icon: Clock },
  READY: { label: 'Ready for Pickup', color: 'green', icon: CheckCircle },
  COMPLETED: { label: 'Completed', color: 'green', icon: CheckCircle },
  CANCELLED: { label: 'Cancelled', color: 'red', icon: Clock },
};

export function OrderConfirmationClient({ order: initialOrder }: OrderConfirmationClientProps) {
  const [order, setOrder] = useState(initialOrder);
  const [polling, setPolling] = useState(true);

  const status = statusInfo[order.status as keyof typeof statusInfo] || statusInfo.NEW;
  const StatusIcon = status.icon;

  // Poll for order updates every 10 seconds
  useEffect(() => {
    if (!polling || order.status === 'COMPLETED' || order.status === 'CANCELLED') {
      setPolling(false);
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${order.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.order) {
            setOrder(data.order);
            
            // Stop polling if order is completed or cancelled
            if (data.order.status === 'COMPLETED' || data.order.status === 'CANCELLED') {
              setPolling(false);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch order update:', error);
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [order.id, order.status, polling]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-green-50 text-lg">
          Your order has been sent to the kitchen
        </p>
      </div>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Order Info Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-600 mb-1">Order Number</div>
            <div className="text-3xl font-bold text-gray-900">{order.orderNumber}</div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
            <StatusIcon className={`w-6 h-6 text-${status.color}-600`} />
            <span className={`text-lg font-semibold text-${status.color}-700`}>
              {status.label}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Customer</span>
              <span className="font-medium text-gray-900">{order.customerName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Table</span>
              <span className="font-medium text-gray-900">{order.table.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Restaurant</span>
              <span className="font-medium text-gray-900">{order.branch.restaurant.name}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Time</span>
              <span className="font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleTimeString('en-NG', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Details</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {item.quantity}x {item.itemName}
                  </div>
                  {item.variant && (
                    <div className="text-sm text-gray-600 mt-1">
                      Size: {item.variant.variantName}
                    </div>
                  )}
                  {item.options.length > 0 && (
                    <div className="text-sm text-gray-600 mt-1">
                      {item.options.map((opt, idx) => (
                        <div key={idx}>• {opt.valueName}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="font-semibold text-gray-900">
                  {formatNaira(item.subtotal)}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary-700">
                {formatNaira(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Status Updates Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-1">Track Your Order</h3>
              <p className="text-sm text-blue-800">
                We&apos;ll update this page automatically as your order is being prepared. 
                Your food will be delivered to your table when ready.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/menu/${order.branch.restaurant.slug}/${order.branch.slug}/${order.table.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Order More
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Print Receipt
          </button>
        </div>

        {/* Footer Message */}
        <div className="text-center py-6">
          <p className="text-gray-600">
            Thank you for dining with us! 🍽️
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Powered by <span className="font-semibold">Do&apos;r Stack Software Solutions</span>
          </p>
        </div>
      </main>
    </div>
  );
}
