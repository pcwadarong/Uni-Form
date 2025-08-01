import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { UserProfileFields } from "@/types/userType";

export const handleProfile = async (uid: string): Promise<UserProfileFields | null> => {
  const userRef = adminFirestore.collection("users").doc(uid);
  const userSnap = await userRef.get();
  if (!userSnap.exists) return null;

  const data = userSnap.data();
  if (!data) return null;

  return {
    school: data.school,
    gender: data.gender,
    age: data.age,
    region: data.region,
    uid: userSnap.id,
  };
};
