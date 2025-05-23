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
        <div className="flex flex-col items-center -mt-20 pb-36 w-full min-h-screen">
          <div className="h-20"/>
          {children}</div>
        <Footer />
      </Suspense>
    </>
  );
}
