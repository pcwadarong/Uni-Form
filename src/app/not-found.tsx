"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center bg-apricot-100 gap-8">
      <h1 className="font-bold text-2xl">죄송합니다. 해당 페이지를 찾을 수 없습니다.</h1>
      <Link href="/" className="cursor-pointer bg-apricot-300 p-4 rounded-2xl hover:shadow">
        홈 화면으로 가기
      </Link>
    </main>
  );
}
