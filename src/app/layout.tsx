import type { Metadata } from 'next';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import Circulator from '@/components/common/Circulator';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer';
import '../styles/globals.css';

const suit = localFont({ src: '../fonts/SUIT.woff2' });

export const metadata: Metadata = {
  title: 'Uniform',
  description: '대학생을 위한 폼 서비스',
  keywords: '대학생, 폼 서비스, 설문조사, 온라인 폼',
  icons: {
    icon: '/favicon.ico',
  },
  authors: {
    name: 'chaen',
  },
  openGraph: {
    type: 'website',
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
  metadataBase: new URL('https://your-production-domain.com'), // vercel 주소 작성
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suit.className} overflow-hidden`}>
        <Suspense fallback={<Circulator />}>
          <Header />
          <section className="flex h-auto min-h-screen flex-col items-center pt-20 pb-44">
            {children}
          </section>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
