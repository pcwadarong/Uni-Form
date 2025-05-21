import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { adminFirestore } from "../firebaseAdminConfig";
import { auth } from "../firebaseConfig";

export const signUp = async (email: string, password: string, nickname: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await adminFirestore.collection("users").doc(user.uid).set({
      nickname,
      email,
      role: "user",
      createdSurveys: [],
      responses: [],
      comments: [],
    });

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return { status: false, error: `서버 회원가입 오류: ${err.code}` };
    }
    return {
      status: false,
      error: `회원가입 실패: ${(err as Error).message}`,
    };
  }
};

export const resetPasswordWithFirebase = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { status: true, error: "" };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return {
        status: false,
        error: `서버 비밀번호 재설정 오류: ${err.code}`,
      };
    }
    return {
      status: false,
      error: `비밀번호 재설정 실패: ${(err as Error).message}`,
    };
  }
};
