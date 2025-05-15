'use client';

import { handleLogin } from '@/lib/firebase/auth/sign-in';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const login = async (event: React.FormEvent, method: 'email' | 'google') => {
    event.preventDefault();
    const success = await handleLogin(method, email, password);
    if (success) {
      router.push('/');
    } else {
      setLoginErrorMessage(
        '가입하지 않은 이메일이거나, 이메일 또는 비밀번호가 회원정보와 일치하지 않아 로그인에 실패하였습니다.',
      );
    }
  };

  useEffect(() => {
    setStatus(!!(password && email));
  }, [password, email]);

  return (
    <div>
      <form
        className="flex flex-col gap-6 subtitle"
        onSubmit={(e) => login(e, 'email')}
        autoComplete="on"
      >
        <div>
          <label htmlFor="id">이메일</label>
          <div className="relative mt-2">
            <Image
              src={'/mail.svg'}
              alt="user"
              width="20"
              height="20"
              priority={true}
              className="absolute top-3.5 left-3 text-gray-3"
            />
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              required
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-12 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password">비밀번호</label>
          <div className="relative mt-2">
            <Image
              src={'/password.svg'}
              alt="user"
              width="20"
              height="20"
              priority={true}
              className="absolute top-3 left-3 text-gray-3"
            />
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              required
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-12 rounded-xl focus:outline-none"
            />
          </div>
        </div>
        <p className="text-red-500">{loginErrorMessage}</p>
        <div>
          <button
            type="submit"
            className={`text-white w-full rounded-xl bg-primary p-4 text-base ${
              status ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!status}
          >
            로그인하기
          </button>
        </div>
      </form>
      <div className="mt-6 flex justify-center relative">
        <button
          type="submit"
          onClick={(e) => login(e, 'google')}
          className="flex items-center gap-2 py-3 w-full justify-center px-4 border-[1px] rounded-full border-gray-4"
        >
          <Image
            src={'/google.svg'}
            alt="icon"
            width="20"
            height="20"
            priority={true}
          />
          <span>Google로 계속하기</span>
        </button>
      </div>
    </div>
  );
};

export default Form;
