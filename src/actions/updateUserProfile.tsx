"use server";

import { profileUpdateSchema } from "@/lib/validation/userProfileSchema";
import { getServerUid } from "@/lib/firebase/auth/getServerUid";
import { updateUserProfile } from "@/lib/firebase/user/updateUserProfile";

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
