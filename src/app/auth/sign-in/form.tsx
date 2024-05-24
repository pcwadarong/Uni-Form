'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import GoogleIcon from '@mui/icons-material/Google';
import { handleLogin } from '@/firebase/auth/sign-in';
import { useAuthStore } from '@/store';

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const { setUser, loadUserFromSession } = useAuthStore();

  const login = async (event: React.FormEvent, method: 'email' | 'google') => {
    event.preventDefault();
    const success = await handleLogin(method, email, password, setUser);
    if (success) {
      router.push('/');
    } else {
      setLoginErrorMessage(
        '가입하지 않은 이메일이거나, 이메일 또는 비밀번호가 회원정보와 일치하지 않아 로그인에 실패하였습니다.',
      );
    }
  };

  useEffect(() => {
    if (password && email) setStatus(true);
    loadUserFromSession();
  }, [password, email, loadUserFromSession]);

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
            <MailOutlineIcon className="absolute top-2.5 left-3 text-gray-3" />
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
            <PasswordIcon className="absolute top-2.5 left-3 text-gray-3" />
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
        <p className="text-red">{loginErrorMessage}</p>
        <div>
          <button
            type="submit"
            className={`text-white w-full rounded-xl bg-primary p-4 text-base ${status ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!status}
          >
            로그인하기
          </button>
        </div>
      </form>
      <div className="mt-6 flex justify-center">
        <button
          onClick={(e) => login(e, 'google')}
          className="flex items-center gap-2 py-3 w-full justify-center px-4 border-[1px] rounded-full border-gray-4"
        >
          <GoogleIcon />
          <span>Google로 계속하기</span>
        </button>
      </div>
    </div>
  );
};

export default Form;
