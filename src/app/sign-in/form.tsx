'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';

const Form: React.FC = () => {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // useEffect(() => {
  //   if (status == 'success') router.push('/');
  // }, [status]);

  return (
    <>
      {/* <p role="alert" aria-live="assertive" className="text-sm text-red-600 mb-4">
        {status === 'error' ? errorMessage : ''}
      </p> */}
      <form
        className="flex flex-col gap-6 text-sm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        autoComplete="on"
      >
        <div>
          <label htmlFor="id">이메일</label>
          <span className="ml-3 text-red">규칙에 맞는 이메일 주소를 입력해주세요.</span>
          <div className="relative mt-2">
            <MailOutlineIcon className="absolute top-2.5 left-3 text-gray-3" />
            <input
              id="id"
              name="id"
              type="text"
              value={id}
              required
              autoComplete="username"
              onChange={(e) => setId(e.target.value)}
              className="w-full p-3 pl-12 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email">비밀번호</label>
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
            type="submit"
            className="text-white w-full rounded-xl bg-primary p-4 text-base mt-5"
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
