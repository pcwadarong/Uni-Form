"use client";

import { WithdrawContentView } from "@/features/auth/components/WithdrawContentView";
import { withdrawUser } from "@/lib/firebase/auth/withdraw";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

/**
 * 회원 탈퇴 페이지
 * 상태 관리 및 API 호출 처리, UI 컴포넌트에 데이터 전달
 */
export default function Withdraw() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  /**
   * 사용자 탈퇴 처리
   * @param e - 폼 제출 이벤트
   */
  const handleDeleteUser = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (!user) return;
      if (!confirm("정말 탈퇴하시겠습니까? 복구할 수 없습니다.")) return;

      const result = await withdrawUser(user, email, password);

      if (result.status) {
        toast.success("계정이 삭제되었습니다.");
        router.push("/");
      } else toast.error(result.error);
    },
    [auth, email, password, router],
  );

  /**
   * 이메일 변경 핸들러
   */
  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  /**
   * 비밀번호 변경 핸들러
   */
  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  return (
    <WithdrawContentView
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleDeleteUser}
    />
  );
}
