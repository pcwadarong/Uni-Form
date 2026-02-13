import { getFirebaseErrorMessage } from "@/lib/firebase/errorMessages";
import { firestore } from "@/lib/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  type User,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

export const withdrawUser = async (
  user: User | null,
  email: string,
  password: string,
): Promise<{ status: boolean; error: string }> => {
  if (!user) {
    return {
      status: false,
      error: "사용자 정보가 존재하지 않습니다.",
    };
  }

  try {
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);

    const userDocRef = doc(firestore, "users", user.uid);
    await deleteDoc(userDocRef);

    return { status: true, error: "" };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return {
        status: false,
        error: getFirebaseErrorMessage(err.code),
      };
    }

    return {
      status: false,
      error: `탈퇴 중 오류 발생: ${(err as Error).message}`,
    };
  }
};
