"use server";

import { getServerUid } from "@/lib/firebase/auth/getServerUid";
import { createComment } from "@/lib/firebase/comment/createComments";
import { deleteComment } from "@/lib/firebase/comment/deleteComments";
import { revalidatePath } from "next/cache";

export async function createCommentsAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }> {
  const formId = formData.get("formId");
  const content = formData.get("content");
  const createdAt = new Date().toISOString();

  if (typeof formId !== "string" || typeof content !== "string")
    return { status: false, error: "입력값 오류" };

  const uid = await getServerUid();
  if (!uid) return { status: false, error: "로그인이 필요합니다." };

  const commentId = `${formId}-${crypto.randomUUID()}`;

  try {
    await createComment(commentId, formId, uid, content);
    revalidatePath(`/entry/${formId}`);
    return { status: true };
  } catch (err) {
    return {
      status: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function deleteCommentsAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }> {
  const formId = formData.get("formId");
  const commentId = formData.get("commentId");

  if (typeof formId !== "string" || typeof commentId !== "string")
    return { status: false, error: "입력값 오류" };

  const uid = await getServerUid();
  if (!uid) return { status: false, error: "로그인이 필요합니다." };

  try {
    const result = await deleteComment(commentId, uid);
    if (!result.status) return { status: false, error: result.error };

    revalidatePath(`/entry/${formId}`);
    return { status: true };
  } catch (err) {
    return {
      status: false,
      error: `댓글 삭제 실패: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
