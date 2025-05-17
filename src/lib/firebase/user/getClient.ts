import type { User, UserField } from "@/types";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export const fetchUserDataClient = async (
  uid: string,
  fields: UserField = "all",
): Promise<User | string[] | string | null> => {
  try {
    const userDoc = doc(firestore, "users", uid);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      console.error("User not found:", uid);
      return null;
    }

    const userData = userSnapshot.data();

    switch (fields) {
      case "nickname":
        return userData.nickname;

      case "email":
        return userData.email;

      case "responses":
        return userData.responses;

      default:
        return userData as User;
    }
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(`Firebase error while fetching user: ${err.code}`);
    } else {
      console.error("Error getting user data:", err);
    }
    return null;
  }
};
