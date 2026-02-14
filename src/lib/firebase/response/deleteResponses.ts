import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import { FieldValue } from "firebase-admin/firestore";

/**
 * 응답을 삭제하고 폼 응답 수를 감소시킨다.
 * 트랜잭션으로 삭제와 카운트 감소를 원자적으로 수행한다.
 * @param responseId - 응답 문서 ID
 */
export const deleteResponse = async (responseId: string) => {
  const responseRef = adminFirestore.collection("responses").doc(responseId);

  try {
    const result = await adminFirestore.runTransaction(async (transaction) => {
      const responseSnap = await transaction.get(responseRef);

      if (!responseSnap.exists) {
        return { status: false as const, error: "응답을 찾을 수 없습니다." };
      }

      const responseData = responseSnap.data();
      const formId = responseData?.formId as string | undefined;

      transaction.delete(responseRef);

      if (formId) {
        const formRef = adminFirestore.collection("forms").doc(formId);
        transaction.update(formRef, {
          responsesCount: FieldValue.increment(-1),
        });
      }

      return { status: true as const };
    });

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      status: false,
      error: `응답 삭제 실패 (${responseId}): ${message}`,
    };
  }
};
