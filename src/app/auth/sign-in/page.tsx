import Form from "@/features/auth/components/sign-in/form";
import Link from "next/link";

/**
 * 로그인 페이지 컴포넌트
 * 사용자 로그인 폼 및 관련 링크를 표시
 */
export default function SignIn() {
  return (
    <>
      <h2 className="title2 mt-20 text-center" id="login-heading">
        로그인
      </h2>
      <div className="mt-10 w-96" aria-labelledby="login-heading">
        <Form />
        <div className="subtitle mt-10 flex items-center justify-center gap-3">
          <Link
            className="flex-1 text-end"
            href="/auth/reset-pw"
            aria-label="비밀번호 재설정 페이지로 이동"
          >
            비밀번호 찾기
          </Link>
          <p>|</p>
          <Link className="flex-1" href="/auth/sign-up" aria-label="회원가입 페이지로 이동">
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
}
