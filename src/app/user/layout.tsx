import type { ReactNode } from "react";
import Sidebar from "./sidebar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="lg:flex w-full lg:w-fit">
      <Sidebar />
      <main className="flex-1 p-10 max-w-[1200px]">{children}</main>
    </div>
  );
}
