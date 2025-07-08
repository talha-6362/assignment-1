// ❌ Don't put 'use client' here
import './globals.css';
import type { ReactNode } from 'react';
import LoaderWrapper from '../components/LoaderWrapper';
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Quote Generator | Nexium Internship',
  description: 'Find quotes based on topics using a beautiful UI.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <LoaderWrapper>
  <Header />
  <main className="flex-grow">{children}</main>
  <Footer />
</LoaderWrapper>

        <Toaster richColors position="top-center" closeButton />
      </body>
    </html>
  );
}
