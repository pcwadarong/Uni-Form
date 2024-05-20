'use client';
import Form from './form';

const SignUp: React.FC = () => {
  return (
    <>
      <h2 className="text-center text-2xl font-semibold mt-20">회원가입</h2>
      <div className="mt-10 w-96">
        <Form />
      </div>
    </>
  );
};

export default SignUp;
