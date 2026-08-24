import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo/Branding */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary-900">
            GREAT DELIGHT
          </h1>
          <p className="text-xl text-gray-600">
            Premium Nigerian Restaurant
          </p>
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome
          </h2>
          <p className="text-lg text-gray-600">
            Scan the QR code on your table to browse our digital menu and place your order.
          </p>

          {/* Quick Actions */}
          <div className="grid gap-4 pt-4">
            <Link
              href="/admin"
              className="block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              Staff / Admin Login
            </Link>
            
            <Link
              href="/menu/great-delight/main/table-01"
              className="block bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              View Demo Menu (Table 01)
            </Link>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-primary-600 font-semibold mb-1">
              No App Required
            </div>
            <div className="text-gray-600">
              Order directly from your browser
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-primary-600 font-semibold mb-1">
              Real-time Updates
            </div>
            <div className="text-gray-600">
              Track your order status live
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-primary-600 font-semibold mb-1">
              Secure & Fast
            </div>
            <div className="text-gray-600">
              Order in seconds, eat in minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
