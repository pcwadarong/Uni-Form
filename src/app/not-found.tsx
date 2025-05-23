"use client";

import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center bg-apricot-100 gap-8">
      <h1 className="font-bold text-2xl">죄송합니다. 해당 페이지를 찾을 수 없습니다.</h1>
      <LinkButton href="/" className="bg-gray-300 hover:bg-green-300">
        홈 화면으로 가기
      </LinkButton>
    </main>
  );
}
