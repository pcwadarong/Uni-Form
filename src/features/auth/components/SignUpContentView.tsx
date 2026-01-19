"use client";

import Form from "@/features/auth/components/sign-up/form";
import { memo } from "react";

/**
 * 회원가입 콘텐츠 UI 컴포넌트
 * 회원가입 폼을 렌더링하는 순수 컴포넌트
 */
export const SignUpContentView = memo(function SignUpContentView() {
  return (
    <>
      <h2 className="title2 mt-20 text-center text-green-500">회원가입</h2>
      <div className="mt-10 w-96">
        <Form />
      </div>
    </>
  );
});
