import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'GREAT DELIGHT - Nigerian Restaurant',
  description: 'Premium Nigerian cuisine - Browse our digital menu and order from your table',
  keywords: ['restaurant', 'Nigerian food', 'digital menu', 'Lagos', 'GREAT DELIGHT'],
  authors: [{ name: "Do'r Stack Software Solutions" }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#ff5a1f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ErrorBoundary>
            {children}
            <ToastProvider />
          </ErrorBoundary>
          {/* DSSS Footer Credit */}
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 dark:bg-gray-950 text-gray-400 text-xs py-2 text-center z-50">
            Powered by{' '}
            <span className="text-white font-semibold">Do&apos;r Stack Software Solutions</span>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
