import type { Metadata } from 'next';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import '../styles/globals.css';
import '../styles/tailwind.css';

const suit = localFont({ src: '../fonts/SUIT.woff2' });

export const metadata: Metadata = {
  title: 'Uniform',
  description: '대학생을 위한 폼 서비스',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense fallback={<div>loading...</div>}>
        <body className={suit.className}>{children}</body>
      </Suspense>
    </html>
  );
}
