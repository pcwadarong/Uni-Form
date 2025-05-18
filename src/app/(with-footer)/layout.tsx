import Footer from "@/components/layout/footer";
import ScrollToTop from "@/components/ui/scrollToTop";
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
        <ScrollToTop />
      </Suspense>
    </>
  );
}
