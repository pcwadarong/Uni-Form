"use server";

import { resetPasswordWithFirebase } from "@/lib/firebase/auth/resetPW";
import { signUp } from "@/lib/firebase/auth/sign-up";
import { signUpSchema } from "@/lib/validation/sign-schema";

export async function signUpAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }> {
  const email = formData.get("email");
  const displayName = formData.get("displayName");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (
    typeof email !== "string" ||
    typeof displayName !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return {
      status: false,
      error: "입력값이 올바르지 않습니다.",
    };
  }

  const validation = signUpSchema.safeParse({
    email,
    displayName,
    password,
    confirmPassword,
  });

  if (!validation.success) {
    const error = validation.error.flatten().fieldErrors;
    return {
      status: false,
      error:
        error.email?.[0] ||
        error.password?.[0] ||
        error.confirmPassword?.[0] ||
        error.displayName?.[0] ||
        "입력값을 다시 확인해주세요.",
    };
  }

  return await signUp(email, password, displayName);
}

export async function resetPWAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }> {
  const email = formData.get("email") as string;

  if (typeof email !== "string") {
    return {
      status: false,
      error: "입력값이 올바르지 않습니다.",
    };
  }

  return await resetPasswordWithFirebase(email);
}
