import type { ReactNode } from "react";
import Sidebar from "./sidebar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full lg:flex lg:w-fit">
      <Sidebar />
      <main className="max-w-[1200px] flex-1 p-10">{children}</main>
    </div>
  );
}
