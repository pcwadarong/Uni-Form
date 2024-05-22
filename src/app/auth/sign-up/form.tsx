'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/firebase/auth/sign-up';
import { validateSignInput } from '@/utils/validateSignInput';

export default function Form() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [status, setStatus] = useState(false);

  const passwordsMatch = password === passwordConfirm;

  useEffect(() => {
    const isFormValid =
      validateSignInput('nickname', nickname) &&
      validateSignInput('password', password) &&
      passwordsMatch &&
      validateSignInput('email', email);
    setStatus(isFormValid);
  }, [nickname, password, passwordConfirm, email]);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await signUp(email, password, nickname);
    if (success) {
      router.push('/auth/sign-in');
    } else {
      console.error('Sign up failed');
    }
  };

  return (
    <>
      <form className="flex flex-col gap-6 text-sm" onSubmit={handleSignUp} autoComplete="on">
        <div>
          <label htmlFor="nickname">닉네임</label>
          <span className="ml-3 text-font">
            {validateSignInput('nickname', nickname) ? '' : '2~6자의 영문, 한글, 숫자로 입력해주세요.'}
          </span>
          <div className="relative mt-2 flex w-full">
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={nickname}
              required
              autoComplete="username"
              placeholder="2~6자의 영문, 한글, 숫자"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              className="w-full p-3 rounded-xl focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <span className="ml-3 text-red">
            {validateSignInput('password', password) || !password
              ? ''
              : '영문, 숫자, 특수문자 포함 8~20자로 입력해주세요.'}
          </span>
          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              required
              autoComplete="new-password"
              placeholder="영문, 숫자, 특수문자 포함 8~20자"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="passwordConfirm">비밀번호 재확인</label>
          <span className="ml-3 text-red">
            {passwordsMatch ? '' : '비밀번호가 일치하지 않습니다.'}
          </span>
          <div className="relative mt-2">
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={passwordConfirm}
              required
              autoComplete="new-password"
              placeholder="영문, 숫자, 특수문자 포함 8~20자"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full p-3 rounded-xl focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <span className="ml-3 text-red">
            {validateSignInput('email', email) || !email
              ? ''
              : '유효한 이메일 주소를 입력해주세요.'}
          </span>
          <div className="relative mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              required
              autoComplete="email"
              placeholder="이메일 주소를 입력해주세요."
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl focus:outline-none"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className={`text-white w-full rounded-xl bg-primary p-4 text-base mt-5 ${status ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!status}
          >
            회원가입하기
          </button>
        </div>
      </form>
    </>
  );
}
