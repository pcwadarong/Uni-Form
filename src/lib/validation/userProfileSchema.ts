import { GENDER_OPTIONS, GRADE_OPTIONS, REGION_OPTIONS } from "@/constants/userProfile";
import { z } from "zod";

export const profileUpdateSchema = z.object({
  displayName: z
    .string()
    .min(2, "닉네임은 2자 이상이어야 합니다.")
    .max(6, "닉네임은 6자 이하여야 합니다.")
    .regex(/^[가-힣a-zA-Z0-9]+$/, "한글, 영문, 숫자만 입력 가능합니다."),

  university: z
    .string()
    .min(1, "대학교를 입력해주세요.")
    .regex(/(대학교|대학원)$/, "학교명은 '대학교' 또는 '대학원'으로 끝나야 합니다."),

  major: z
    .string()
    .min(1, "학과를 입력해주세요.")
    .regex(/(과$|부$)|^[a-zA-Z ]+$/, "학과명은 '과', '부'로 끝나거나 영문이어야 합니다."),

  grade: z.enum(GRADE_OPTIONS, {
    required_error: "학년을 선택해주세요.",
  }),

  gender: z.enum(GENDER_OPTIONS, {
    required_error: "성별을 선택해주세요.",
  }),

  region: z.enum(REGION_OPTIONS, {
    required_error: "거주지역을 선택해주세요.",
  }),

  age: z
    .string()
    .min(1, "연령을 입력해주세요.")
    .regex(/^[0-9]{1,2}$/, "숫자만 입력해주세요. (최대 두 자리)"),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
