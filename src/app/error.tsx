"use client";

import { Button } from "@/features/shared/ui/button";
import { toast } from "@/features/shared/ui/sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { startTransition } from "react";

/**
 * 글로벌 에러 경계 컴포넌트
 * 애플리케이션 전역에서 발생하는 에러를 처리
 * @param error - 발생한 에러 객체
 * @param reset - 에러 상태 초기화 함수
 */
export default function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    const message = error.message?.trim();
    toast.error(message || "오류가 발생했습니다.");
  }, [error]);

  const onClickButton = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="m-auto text-center">
      <h3>오류가 발생했습니다.</h3>
      <Button onClick={onClickButton} className="mt-2 w-fit bg-green-300 text-sm">
        다시 시도하기
      </Button>
    </div>
  );
}
