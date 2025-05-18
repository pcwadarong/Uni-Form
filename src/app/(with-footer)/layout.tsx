import Footer from "@/components/layout/footer";
import FloatingControls from "@/components/ui/floatingControls";
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
        {children}
        <Footer />
        <FloatingControls />
      </Suspense>
    </>
  );
}
