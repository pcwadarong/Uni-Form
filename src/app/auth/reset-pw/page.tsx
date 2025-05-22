"use client";

import { resetPWAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INITIAL_ACTION_STATE } from "@/constants/states";
import type { ActionState } from "@/types";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useEffect, useState } from "react";

const ResetPw: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [resetState, formAction, isPending] = useActionState<ActionState, FormData>(
    resetPWAction,
    INITIAL_ACTION_STATE,
  );

  useEffect(() => {
    if (!resetState) return;

    if (!resetState.status) {
      console.error(resetState.error);
      return;
    }

    if (confirm("메일이 발송되었습니다. 로그인 화면으로 돌아가시겠습니까?")) {
      router.push("/sign");
    }
    setEmail("");
  }, [resetState, router]);

  return (
    <div className="m-auto">
      <h2 className="text-center title2" id="reset-password-heading">
        비밀번호를 잊어버리셨나요?
      </h2>
      <p className="mt-5 text-center">
        유니폼에 가입했던 이메일을 입력해주세요. <br />
        비밀번호 재설정 이메일을 보내드립니다. <br />
        발송된 이메일은 1시간 동안 유효합니다.
      </p>
      <form action={formAction} className="mt-15 w-96" aria-labelledby="reset-password">
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          required
          className="border-b"
          placeholder="이메일 입력"
          aria-label="이메일 입력"
        />
        <Button
          type="submit"
          isPending={isPending}
          className="text-white w-full bg-green-400 mt-5"
          aria-label="비밀번호 재설정 링크 메일 발송"
        >
          비밀번호 재설정하기
        </Button>
      </form>
    </div>
  );
};

export default ResetPw;
