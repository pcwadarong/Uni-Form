import Link from "next/link";
import type { ReactNode } from "react";
import Sidebar from "./sidebar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full lg:flex">
      <Sidebar />
      <main className="flex-1 p-10 lg:m-auto">{children}</main>
    </div>
  );
}
