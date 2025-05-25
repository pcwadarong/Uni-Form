"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { withdrawUser } from "@/lib/firebase/auth/withdraw";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ResetPw: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleDeleteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    if (!confirm("정말 탈퇴하시겠습니까? 복구할 수 없습니다.")) return;

    const result = await withdrawUser(user, email, password);

    if (result.status) {
      toast.success("계정이 삭제되었습니다.");
      router.push("/");
    } else toast.error(result.error);
  };

  return (
    <main className="m-auto mt-20">
      <h2 className="text-center title2" id="reset-password-heading">
        회원 탈퇴
      </h2>
      <p className="mt-5 text-center">정말 탈퇴하시겠습니까? 회원 정보를 복구할 수 없습니다.</p>
      <form
        className="mt-15 w-96 flex flex-col gap-4"
        onSubmit={handleDeleteUser}
        aria-labelledby="reset-password"
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="이메일 입력"
          aria-label="이메일 입력"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="비밀번호 입력"
          aria-label="비밀번호 입력"
        />
        <Button
          type="submit"
          className="text-white w-full bg-green-400 mt-5"
          aria-label="회원 탈퇴하기"
        >
          회원 탈퇴하기
        </Button>
      </form>
    </main>
  );
};

export default ResetPw;
