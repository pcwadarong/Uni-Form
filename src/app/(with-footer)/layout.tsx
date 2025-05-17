import Footer from "@/components/layout/footer";
import ActionBtns from "@/components/ui/actionBtn";
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
        <ActionBtns />
      </Suspense>
    </>
  );
}
