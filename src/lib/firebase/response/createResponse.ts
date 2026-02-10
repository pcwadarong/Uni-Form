import type { Answer } from "@/types";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminFirestore } from "../firebaseAdminConfig";

/**
 * 응답 문서를 생성하고 폼 응답 수를 증가시킨다.
 * WriteBatch로 set과 update를 원자적으로 수행한다.
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
  try {
    const batch = adminFirestore.batch();
    const responseRef = adminFirestore.collection("responses").doc(responseId);
    const formRef = adminFirestore.collection("forms").doc(formId);

    batch.set(responseRef, {
      formId,
      uid,
      content,
      createdAt: Timestamp.now(),
    });

    batch.update(formRef, {
      responsesCount: FieldValue.increment(1),
    });

    await batch.commit();
    return { status: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create response ${responseId} for form ${formId}: ${message}`);
  }
};
