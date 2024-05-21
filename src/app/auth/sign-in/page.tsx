'use client';

import { useRouter } from 'next/navigation';
import Form from './form';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import { googleSignIn } from '@/firebase/auth/sign-in';

const SignIn: React.FC = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const success = await googleSignIn();
    if (success) {
      router.push('/');
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl font-semibold mt-20">로그인</h2>
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
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 py-3 w-full justify-center px-4 border-[1px] rounded-full border-gray-4"
          >
            <GoogleIcon />
            <span>Google로 계속하기</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
