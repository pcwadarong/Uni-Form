import Form from './form';
import Link from 'next/link';
import Divider from '@mui/material/Divider';

const SignIn: React.FC = () => {
  return (
    <>
      <h2 className="text-center mt-20">로그인</h2>
      <div className="mt-10 w-96">
        <Form />
        <div className="flex gap-3 h-10 items-center text-sm text-gray-4 justify-center my-4">
          <Link className="flex-1 text-end" href="/reset-pw">
            비밀번호 재설정
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link className="flex-1" href="/auth/sign-up">
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
