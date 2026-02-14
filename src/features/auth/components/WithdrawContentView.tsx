"use client";

import { memo } from "react";
import { WithdrawFormView } from "./WithdrawFormView";

interface WithdrawContentViewProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * 회원 탈퇴 콘텐츠 UI 컴포넌트
 * 안내 문구와 폼을 렌더링
 */
export const WithdrawContentView = memo(function WithdrawContentView({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: WithdrawContentViewProps) {
  return (
    <main className="m-auto mt-20">
      <h2 className="title2 text-center" id="withdraw-heading">
        회원 탈퇴
      </h2>
      <p className="mt-5 text-center">정말 탈퇴하시겠습니까? 회원 정보를 복구할 수 없습니다.</p>
      <WithdrawFormView
        email={email}
        password={password}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
      />
    </main>
  );
});
