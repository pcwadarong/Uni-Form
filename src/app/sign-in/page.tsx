'use client';

import Form from './form';
import Link from 'next/link';
import Divider from '@mui/material/Divider';

const SignIn: React.FC = () => {
  return (
    <>
      <h2 className="text-center text-2xl font-semibold mt-20">로그인</h2>
      <div className="mt-10 w-96">
        <Form />
        <div className="flex gap-3 h-10 items-center text-sm text-gray-4 justify-center my-4">
          <Link className="flex-1 text-end" href="/help/idInquiry">
            아이디 찾기
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link className="flex-1" href="/reset-pw">
            비밀번호 재설정
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
