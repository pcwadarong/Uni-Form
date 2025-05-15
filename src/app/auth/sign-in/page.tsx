import Link from "next/link";
import Form from "./form";

const SignIn: React.FC = () => {
  return (
    <>
      <h2 className="text-center mt-20 title2" id="login-heading">
        로그인
      </h2>
      <div className="mt-10 w-96" role="form" aria-labelledby="login-heading">
        <Form />
        <div
          className="flex gap-3 h-10 items-center subtitle text-gray-4 justify-center my-4"
          role="navigation"
        >
          <Link
            className="flex-1 text-end"
            href="/auth/reset-pw"
            aria-label="비밀번호 재설정 페이지로 이동"
          >
            비밀번호 재설정
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
