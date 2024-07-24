'use client';

import { useRouter } from 'next/navigation';
import { resetPassword } from '@/firebase/auth/sign-up';
import { useState, useEffect } from 'react';
import { validateSignInput } from '@/utils/validateSignInput';
const ResetPw: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(false);

  const handleResetPassword = () => {
    resetPassword(email);
  };

  useEffect(() => {
    const isFormValid = validateSignInput('email', email);
    setStatus(isFormValid);
  }, [email]);

  return (
    <>
      <h2 className="text-center mt-20 title2" id="login-heading">
        비밀전호를 잊어버리셨나요?
      </h2>
      <p className="mt-5 text-center">
        유니폼에 가입했던 이메일을 입력해주세요. <br />
        비밀번호 재설정 이메일을 보내드립니다. <br />
        발송된 이메일은 1시간 동안 유효합니다.
      </p>
      <div className="mt-10 max-w-96" role="form" aria-labelledby="login-heading">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full p-2 bg-red/0 border-b-[1px] focus:ring-2 focus:ring-gray-4 outline-none"
          placeholder="이메일"
          aria-label="이메일 입력"
        />
        <button
          onClick={handleResetPassword}
          disabled={!status}
          aria-disabled={!status}
          className={`text-white w-full rounded-xl bg-primary p-2 body2 mt-5 ${status ? '' : 'opacity-50 cursor-not-allowed'}`}
        >
          비밀번호 재설정하기
        </button>
      </div>
    </>
  );
};

export default ResetPw;
