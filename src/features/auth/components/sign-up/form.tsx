"use client";

import { INITIAL_ACTION_STATE } from "@/constants/states";
import { signUpAction } from "@/features/auth/actions/auth";
import { Button } from "@/features/shared/ui/button";
import { Input } from "@/features/shared/ui/input";
import { type SignUpInput, signUpSchema } from "@/lib/validation/authSchema";
import type { ActionState } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Form() {
  const router = useRouter();

  const [result, formAction, isPending] = useActionState<ActionState, FormData>(
    signUpAction,
    INITIAL_ACTION_STATE,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const onSubmit = async (data: SignUpInput) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (result.status === null) return;
    if (!result.status) toast(result.error ?? "회원가입에 실패했습니다.");
    else {
      router.push("/auth/sign-in");
      reset();
    }
  }, [result, router, reset]);

  return (
    <form
      className="subtitle flex flex-col gap-6"
      autoComplete="on"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="flex flex-col gap-6">
        <legend className="sr-only">회원가입 정보 입력</legend>
        <div>
          <label htmlFor="displayName">닉네임</label>
          {errors.displayName?.message && (
            <output htmlFor="displayName" className="ml-3 text-green-500">
              {errors.displayName.message}
            </output>
          )}
          <Input
            id="displayName"
            type="text"
            {...register("displayName")}
            placeholder="2~10자의 영문, 한글, 숫자"
            className="mt-2"
          />
        </div>

        <div>
          <label htmlFor="email">이메일</label>
          {errors.email?.message && (
            <output htmlFor="email" className="ml-3 text-green-500">
              {errors.email.message}
            </output>
          )}
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="이메일 주소를 입력해주세요."
            className="mt-2"
          />
        </div>

        <div>
          <label htmlFor="password">비밀번호</label>
          {errors.password?.message && (
            <output htmlFor="password" className="ml-3 text-green-500">
              {errors.password.message}
            </output>
          )}
          <div className="relative mt-2">
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="영문, 숫자, 특수문자 포함 8~20자"
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword">비밀번호 재확인</label>
          {errors.confirmPassword?.message && (
            <output htmlFor="confirmPassword" className="ml-3 text-green-500">
              {errors.confirmPassword.message}
            </output>
          )}
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="비밀번호를 다시 입력해주세요."
            className="mt-2"
          />
        </div>
      </fieldset>
      <div>
        <Button
          type="submit"
          disabled={!isValid}
          isPending={isPending}
          className="mt-5 w-full bg-green-400 text-white"
        >
          가입하기
        </Button>
      </div>
    </form>
  );
}
