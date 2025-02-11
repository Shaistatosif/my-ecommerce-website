'use client';

import React, { ReactNode } from 'react';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import TopNav from '@/components/TopNavbar';
import Footer from '@/components/Footer';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/images/room.png" as="image" />
        <link rel="preload" href="/images/poplar-sofa.png" as="image" />
      </head>
      <body>
        <CartProvider>
          <TopNav />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
};

export default RootLayout;
