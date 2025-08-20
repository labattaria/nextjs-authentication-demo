import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

interface RootLayoutProps {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="font-poppins" lang="en">
      <body className="m-0 min-h-screen text-[#d0cfd6] bg-[#333236] bg-gradient-to-b from-[#121214] to-[#272629]">{children}</body>
    </html>
  );
}
