import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminFirestore } from "../firebaseAdminConfig";

/**
 * 댓글을 생성하고 대상 폼의 댓글 수를 증가시킨다.
 * @param commentId - 댓글 문서 ID
 * @param formId - 대상 폼 ID
 * @param uid - 작성자 UID
 * @param content - 댓글 내용
 */
export async function createComment(
  commentId: string,
  formId: string,
  uid: string,
  content: string,
) {
  try {
    await adminFirestore.collection("comments").doc(commentId).set({
      content,
      createdAt: Timestamp.now(),
      formId,
      uid,
    });

    await adminFirestore
      .collection("forms")
      .doc(formId)
      .update({
        commentsCount: FieldValue.increment(1),
      });

    return { status: true };
  } catch (err) {
    throw new Error(`댓글 작성 실패: ${err instanceof Error ? err.message : String(err)}`);
  }
}
