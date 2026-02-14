import { getFirebaseErrorMessage } from "@/lib/firebase/errorMessages";
import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import { auth } from "@/lib/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    await adminFirestore
      .collection("users")
      .doc(user.uid)
      .set({
        displayName,
        bookmarks: [],
        school: {
          university: "",
          major: "",
          grade: "선택 안 함",
        },
        gender: "선택 안 함",
        age: null,
        region: "선택 안 함",
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
