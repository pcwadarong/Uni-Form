import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Form } from "@/types/types";
import { FirebaseError } from "firebase/app";

export const handleDrafts = async (uid: string, lastDocId?: string): Promise<Form[]> => {
  const draftsSnap = await adminFirestore
    .collection("drafts")
    .where("uid", "==", uid)
    .limit(3)
    .get();

  return draftsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Form[];
};
