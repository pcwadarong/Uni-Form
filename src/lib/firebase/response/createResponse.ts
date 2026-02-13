import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Answer } from "@/types";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

/**
 * 응답 문서를 생성하고 폼 응답 수를 증가시킨다.
 * Transaction으로 "새 응답일 때만" responsesCount를 증가시킨다.
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
    const responseRef = adminFirestore.collection("responses").doc(responseId);
    const formRef = adminFirestore.collection("forms").doc(formId);

    const result = await adminFirestore.runTransaction(async (tx) => {
      const now = Timestamp.now();
      const existing = await tx.get(responseRef);
      const isNewResponse = !existing.exists;

      if (isNewResponse) {
        tx.set(responseRef, {
          formId,
          uid,
          content,
          createdAt: now,
        });

        tx.update(formRef, {
          responsesCount: FieldValue.increment(1),
        });
      } else {
        const existingUid = existing.get("uid") as string | undefined;
        if (existingUid && existingUid !== uid) {
          // responseId가 formId-uid 형태로 만들어진 전제라면 이 케이스는 비정상.
          throw new Error("Response document already exists with a different uid");
        }

        // 기존 응답을 덮어쓰되, createdAt은 유지하고 카운트는 올리지 않는다.
        tx.update(responseRef, {
          content,
          updatedAt: now,
        });
      }

      return { status: true, isNewResponse };
    });

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create response ${responseId} for form ${formId}: ${message}`);
  }
};
