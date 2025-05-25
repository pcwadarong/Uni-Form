import { GENDER_OPTIONS, GRADE_OPTIONS, REGION_OPTIONS } from "@/constants/userProfile";
import { z } from "zod";

export const profileUpdateSchema = z.object({
  university: z
    .string()
    .optional()
    .refine((value) => !value || /(대학교|대학원)$/.test(value), {
      message: "학교명은 '대학교' 또는 '대학원'으로 끝나야 합니다.",
    }),

  major: z
    .string()
    .optional()
    .refine((value) => !value || /(과$|부$)|^[a-zA-Z ]+$/.test(value), {
      message: "학과명은 '과', '부'로 끝나거나 영문이어야 합니다.",
    }),

  age: z
    .string()
    .optional()
    .refine((value) => !value || /^[0-9]{1,2}$/.test(value), {
      message: "숫자만 입력해주세요. (최대 두 자리)",
    }),

  grade: z.enum(GRADE_OPTIONS, { invalid_type_error: "학년을 선택해주세요." }).optional(),
  gender: z.enum(GENDER_OPTIONS, { invalid_type_error: "성별을 선택해주세요." }).optional(),
  region: z.enum(REGION_OPTIONS, { invalid_type_error: "거주지역을 선택해주세요." }).optional(),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

export const displayNameSchema = z
  .string()
  .min(2, "닉네임은 2자 이상이어야 합니다.")
  .max(6, "닉네임은 6자 이하여야 합니다.")
  .regex(/^[가-힣a-zA-Z0-9]+$/, "한글, 영문, 숫자만 입력 가능합니다.");
