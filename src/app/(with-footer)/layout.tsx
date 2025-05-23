import Footer from "@/components/layout/footer";
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
        <div className="w-full flex flex-col items-center min-h-screen -mt-20 pb-36">
          <div className="h-20"/>
          {children}</div>
        <Footer />
      </Suspense>
    </>
  );
}
