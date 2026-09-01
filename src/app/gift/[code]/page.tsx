import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface GiftOrderData {
  orderNumber: string;
  senderName: string;
  recipientName: string;
  message: string | null;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  claimed: boolean;
  claimedAt: string | null;
  branch: {
    name: string;
    address: string;
    phone: string;
  };
  restaurant: {
    name: string;
  };
  createdAt: string;
}

async function getGiftOrder(code: string): Promise<GiftOrderData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/orders/gift/${code}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.gift;
  } catch (error) {
    console.error('Error fetching gift order:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  const gift = await getGiftOrder(params.code);
  
  if (!gift) {
    return {
      title: 'Gift Order Not Found',
    };
  }
  
  return {
    title: `Gift from ${gift.senderName} - Great Delight`,
    description: `You've received a food gift! Order #${gift.orderNumber}`,
  };
}

export default async function GiftOrderViewPage({
  params,
}: {
  params: { code: string };
}) {
  const gift = await getGiftOrder(params.code);
  
  if (!gift) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 p-4">
      <div className="max-w-2xl mx-auto pt-12 pb-12">
        {/* Gift Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎁</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            You&apos;ve Received a Gift!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            From <strong className="text-purple-600 dark:text-purple-400">{gift.senderName}</strong> to{' '}
            <strong className="text-pink-600 dark:text-pink-400">{gift.recipientName}</strong>
          </p>
        </div>
        
        {/* Gift Message */}
        {gift.message && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-200 dark:border-purple-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">💌 Personal Message:</div>
            <div className="text-lg italic text-gray-800 dark:text-gray-200">&quot;{gift.message}&quot;</div>
          </div>
        )}
        
        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>📦</span> Your Order
          </h2>
          <div className="space-y-3">
            {gift.items.map((item, index) => (
              <div key={index} className="flex justify-between text-gray-800 dark:text-gray-200">
                <span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">{item.quantity}x</span>{' '}
                  {item.name}
                </span>
                <span className="font-semibold">
                  ₦{(item.price / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 mt-4 pt-4">
            <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
              <span>Total Value</span>
              <span className="text-green-600 dark:text-green-400">
                ₦{(gift.total / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Order #{gift.orderNumber}
            </div>
          </div>
        </div>
        
        {/* Claim Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>🔑</span> Claim Information
          </h2>
          {gift.claimed ? (
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-600 rounded-xl p-4">
              <div className="text-green-800 dark:text-green-300 font-bold flex items-center gap-2">
                <span className="text-2xl">✓</span> Already Claimed
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-2">
                Claimed on {new Date(gift.claimedAt!).toLocaleDateString('en-NG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          ) : (
            <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 dark:border-purple-600 rounded-xl p-4">
              <div className="text-purple-800 dark:text-purple-300 font-bold text-lg mb-2">
                🎉 Ready to Claim!
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400 mb-4">
                Visit the restaurant and show this code to staff
              </div>
              <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-purple-400 dark:border-purple-500 rounded-lg p-4 text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">CLAIM CODE</div>
                <div className="text-3xl font-mono font-bold text-purple-600 dark:text-purple-400 tracking-wider">
                  {params.code}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Pickup Location */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>📍</span> Pickup Location
          </h2>
          <div className="space-y-2">
            <div className="font-semibold text-lg text-purple-600 dark:text-purple-400">
              {gift.restaurant.name} - {gift.branch.name}
            </div>
            {gift.branch.address && (
              <div className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <span>🏠</span>
                <span>{gift.branch.address}</span>
              </div>
            )}
            {gift.branch.phone && (
              <div className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${gift.branch.phone}`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {gift.branch.phone}
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Gift created on {new Date(gift.createdAt).toLocaleDateString('en-NG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
}
