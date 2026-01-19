import { getFirebaseErrorMessage } from "@/lib/firebase/errorMessages";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const resetPasswordWithFirebase = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { status: true, error: "" };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return { status: false, error: getFirebaseErrorMessage(err.code) };
    }
    return {
      status: false,
      error: `비밀번호 재설정 실패: ${(err as Error).message}`,
    };
  }
};
