import type { UserInfo } from "firebase-admin/auth";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import type { Comment, Form } from "./types";

export interface User {
  uid: string;
  displayName?: string;
  school?: {
    university: string;
    major: string;
    grade: string;
  };
  gender?: string;
  age?: number;
  region?: string;
  bookmarks: string[];
}

export type UserField =
  | "all"
  | "profile"
  | "createdForms"
  | "participation"
  | "activity"
  | "drafts"
  | "answeredFormIds";

export type UserProfileFields = Pick<User, "uid" | "school" | "gender" | "age" | "region">;

export interface UserAuth {
  displayName?: string;
  photoURL?: string;
  email?: string;
  providerId: string | null;
  role: string;
}

export type UserParticipationFields = {
  bookmarks: Form[];
  responses: Form[];
};
export type UserActivityFields = {
  createdForms: Form[];
  drafts: Form[];
  comments: Comment[];
};

export type UserFieldMap = Record<
  Exclude<UserField, "all">,
  string[] | UserProfileFields | UserParticipationFields | UserActivityFields
>;

export interface FormFieldProps extends UseFormRegisterReturn {
  label: string;
  error?: FieldError;
  isPending?: boolean;
}
