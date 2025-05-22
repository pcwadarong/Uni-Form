import { getServerUid } from "@/lib/firebase/user/getServerUid";
import type { User, UserField } from "@/types";
import { FirebaseError } from "firebase/app";
import { adminFirestore } from "../firebaseAdminConfig";

export const fetchUserDataServer = async (
  field: UserField = "all",
): Promise<User | string[] | string | null> => {
  try {
    const uid = await getServerUid();
    if (!uid) {
      console.error('로그인이 필요합니다.');
      return null;
    }

    const userRef = adminFirestore.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      console.error("User not found:", uid);
      return null;
    }

    const data = userSnap.data();
    if (field === "all") return { ...data, uid: userSnap.id } as User;

    return data?.[field] ?? null;
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(`Firebase error while fetching user: ${err.code}`);
    } else {
      console.error("Error getting user data:", err);
    }
    return null;
  }
};
