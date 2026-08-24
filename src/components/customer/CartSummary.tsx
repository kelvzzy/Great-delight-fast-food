'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/stores/cart.store';
import { formatNaira } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface CartSummaryProps {
  tableId: string;
  branchId: string;
  restaurantSlug: string;
  branchSlug: string;
  tableSlug: string;
}

export function CartSummary({ tableId, branchId, restaurantSlug, branchSlug, tableSlug }: CartSummaryProps) {
  const { items, getTotalItems, getTotalPrice, setTable } = useCartStore();

  useEffect(() => {
    setTable(tableId, branchId);
  }, [tableId, branchId, setTable]);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) {
    return (
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-30">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <ShoppingCart className="w-5 h-5" />
          <span className="font-medium">Your cart is empty</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-30">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 p-2 rounded-lg">
            <ShoppingCart className="w-5 h-5 text-primary-700" />
          </div>
          <div>
            <div className="text-sm text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {formatNaira(totalPrice)}
            </div>
          </div>
        </div>

        <Link
          href={`/menu/${restaurantSlug}/${branchSlug}/${tableSlug}/cart`}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
