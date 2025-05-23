// 해당 댓글의 uid에 맞는 nickname을 users doc에서 매칭함: client용

import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export const fetchUserNicknameClient = async (uid: string): Promise<string | null> => {
  try {
    const userDoc = doc(firestore, "users", uid);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      console.error("User not found:", uid);
      return null;
    }

    const userData = userSnapshot.data();
    return typeof userData.nickname === "string" ? userData.nickname : null;
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(`Firebase error while fetching nickname: ${err.code}`);
    } else {
      console.error("Error getting user nickname:", err);
    }
    return null;
  }
};
