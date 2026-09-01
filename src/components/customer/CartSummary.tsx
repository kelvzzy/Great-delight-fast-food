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
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-100 to-gray-200 border-t-2 border-gray-300 px-4 py-6 shadow-2xl z-30 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-3 text-gray-500 max-w-4xl mx-auto">
          <div className="p-3 bg-white rounded-full shadow-md">
            <ShoppingCart className="w-6 h-6 text-gray-400" />
          </div>
          <span className="font-semibold text-lg">Your cart is empty</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 border-t-4 border-orange-400 px-4 py-5 shadow-2xl z-30 backdrop-blur-sm animate-slide-in-right">
      <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="bg-white p-3 rounded-2xl shadow-lg">
              <ShoppingCart className="w-7 h-7 text-orange-600" />
            </div>
            {/* Item count badge */}
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              {totalItems}
            </div>
          </div>
          <div>
            <div className="text-sm text-white/90 font-medium">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
            </div>
            <div className="text-2xl font-extrabold text-white drop-shadow-lg">
              {formatNaira(totalPrice)}
            </div>
          </div>
        </div>

        <Link
          href={`/menu/${restaurantSlug}/${branchSlug}/${tableSlug}/cart`}
          className="bg-white hover:bg-yellow-50 text-orange-600 font-bold text-lg py-4 px-8 rounded-2xl transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-2"
        >
          <span>View Cart</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
