'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
          <label htmlFor="id">아이디</label>
          <span className="ml-3 text-red">규칙에 맞는 이메일 주소를 입력해주세요.</span>
          <div className="relative mt-2 flex w-full">
            <input
              id="id"
              name="id"
              type="text"
              value={id}
              required
              autoComplete="username"
              placeholder='6~10자의 영문, 숫자, 특수문자'
              onChange={(e) => setId(e.target.value)}
              className="flex-1 p-3 min-w-56 rounded-xl focus:outline-none"
            />
            <button className="text-white ml-3 rounded-xl bg-primary py-3 px-6 text-base">
              중복확인
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="email">비밀번호</label>
          <span className="ml-3 text-red">8자 이상 입력해주세요.</span>
          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              required
              autoComplete="password"
              placeholder='영문, 숫자, 특수문자 포함 8~20자'
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">비밀번호 재확인</label>
          <span className="ml-3 text-red">비밀번호가 일치하지 않습니다.</span>
          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              required
              autoComplete="password"
              placeholder='영문, 숫자, 특수문자 포함 8~20자'
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <span className="ml-3 text-red">error</span>
          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              required
              autoComplete="password"
              placeholder='이메일 주소'
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl focus:outline-none"
            />
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="text-white w-full rounded-xl bg-primary p-4 text-base mt-5"
          >
            {/* {status === 'loading' ? '로그인 중..' : '로그인하기'} */}
            회원가입하기
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;

// disabled={status === 'loading'}
// aria-disabled={status === 'loading'}
