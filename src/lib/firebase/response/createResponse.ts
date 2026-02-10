import type { Answer } from "@/types";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminFirestore } from "../firebaseAdminConfig";

/**
 * 응답 문서를 생성하고 폼 응답 수를 증가시킨다.
 * @param responseId - 응답 문서 ID
 * @param formId - 대상 폼 ID
 * @param uid - 응답자 UID
 * @param content - 응답 내용
 */
export const createResponse = async (
  responseId: string,
  formId: string,
  uid: string,
  content: Answer[],
) => {
  await adminFirestore.collection("responses").doc(responseId).set({
    formId,
    uid,
    content,
    createdAt: Timestamp.now(),
  });

  await adminFirestore
    .collection("forms")
    .doc(formId)
    .update({
      responsesCount: FieldValue.increment(1),
    });

  return { status: true };
};
