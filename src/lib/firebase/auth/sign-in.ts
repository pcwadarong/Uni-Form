import { auth, firestore } from "@/lib/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  type UserCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirebaseErrorMessage } from "../errorMessages";

const emailSignIn = async (
  email: string,
  password: string,
): Promise<{ status: boolean; credential?: UserCredential; error?: string }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { status: true, credential: userCredential };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { status: false, error: getFirebaseErrorMessage(error.code) };
    }
    return { status: false, error: "알 수 없는 오류가 발생했습니다." };
  }
};

const googleSignIn = async (): Promise<{
  status: boolean;
  credential?: UserCredential;
  error?: string;
}> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    let displayName = "uniform";
    if (user.displayName) {
      const displayNameMatch = user.displayName.match(/\(([^)]+)\)/);
      displayName = displayNameMatch ? displayNameMatch[1] : user.displayName;
    }

    await setDoc(
      doc(firestore, "users", user.uid),
      {
        displayName,
        bookmarks: [],
        school: { university: "", major: "", grade: "선택 안 함", },
        gender: "선택 안 함",
        age: null,
        region: "선택 안 함",
      },
      { merge: true },
    );

    return { status: true, credential: userCredential };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { status: false, error: getFirebaseErrorMessage(error.code) };
    }
    return { status: false, error: "구글 로그인 중 오류가 발생했습니다." };
  }
};

export const handleLogin = async (
  method: "email" | "google",
  email?: string,
  password?: string,
): Promise<{ status: boolean; error?: string }> => {
  let result: { status: boolean; credential?: UserCredential; error?: string };

  switch (method) {
    case "email":
      if (email && password) {
        result = await emailSignIn(email, password);
      } else {
        return { status: false, error: "이메일과 비밀번호가 필요합니다." };
      }
      break;

    case "google":
      result = await googleSignIn();
      break;

    default:
      return { status: false, error: "알 수 없는 로그인 방식입니다." };
  }

  if (!result.status || !result.credential) return { status: false, error: result.error };

  try {
    const token = await result.credential.user.getIdToken();
    await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    return { status: true };
  } catch (err) {
    return { status: false, error: "세션 설정에 실패했습니다." };
  }
};
