"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { startTransition } from "react";

export default function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
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
      <Button onClick={onClickButton} className="mt-2 bg-green-300 w-fit text-sm">
        다시 시도하기
      </Button>
    </div>
  );
}
