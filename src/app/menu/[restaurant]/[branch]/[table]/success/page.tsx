import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';

interface SuccessPageProps {
  params: {
    restaurant: string;
    branch: string;
    table: string;
  };
  searchParams: {
    orderNumber?: string;
  };
}

export default function OrderSuccessPage({ params, searchParams }: SuccessPageProps) {
  const { restaurant, branch, table } = params;
  const orderNumber = searchParams.orderNumber || 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl mb-6 animate-bounce">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mb-2">
            Order Placed!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Successfully submitted 🎉
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 border-2 border-green-200 dark:border-green-900">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Your Order Number
            </p>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-3 rounded-xl border-2 border-green-300 dark:border-green-700">
              {orderNumber}
            </div>
          </div>

          <div className="space-y-4 text-center">
            <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Order Received
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our kitchen has been notified and will start preparing your order shortly
                </p>
              </div>
            </div>

            <div className="py-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Estimated Preparation Time
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                15-20 minutes
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> You&apos;ll see your order status update on the admin dashboard. Our staff will notify you when it&apos;s ready!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/menu/${restaurant}/${branch}/${table}`}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Menu</span>
          </Link>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Want to order more? Head back to the menu!
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500 dark:text-gray-500">
          <p>Thank you for dining with us! 🍽️</p>
        </div>
      </div>
    </div>
  );
}
