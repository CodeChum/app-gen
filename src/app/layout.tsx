import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'App Generator',
  description: 'See how easy it is to generate AI apps!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
