import Sidebar from "@/features/user/components/sidebar";
import type { ReactNode } from "react";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full lg:flex lg:w-fit">
      <Sidebar />
      <main className="max-w-300 flex-1 p-10">{children}</main>
    </div>
  );
}
