/**
 * 사용자 관련 타입 정의
 */

import type { Form } from "@/features/survey/types";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

/**
 * 사용자 정보 타입
 */
export interface User {
  uid: string;
  displayName?: string;
  school?: {
    university?: string;
    major?: string;
    grade?: string;
  };
  gender?: string;
  age?: number;
  region?: string;
  bookmarks?: string[];
}

/**
 * 사용자 필드 타입
 */
export type UserField =
  | "all"
  | "profile"
  | "createdForms"
  | "participation"
  | "myForms"
  | "drafts"
  | "answeredFormIds";

/**
 * 사용자 프로필 필드 타입
 */
export type UserProfileFields = Pick<User, "uid" | "school" | "gender" | "age" | "region">;

/**
 * 사용자 인증 정보 타입
 */
export interface UserAuth {
  displayName?: string;
  photoURL?: string;
  email?: string;
  providerId: string | null;
  role: string;
}

/**
 * 사용자 참여 필드 타입
 */
export type UserParticipationFields = {
  bookmarks: Form[];
  responses: Form[];
};

/**
 * 사용자 활동 필드 타입
 */
export type UserActivityFields = {
  createdForms: Form[];
  drafts: Form[];
};

/**
 * 사용자 필드 맵 타입
 */
export type UserFieldMap = Record<
  Exclude<UserField, "all">,
  string[] | UserProfileFields | UserParticipationFields | UserActivityFields
>;

/**
 * 폼 필드 Props 타입
 */
export interface FormFieldProps extends UseFormRegisterReturn {
  label: string;
  error?: FieldError;
  isPending?: boolean;
}
