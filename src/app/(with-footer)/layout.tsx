import Footer from "@/features/shared/layout/footer";
import { Suspense } from "react";
import Loading from "../loading";

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
