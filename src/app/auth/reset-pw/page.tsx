"use client";

import { INITIAL_ACTION_STATE } from "@/constants/states";
import { resetPWAction } from "@/features/auth/actions/auth";
import { ResetPasswordContentView } from "@/features/auth/components/ResetPasswordContentView";
import type { ActionState } from "@/features/shared/types";
import { useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * 비밀번호 재설정 페이지
 * 상태 관리 및 API 호출 처리, UI 컴포넌트에 데이터 전달
 */
export default function ResetPw() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [resetState, formAction, isPending] = useActionState<ActionState, FormData>(
    resetPWAction,
    INITIAL_ACTION_STATE,
  );

  /**
   * 비밀번호 재설정 결과 처리
   */
  useEffect(() => {
    if (resetState.status === null) return;
    if (!resetState.status) {
      toast(resetState.error ?? "비밀번호 재설정에 실패했습니다.");
      return;
    }
    if (confirm("메일이 발송되었습니다. 로그인 화면으로 돌아가시겠습니까?")) {
      setEmail("");
      router.push("/sign");
    }
  }, [resetState, router]);

  /**
   * 이메일 변경 핸들러
   */
  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  return (
    <ResetPasswordContentView
      email={email}
      onEmailChange={handleEmailChange}
      onSubmit={formAction}
      isPending={isPending}
    />
  );
}
