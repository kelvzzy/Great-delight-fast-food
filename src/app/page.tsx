import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Sparkles, ShoppingBag, Clock, Shield, QrCode, Utensils } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 py-12">
        <div className="max-w-5xl w-full space-y-10">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            {/* Logo with glow effect */}
            <div className="flex justify-center mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-2xl opacity-20 scale-150"></div>
              <Logo size="xl" showText={true} />
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 leading-tight">
                GREAT DELIGHT
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-gray-800">
                Digital Ordering Made Simple
              </p>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Scan the QR code on your table, browse our menu, and order your favorite meals in seconds
              </p>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Customer Card */}
            <Link
              href="/menu/great-delight/main/table-01"
              className="group relative overflow-hidden bg-white backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-orange-200 transition-all duration-300 hover:scale-105 border border-orange-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg group-hover:shadow-orange-300 transition-shadow">
                    <Utensils className="w-8 h-8 text-white" />
                  </div>
                  <QrCode className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Order Now
                  </h3>
                  <p className="text-gray-600">
                    Browse our menu and place your order
                  </p>
                </div>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  View Demo Menu
                  <Sparkles className="w-4 h-4 ml-2 group-hover:animate-spin" />
                </div>
              </div>
            </Link>

            {/* Admin Card */}
            <Link
              href="/admin/login"
              className="group relative overflow-hidden bg-white backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-gray-300 transition-all duration-300 hover:scale-105 border border-gray-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-lg group-hover:shadow-gray-400 transition-shadow">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <Clock className="w-8 h-8 text-gray-400 group-hover:text-gray-700 transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Staff Portal
                  </h3>
                  <p className="text-gray-600">
                    Manage orders, menu, and analytics
                  </p>
                </div>
                <div className="flex items-center text-gray-700 font-semibold group-hover:gap-2 transition-all">
                  Admin Login
                  <Shield className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
            <div className="group bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md group-hover:shadow-blue-300 transition-shadow">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  No App Needed
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Order directly from your browser. No downloads, no hassle.
              </p>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md group-hover:shadow-green-300 transition-shadow">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  Real-time Tracking
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Watch your order status update live from kitchen to table.
              </p>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md group-hover:shadow-purple-300 transition-shadow">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  Secure & Fast
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Bank-level security. Order in seconds, eat in minutes.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center pt-8">
            <p className="text-gray-600 text-sm">
              Powered by modern technology · Trusted by food lovers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
