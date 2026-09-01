'use client';

import { useCartStore } from '@/stores/cart.store';
import { formatNaira } from '@/lib/utils';
import { ArrowLeft, Trash2, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GiftCheckbox } from '@/components/gift/GiftCheckbox';
import { GiftDetailsModal, type GiftDetails } from '@/components/gift/GiftDetailsModal';
import { WhatsAppShareButton } from '@/components/gift/WhatsAppShareButton';

export default function CartPage({
  params,
}: {
  params: { restaurant: string; branch: string; table: string };
}) {
  const router = useRouter();
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeItem, tableId, branchId } =
    useCartStore();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Gift order state
  const [isGiftOrder, setIsGiftOrder] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftDetails, setGiftDetails] = useState<GiftDetails | null>(null);
  const [giftOrderResult, setGiftOrderResult] = useState<{
    orderNumber: string;
    whatsappLink: string;
    recipientName: string;
  } | null>(null);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Show gift success screen if gift order completed
  if (giftOrderResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4 animate-bounce">🎁</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Gift Order Created!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Order #{giftOrderResult.orderNumber}
          </p>
          <div className="mb-6">
            <WhatsAppShareButton
              whatsappLink={giftOrderResult.whatsappLink}
              recipientName={giftOrderResult.recipientName}
            />
          </div>
          <Link
            href={`/menu/${params.restaurant}/${params.branch}/${params.table}`}
            className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const handleGiftCheckboxChange = (checked: boolean) => {
    setIsGiftOrder(checked);
    if (checked) {
      setShowGiftModal(true);
    } else {
      setGiftDetails(null);
    }
  };

  const handleGiftDetailsSubmit = (details: GiftDetails) => {
    setGiftDetails(details);
    setShowGiftModal(false);
  };

  const handleSubmitOrder = async () => {
    // Validate based on order type
    if (isGiftOrder) {
      if (!giftDetails) {
        setError('Please provide gift details');
        return;
      }
    } else {
      if (!customerName.trim()) {
        setError('Please enter your name');
        return;
      }
    }

    if (!tableId || !branchId) {
      setError('Table information missing. Please scan the QR code again.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const orderItems = items.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        variantId: item.variantId,
        optionValueIds: item.options.map((opt) => opt.valueId),
      }));

      if (isGiftOrder && giftDetails) {
        // Submit as gift order
        const response = await fetch('/api/orders/gift', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            branchId,
            tableId,
            giftSenderName: giftDetails.senderName,
            giftSenderPhone: giftDetails.senderPhone,
            giftRecipientName: giftDetails.recipientName,
            giftRecipientPhone: giftDetails.recipientPhone,
            giftMessage: giftDetails.message || undefined,
            items: orderItems,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to submit gift order');
        }

        const data = await response.json();
        
        // Show WhatsApp share button
        setGiftOrderResult({
          orderNumber: data.order.orderNumber,
          whatsappLink: data.whatsappLink,
          recipientName: giftDetails.recipientName,
        });
        
        // Clear cart
        setTimeout(() => {
          useCartStore.getState().clearCart();
        }, 100);
      } else {
        // Submit regular order
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            branchId,
            tableId,
            customerName: customerName.trim(),
            customerPhone: customerPhone.trim() || undefined,
            specialNote: specialNote.trim() || undefined,
            items: orderItems,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to submit order');
        }

        const data = await response.json();
        
        // Redirect to success page BEFORE clearing cart
        router.push(`/menu/${params.restaurant}/${params.branch}/${params.table}/success?orderNumber=${data.orderNumber}`);
        
        // Clear cart after navigation starts
        setTimeout(() => {
          useCartStore.getState().clearCart();
        }, 100);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
          <Link
            href={`/menu/${params.restaurant}/${params.branch}/${params.table}`}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-3">
          <Link
            href={`/menu/${params.restaurant}/${params.branch}/${params.table}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-sm text-gray-600">{totalItems} items</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-32 space-y-6">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  {item.variantName && (
                    <p className="text-sm text-gray-600 mt-1">Size: {item.variantName}</p>
                  )}
                  {item.options.length > 0 && (
                    <div className="mt-1 space-y-0.5">
                      {item.options.map((opt) => (
                        <p key={opt.valueId} className="text-sm text-gray-600">
                          • {opt.valueName}
                          {opt.priceModifier > 0 && ` (+${formatNaira(opt.priceModifier)})`}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100 rounded-l-lg"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-r-lg"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="font-bold text-lg text-gray-900">
                  {formatNaira(item.subtotal)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gift Order Option */}
        <GiftCheckbox
          checked={isGiftOrder}
          onChange={handleGiftCheckboxChange}
        />
        
        {/* Gift Details Modal */}
        <GiftDetailsModal
          isOpen={showGiftModal}
          onClose={() => setShowGiftModal(false)}
          onSubmit={handleGiftDetailsSubmit}
        />

        {/* Customer Information - Only show if NOT a gift order */}
        {!isGiftOrder && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="080XXXXXXXX"
                />
              </div>

              <div>
                <label htmlFor="specialNote" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="specialNote"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Any special requests or allergies?"
                />
              </div>
            </div>
          </div>
        )}

        {/* Gift Order Summary - Show if gift order */}
        {isGiftOrder && giftDetails && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 shadow-sm border-2 border-purple-300 dark:border-purple-600">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span>🎁</span> Gift Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">From:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{giftDetails.senderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">To:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{giftDetails.recipientName}</span>
              </div>
              {giftDetails.message && (
                <div className="pt-2 border-t border-purple-200 dark:border-purple-700">
                  <span className="text-gray-600 dark:text-gray-300">Message:</span>
                  <p className="text-gray-900 dark:text-gray-100 italic mt-1">&quot;{giftDetails.message}&quot;</p>
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowGiftModal(true)}
                className="mt-3 text-purple-600 dark:text-purple-400 hover:underline text-sm font-semibold"
              >
                Edit Gift Details
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}
      </main>

      {/* Bottom Summary & Submit */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-20">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">{formatNaira(totalPrice)}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-gray-900">{formatNaira(totalPrice)}</span>
          </div>
          <button
            onClick={handleSubmitOrder}
            disabled={isSubmitting || (isGiftOrder ? !giftDetails : !customerName.trim())}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors"
          >
            {isSubmitting 
              ? (isGiftOrder ? 'Creating Gift Order...' : 'Placing Order...') 
              : (isGiftOrder ? `Send Gift · ${formatNaira(totalPrice)}` : `Place Order · ${formatNaira(totalPrice)}`)
            }
          </button>
        </div>
      </div>
    </div>
  );
}
