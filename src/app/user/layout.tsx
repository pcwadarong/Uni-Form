import Sidebar from "@/features/user/components/sidebar";
import type { ReactNode } from "react";

/**
 * 사용자 페이지 레이아웃 컴포넌트
 * 사이드바와 메인 콘텐츠 영역을 제공
 * @param children - 페이지 콘텐츠
 */
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
