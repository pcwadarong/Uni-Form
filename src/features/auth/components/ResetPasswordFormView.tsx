"use client";

import { Button } from "@/features/shared/ui/button";
import { Input } from "@/features/shared/ui/input";
import { memo } from "react";

interface ResetPasswordFormViewProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
}

/**
 * 비밀번호 재설정 폼 UI 컴포넌트
 * 폼 렌더링만 담당하는 순수 컴포넌트
 * @param email - 이메일 값
 * @param onEmailChange - 이메일 변경 핸들러
 * @param onSubmit - 폼 제출 핸들러
 * @param isPending - 제출 중 여부
 */
export const ResetPasswordFormView = memo(function ResetPasswordFormView({
  email,
  onEmailChange,
  onSubmit,
  isPending,
}: ResetPasswordFormViewProps) {
  return (
    <form action={onSubmit} className="mt-15 w-96" aria-labelledby="reset-password">
      <Input
        onChange={(e) => onEmailChange(e.target.value)}
        value={email}
        name="email"
        type="email"
        required
        className="border-b"
        placeholder="이메일 입력"
        aria-label="이메일 입력"
      />
      <Button
        type="submit"
        isPending={isPending}
        className="mt-5 w-full bg-green-400 text-white"
        aria-label="비밀번호 재설정 링크 메일 발송"
      >
        비밀번호 재설정하기
      </Button>
    </form>
  );
});
