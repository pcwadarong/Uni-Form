import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 기본 텍스트, 플레이스홀더
        "file:text-surface placeholder:text-gray-400 selection:bg-tone2-reverse selection:text-tone2",

        // 배경 및 테두리
        "border-muted bg-tone1",

        // 기본 레이아웃
        "flex w-full min-w-0 rounded-md p-3 text-base shadow-xs transition-[color,box-shadow] outline-none",

        // 파일 인풋 스타일
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",

        // 디스에이블드
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        // 포커스
        "focus-visible:border-muted",

        // 유효성 검증
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        className,
      )}
      {...props}
    />
  );
}

export { Input };
