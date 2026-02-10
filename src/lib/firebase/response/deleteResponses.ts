import { FieldValue } from "firebase-admin/firestore";
import { adminFirestore } from "../firebaseAdminConfig";

/**
 * 응답을 삭제하고 폼 응답 수를 감소시킨다.
 * @param responseId - 응답 문서 ID
 */
export const deleteResponse = async (responseId: string) => {
  const responseRef = adminFirestore.collection("responses").doc(responseId);
  const responseSnap = await responseRef.get();

  if (!responseSnap.exists) {
    return { status: false, error: "응답을 찾을 수 없습니다." };
  }

  const responseData = responseSnap.data();
  await responseRef.delete();

  if (responseData?.formId) {
    await adminFirestore
      .collection("forms")
      .doc(responseData.formId)
      .update({ responsesCount: FieldValue.increment(-1) });
  }

  return { status: true };
};
