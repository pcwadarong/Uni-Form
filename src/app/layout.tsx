import Header from "@/components/layout/header/header";
import FloatingControls from "@/components/ui/floatingControls";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "../contexts/providers";

const suit = localFont({ src: "../fonts/SUIT.woff2" });

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suit.className} relative body2 text-content bg-muted dark:bg-surface`}>
        <Providers>
          <Header />
          <div className="flex flex-col items-center pt-20">
            {children}
          </div>
          <Toaster />
          <FloatingControls />
          {modal}
          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  );
}
