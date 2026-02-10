// my forms (isPublic)

import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import { type RawFormData, mapRawToForm } from "@/lib/utils/mapRawToForm";
import type { Form } from "@/types";

/**
 * 사용자가 생성한 폼 목록을 조회한다.
 * @param uid - 사용자 UID
 * @returns 생성한 폼 목록
 */
export const handleCreatedForms = async (uid: string): Promise<Form[]> => {
  const formsSnap = await adminFirestore
    .collection("forms")
    .where("uid", "==", uid)
    .orderBy("createdAt", "desc")
    .limit(6)
    .get();

  return formsSnap.docs.map((doc) => mapRawToForm(doc.data() as RawFormData, doc.id));
};
