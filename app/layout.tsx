import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import RecentSales from '@/components/RecentSales';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Laptop Realm',
  description: 'Premium Laptops & Computers at Competitive Prices in Lagos, Nigeria.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-gray-800">
        <AppProvider>
          {/* Header has absolute fixed position in original? Let's assume standard flow or fixed header manually */}
          <div className="fixed top-0 left-0 right-0 z-[999] bg-white w-full">
            <Header />
          </div>
          
          <main className="flex-grow pt-[140px] md:pt-[180px]">
            {children}
          </main>
          
          <Footer />
          <CartDrawer />
          <CheckoutModal />
          <RecentSales />
        </AppProvider>
      </body>
    </html>
  );
}
