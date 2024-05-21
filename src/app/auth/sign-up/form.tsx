'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase/firebasConfig';
import { signUp } from '@/firebase/auth/sign-up';
import { validateSignInput } from '@/utils/validateSignInput';

export default function Form() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [nicknameState, setNicknameState] = useState('');
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [status, setStatus] = useState(false);

  const confirmNickname = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nicknameQuery = query(collection(firestore, 'users'), where('nickname', '==', nickname));
    const nicknameSnapshot = await getDocs(nicknameQuery);

    if (!nicknameSnapshot.empty) {
      alert('이미 사용 중인 닉네임입니다.');
    } else {
      setNicknameState('사용 가능한 닉네임입니다.');
      setNicknameChecked(true);
    }
  };

  const passwordsMatch = password === passwordConfirm;

  useEffect(() => {
    const isFormValid =
      validateSignInput('nickname', nickname) &&
      nicknameChecked &&
      validateSignInput('password', password) &&
      passwordsMatch &&
      validateSignInput('email', email);
    setStatus(isFormValid);
  }, [nickname, nicknameChecked, password, passwordConfirm, email]);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await signUp(email, password, nickname);
    if (success) {
      router.push('/');
    } else {
      console.error('Sign up failed');
    }
  };

  return (
    <>
      <form className="flex flex-col gap-6 text-sm" onSubmit={handleSignUp} autoComplete="on">
        <div>
          <label htmlFor="nickname">닉네임</label>
          <span className="ml-3 text-font">{nicknameState}</span>
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
                setNicknameChecked(false);
              }}
              className="flex-1 p-3 min-w-56 rounded-xl focus:outline-none"
            />
            <button
              className={`text-white ml-3 rounded-xl bg-primary py-3 px-6 text-base ${
                validateSignInput('nickname', nickname) ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={confirmNickname}
              disabled={!validateSignInput('nickname', nickname)}
            >
              중복확인
            </button>
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
