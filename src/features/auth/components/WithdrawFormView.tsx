"use client";

import { Button } from "@/features/shared/ui/button";
import { Input } from "@/features/shared/ui/input";
import { memo } from "react";

interface WithdrawFormViewProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * 회원 탈퇴 폼 UI 컴포넌트
 * 폼 렌더링만 담당하는 순수 컴포넌트
 * @param email - 이메일 값
 * @param password - 비밀번호 값
 * @param onEmailChange - 이메일 변경 핸들러
 * @param onPasswordChange - 비밀번호 변경 핸들러
 * @param onSubmit - 폼 제출 핸들러
 */
export const WithdrawFormView = memo(function WithdrawFormView({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: WithdrawFormViewProps) {
  return (
    <form
      className="mt-15 flex w-96 flex-col gap-4"
      onSubmit={onSubmit}
      aria-labelledby="withdraw-heading"
    >
      <fieldset className="flex flex-col gap-4">
        <legend className="sr-only">회원 탈퇴 확인 정보</legend>
        <div>
          <label htmlFor="withdraw-email" className="sr-only">
            이메일 입력
          </label>
          <Input
            id="withdraw-email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            placeholder="이메일 입력"
          />
        </div>
        <div>
          <label htmlFor="withdraw-password" className="sr-only">
            비밀번호 입력
          </label>
          <Input
            id="withdraw-password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            placeholder="비밀번호 입력"
          />
        </div>
      </fieldset>
      <Button type="submit" className="mt-5 w-full bg-green-400 text-white">
        회원 탈퇴하기
      </Button>
    </form>
  );
});
