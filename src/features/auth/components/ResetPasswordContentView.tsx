"use client";

import { memo } from "react";
import { ResetPasswordFormView } from "./ResetPasswordFormView";

interface ResetPasswordContentViewProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
}

/**
 * 비밀번호 재설정 콘텐츠 UI 컴포넌트
 * 안내 문구와 폼을 렌더링
 */
export const ResetPasswordContentView = memo(function ResetPasswordContentView({
  email,
  onEmailChange,
  onSubmit,
  isPending,
}: ResetPasswordContentViewProps) {
  return (
    <main className="m-auto mt-20">
      <h2 className="title2 text-center" id="reset-password">
        비밀번호 재설정
      </h2>
      <p className="mt-5 text-center">
        유니폼에 가입했던 이메일을 입력해주세요. <br />
        비밀번호 재설정 이메일을 보내드립니다. <br />
        발송된 이메일은 1시간 동안 유효합니다.
      </p>
      <ResetPasswordFormView
        email={email}
        onEmailChange={onEmailChange}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </main>
  );
});
