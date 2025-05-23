import { getFirebaseErrorMessage } from "@/lib/firebase/errorMessages";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { adminFirestore } from "../firebaseAdminConfig";
import { auth } from "../firebaseConfig";

export const signUp = async (email: string, password: string, nickname: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await adminFirestore
      .collection("users")
      .doc(user.uid)
      .set({
        nickname,
        bookmarks: [],
        school: {
          university: "",
          major: "",
          grade: "",
        },
        gender: "",
        age: null,
        region: "",
      });

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return { status: false, error: getFirebaseErrorMessage(err.code) };
    }
    return {
      status: false,
      error: `회원가입 실패: ${(err as Error).message}`,
    };
  }
};

