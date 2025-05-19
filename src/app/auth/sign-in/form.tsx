"use client";

import EmailIcon from "@/components/svg/email";
import PasswordIcon from "@/components/svg/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { handleLogin } from "@/lib/firebase/user/sign-in";
import { type SignInInput, signInSchema } from "@/lib/validation/sign-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Form = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: "all",
  });

  const onSubmit = async (data: SignInInput) => {
    const { email, password } = data;
    const success = await handleLogin("email", email, password);
    if (success) router.push("/");
    else console.error("Sign in failed");
  };

  const handleGoogleLogin = async () => {
    const success = await handleLogin("google");
    if (success) router.push("/");
    else console.error("Google sign in failed");
  };

  return (
    <div>
      <form
        className="flex flex-col gap-6 subtitle"
        autoComplete="on"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="email">이메일</label>
          <span className="ml-3 text-green-500">{errors.email?.message}</span>
          <div className="relative mt-2">
            <EmailIcon className="absolute top-3 left-3" />
            <Input
              id="email"
              type="email"
              {...register("email")}
              required
              autoComplete="email"
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password">비밀번호</label>
          <span className="ml-3 text-green-500">{errors.password?.message}</span>
          <div className="relative mt-2">
            <PasswordIcon className="absolute top-3 left-3" />
            <Input
              id="password"
              type="password"
              {...register("password")}
              required
              autoComplete="password"
              className="pl-10"
            />
          </div>
        </div>
        <Button type="submit" disabled={!isValid} className="text-white w-full bg-green-400 mt-5">
          가입하기
        </Button>
      </form>

      <div className="mt-6 flex justify-center relative">
        <button
          type="submit"
          onClick={handleGoogleLogin}
          className="flex items-center gap-2 py-3 w-full justify-center px-4 border-[1px] rounded-full border-gray-4"
        >
          <Image src={"/google.svg"} alt="icon" width="20" height="20" priority={true} />
          <span>Google로 계속하기</span>
        </button>
      </div>
    </div>
  );
};

export default Form;
