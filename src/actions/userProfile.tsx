"use server";

import { getServerUid } from "@/lib/firebase/auth/getServerUid";
import { updateDisplayName, updateUserProfile } from "@/lib/firebase/user/updateUserProfile";
import { displayNameSchema, profileUpdateSchema } from "@/lib/validation/userProfileSchema";

export async function updateUserProfileAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }> {
  const data = Object.fromEntries(formData.entries());
  const parsed = profileUpdateSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: "유효성 검사 실패",
      status: false,
    };
  }

  const uid = await getServerUid();
  if (!uid) return { status: false, error: "로그인이 필요합니다." };

  return await updateUserProfile(parsed.data, uid);
}

export async function updateDisplayNameAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }> {
  const displayName = formData.get("displayName")?.toString();
  const parsed = displayNameSchema.safeParse(displayName);
  if (!parsed.success)
    return {
      error: "조건에 맞춰 작성해주세요.",
      status: false,
    };

  const uid = await getServerUid();
  if (!uid) return { status: false, error: "로그인이 필요합니다." };

  return await updateDisplayName(parsed.data, uid);
}
