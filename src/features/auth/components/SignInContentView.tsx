"use client";

import Form from "@/features/auth/components/sign-in/form";
import Link from "next/link";
import { memo } from "react";

/**
 * 로그인 콘텐츠 UI 컴포넌트
 * 로그인 폼 및 관련 링크를 렌더링하는 순수 컴포넌트
 */
export const SignInContentView = memo(function SignInContentView() {
  return (
    <>
      <h2 className="title2 mt-20 text-center" id="login-heading">
        로그인
      </h2>
      <section className="mt-10 w-96" aria-labelledby="login-heading">
        <Form />
        <nav className="subtitle mt-10" aria-label="로그인 관련 링크">
          <ul className="flex items-center justify-center gap-3">
            <li className="flex-1 text-end">
              <Link href="/auth/reset-pw">비밀번호 찾기</Link>
            </li>
            <li aria-hidden="true">|</li>
            <li className="flex-1">
              <Link href="/auth/sign-up">회원가입</Link>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
});
