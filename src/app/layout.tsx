import { Providers } from "@/features/shared/contexts/providers";
import Header from "@/features/shared/layout/header/header";
import FloatingControls from "@/features/shared/ui/floatingControls";
import { Toaster } from "@/features/shared/ui/sonner";
import localFont from "next/font/local";
import "./globals.css";

const suit = localFont({ src: "../fonts/SUIT.woff2" });

/**
 * 루트 레이아웃 컴포넌트
 * 전역 레이아웃, 헤더, 플로팅 컨트롤, 모달 루트를 제공
 * @param children - 페이지 콘텐츠
 * @param modal - 모달 콘텐츠 (Intercepting Routes)
 */
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suit.className} body2 relative bg-muted text-content dark:bg-surface`}>
        <Providers>
          <Header />
          <div className="flex flex-col items-center pt-20">{children}</div>
          <Toaster />
          <FloatingControls />
          {modal}
          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  );
}
