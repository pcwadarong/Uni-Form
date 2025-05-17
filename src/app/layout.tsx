import Header from "@/components/layout/header/header";
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
      <body className={`${suit.className} relative body2 bg-background font-black`}>
        <Providers>
          <Header />
          <div className="flex h-auto min-h-screen flex-col items-center pt-20 pb-28">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
