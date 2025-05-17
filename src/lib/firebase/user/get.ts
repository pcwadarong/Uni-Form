import type { User } from "@/types";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { adminFirestore } from "../firebaseAdminConfig";
import { firestore } from "../firebaseConfig";

type UserField = "all" | "nickname" | "email" | "responses" | "comments" | "draft";

export const fetchUserDataServer = async (
  uid: string,
  field: UserField = "all",
): Promise<User | string[] | string | null> => {
  try {
    const userRef = adminFirestore.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      console.error("User not found:", uid);
      return null;
    }

    const data = userSnap.data();
    if (field === "all") return { ...data, id: userSnap.id } as User;

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
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};
