import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminFirestore } from "../firebaseAdminConfig";

export async function createComment(
  commentId: string,
  formId: string,
  uid: string,
  content: string,
) {
  try {
    // 댓글 등록
    await adminFirestore.collection("comments").doc(commentId).set({
      content,
      createdAt: Timestamp.now(),
      formId,
      uid,
    });

    // 해당 survey의 댓글 수 증가
    await adminFirestore
      .collection("surveys")
      .doc(formId)
      .update({
        commentsCount: FieldValue.increment(1),
      });

    return { status: true };
  } catch (err) {
    throw new Error(`댓글 작성 실패: ${err instanceof Error ? err.message : String(err)}`);
  }
}
