'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebasConfig';

const Form = () => {
  const router = useRouter();
  //const [id, setId] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        console.log('Login successful');
        router.push('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      {/* <p role="alert" aria-live="assertive" className="text-sm text-red-600 mb-4">
        {status === 'error' ? errorMessage : ''}
      </p> */}
      <form className="flex flex-col gap-6 text-sm" onSubmit={handleLogin} autoComplete="on">
        <div>
          <label htmlFor="id">이메일</label>
          <span className="ml-3 text-red">규칙에 맞는 이메일 주소를 입력해주세요.</span>
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
          <span className="ml-3 text-red">8자 이상 입력해주세요.</span>
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
            type="submit" className="text-white w-full rounded-xl bg-primary p-4 text-base mt-5"
          >
            {/* {status === 'loading' ? '로그인 중..' : '로그인하기'} */}
            로그인하기
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;

// disabled={status === 'loading'}
// aria-disabled={status === 'loading'}
