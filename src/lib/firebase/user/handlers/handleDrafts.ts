import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Form } from "@/types/types";

export const handleDrafts = async (uid: string): Promise<Form[]> => {
  const draftsSnap = await adminFirestore.collection("drafts").where("uid", "==", uid).get();

  return draftsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Form[];
};
