import type { Metadata } from 'next';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import '../styles/globals.css';

const suit = localFont({ src: '../fonts/SUIT.woff2' });

export const metadata: Metadata = {
  title: 'Uniform',
  description: '대학생을 위한 폼 서비스',
  keywords: '대학생, 폼 서비스, 설문조사, 온라인 폼',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.uniform.com', // 대체 필요
    title: 'Uniform',
    description: '대학생을 위한 폼 서비스',
    images: [
      {
        url: '/og-image.jpg', // 이미지 제작 필요
        width: 800,
        height: 600,
        alt: 'Uniform Logo',
      },
    ],
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
