'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import { emailSignIn} from '@/firebase/auth/sign-in';

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await emailSignIn(email, password);
    if (success) {
      router.push('/');
    }
    console.error('Login failed');
  };

  useEffect(() => {
    if (password && email) setStatus(true);
  }, [password, email]);

  return (
    <div>
      <form className="flex flex-col gap-6 text-sm" onSubmit={handleLogin} autoComplete="on">
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
        <div>
          <button
            type="submit"
            className={`text-white w-full rounded-xl bg-primary p-4 text-base mt-5 ${status ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!status}
          >
            로그인하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
