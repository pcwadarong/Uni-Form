import Footer from '@/components/layout/footer';
import ActionBtns from '@/components/ui/actionBtn';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from '../loading';

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
        url: '/preview.jpg',
        width: 800,
        height: 400,
        alt: 'Uniform Logo',
      },
    ],
  },
  metadataBase: new URL('https://uni-form-chaen-chaens-projects.vercel.app/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <Suspense fallback={<Loading />}>
          {children}
          <Footer />
          <ActionBtns />
        </Suspense>
      </>
  );
}
