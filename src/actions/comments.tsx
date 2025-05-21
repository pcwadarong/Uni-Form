"use server";

import { createComment } from "@/lib/firebase/form/create";
import { deleteComment } from "@/lib/firebase/form/delete";
import { revalidatePath } from "next/cache";

export async function createCommentsAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }> {
  const formId = formData.get("formId");
  const uid = formData.get("author");
  const content = formData.get("content");
  const createdAt = new Date().toISOString();

  if (typeof formId !== "string" || typeof uid !== "string" || typeof content !== "string")
    return { status: false, error: "입력값 오류" };

  const commentId = `${formId}-${crypto.randomUUID()}`;

  try {
    await createComment(commentId, formId, uid, content, createdAt);
    revalidatePath(`/entry/${formId}`);

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: `댓글 삭제 실패: ${err}`,
    };
  }
}

export async function deleteCommentsAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }> {
  const formId = formData.get("formId");
  const commentId = formData.get("commentId");

  if (typeof formId !== "string" || typeof commentId !== "string") {
    return { status: false, error: "입력값 오류" };
  }

  try {
    await deleteComment(commentId);
    revalidatePath(`/entry/${formId}`);

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: `댓글 삭제 실패: ${err}`,
    };
  }
}
