"use client";

import { LinkButton } from "@/features/shared/ui/button";

/**
 * 404 Not Found 페이지 컴포넌트
 * 존재하지 않는 페이지 접근 시 표시
 */
export default function NotFound() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <h1 className="font-bold text-2xl">죄송합니다. 해당 페이지를 찾을 수 없습니다.</h1>
      <LinkButton href="/" className="bg-gray-300 hover:bg-green-300 dark:bg-gray-500">
        홈 화면으로 가기
      </LinkButton>
    </main>
  );
}
