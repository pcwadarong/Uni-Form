import Header from "@/components/layout/header/header";
import FloatingControls from "@/components/ui/floatingControls";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../contexts/providers";

const suit = localFont({ src: "../fonts/SUIT.woff2" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suit.className} relative body2 bg-muted dark:bg-surface text-content`}>
        <Providers>
          <Header />
          <div className="flex h-auto min-h-screen flex-col items-center pt-20 pb-28">
            {children}
          </div>
          <FloatingControls />
        </Providers>
      </body>
    </html>
  );
}
