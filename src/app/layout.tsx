import type { Metadata } from 'next';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import Loading from './loading';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer';
import ActionBtns from '@/components/common/actionBtn';
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
      <body className={`${suit.className} relative .body2`}>
        <Suspense fallback={<Loading />}>
          <Header />
          <div className="flex h-auto min-h-screen flex-col items-center pt-20 pb-24">
            {children}
          </div>
          <Footer />
          <ActionBtns />
        </Suspense>
      </body>
    </html>
  );
}
