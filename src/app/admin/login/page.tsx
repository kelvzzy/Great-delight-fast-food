'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-2xl animate-float">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 mb-2">
            GREAT DELIGHT
          </h1>
          <p className="text-gray-400 text-lg font-medium">Admin Portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
            Sign In
          </h2>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-start gap-3 animate-slide-in-right">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 text-sm">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                placeholder="admin@greatdelight.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 active:scale-95"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center font-semibold mb-3">
              🔐 Demo Credentials
            </p>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <p className="text-sm text-gray-800 flex items-center gap-2">
                <span className="font-bold text-orange-700">Email:</span> 
                <code className="bg-white px-2 py-1 rounded text-xs">admin@greatdelight.com</code>
              </p>
              <p className="text-sm text-gray-800 flex items-center gap-2 mt-2">
                <span className="font-bold text-orange-700">Password:</span> 
                <code className="bg-white px-2 py-1 rounded text-xs">admin123</code>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Powered by <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Do&apos;r Stack Software Solutions</span>
          </p>
        </div>
      </div>
    </div>
  );
}
