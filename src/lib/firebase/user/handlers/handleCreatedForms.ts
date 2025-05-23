// my forms (isPublic)

import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Form } from "@/types/types";

export const handleCreatedForms = async (uid: string): Promise<Form[]> => {
  const [surveysSnap, recruitsSnap] = await Promise.all([
    adminFirestore.collection("surveys").where("uid", "==", uid).get(),
    adminFirestore.collection("recruits").where("uid", "==", uid).get(),
  ]);

  return [
    ...surveysSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    ...recruitsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  ] as Form[];
};
