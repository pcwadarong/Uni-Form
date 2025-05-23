//analysis: responses 모아서 분석
import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Response } from "@/types/types";
import { FirebaseError } from "firebase/app";

export const fetchResponseListByFormId = async (id: string): Promise<Response[] | null> => {
  try {
    const snapshot = await adminFirestore.collection("responses").where("formId", "==", id).get();

    if (snapshot.empty) return [];

    const responses: Response[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        ...data,
        id: doc.id,
      } as Response;
    });

    return responses;
  } catch (err) {
    if (err instanceof FirebaseError) throw new Error(`Firebase loading error: ${err.code}`);

    throw err;
  }
};

// edit에서 사용
export const fetchResponseByFormId = async (
  formId: string,
  uid: string,
): Promise<Response | null> => {
  const snap = await adminFirestore
    .collection("responses")
    .where("formId", "==", formId)
    .where("uid", "==", uid)
    .limit(1)
    .get();

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as Response;
};