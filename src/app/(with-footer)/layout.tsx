import Footer from "@/features/shared/layout/footer";
import { Suspense } from "react";
import Loading from "../loading";

/**
 * 푸터 포함 레이아웃 컴포넌트
 * Suspense 경계와 푸터를 제공
 * @param children - 페이지 콘텐츠
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="-mt-20 flex min-h-screen w-full flex-col items-center pb-36">
          <div className="h-20" />
          {children}
        </div>
        <Footer />
      </Suspense>
    </>
  );
}
