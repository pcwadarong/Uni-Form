import Link from "next/link";
import Form from "./form";

const SignIn: React.FC = () => {
  return (
    <>
      <h2 className="mt-20 text-center title2" id="login-heading">
        로그인
      </h2>
      <div className="mt-10 w-96" aria-labelledby="login-heading">
        <Form />
        <div
          className="flex gap-3 items-center justify-center mt-10 subtitle"
        >
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
};

export default SignIn;
