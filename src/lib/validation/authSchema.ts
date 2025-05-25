import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력하세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 최대 20자까지 가능합니다." })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/, "영문자, 숫자, 특수문자를 포함해야 합니다."),
});

export const signUpSchema = signInSchema
  .extend({
    confirmPassword: z.string(),
    displayName: z
      .string()
      .min(2, "닉네임은 2자 이상이어야 합니다.")
      .max(10, "닉네임은 10자 이하여야 합니다.")
      .regex(/^[가-힣a-zA-Z0-9]+$/, "한글, 영문, 숫자만 입력 가능합니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
