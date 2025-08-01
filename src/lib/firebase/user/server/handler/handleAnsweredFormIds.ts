// for entry - match formId with responded form ids (only login)

import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";

export const handleAnsweredFormIds = async (uid: string): Promise<string[]> => {
  const responsesSnap = await adminFirestore
    .collection("responses")
    .where("uid", "==", uid)
    .limit(3)
    .get();

  return responsesSnap.docs.map((doc) => doc.data().formId as string);
};
