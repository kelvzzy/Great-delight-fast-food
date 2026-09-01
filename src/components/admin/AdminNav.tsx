'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Menu as MenuIcon, 
  Users, 
  QrCode,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/Logo';

interface AdminNavProps {
  userName?: string;
  userEmail?: string;
}

export function AdminNav({ userName, userEmail }: AdminNavProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/menu', label: 'Menu', icon: MenuIcon },
    { href: '/admin/tables', label: 'Tables', icon: QrCode },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen shadow-2xl border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <Logo size="md" variant="dark" showText={true} />
          <div className="mt-3 px-3 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
            <p className="text-xs text-orange-300 font-bold uppercase tracking-wider">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/30'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-r-full"></div>
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                <span className="font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          <div className="mb-4 px-4 py-3 bg-gray-900/50 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                {(userName || 'A')[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{userName || 'Admin User'}</p>
                <p className="text-xs text-gray-400 truncate">{userEmail || ''}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-200 font-semibold group"
          >
            <LogOut className="w-5 h-5 group-hover:animate-bounce" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-4 flex items-center justify-between sticky top-0 z-50 shadow-xl border-b border-gray-700">
        <Logo size="sm" variant="dark" showText={false} />
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 hover:bg-gray-700 rounded-xl transition-colors active:scale-95"
        >
          {isMobileMenuOpen ? (
            <ChevronLeft className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-40 pt-20 animate-slide-in-right">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white active:scale-95'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold text-lg">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-700 absolute bottom-0 left-0 right-0 bg-gray-800/50">
            <div className="mb-4 px-4 py-3 bg-gray-900/50 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  {(userName || 'A')[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{userName || 'Admin User'}</p>
                  <p className="text-xs text-gray-400">{userEmail || ''}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-4 text-gray-300 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-200 font-semibold active:scale-95"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-lg">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
