"use client";
import CircularProgress from "@/features/shared/ui/circular";

/**
 * 글로벌 로딩 컴포넌트
 * 페이지 로딩 중 표시되는 로딩 UI
 */
export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <CircularProgress aria-label="불러오는 중입니다." />
    </div>
  );
}
