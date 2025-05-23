import { getServerUid } from "@/lib/firebase/user/getServerUid";
import type { User, UserField } from "@/types";
import { FirebaseError } from "firebase/app";
import { adminFirestore } from "../firebaseAdminConfig";

export const fetchUserDataServer = async (
  uid?: string,
  field: UserField = "all",
): Promise<User | string[] | string | null> => {
  try {
    const resolvedUid = uid || (await getServerUid());

    if (!resolvedUid) {
      console.error("로그인이 필요합니다.");
      return null;
    }

    const userRef = adminFirestore.collection("users").doc(resolvedUid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      console.error("사용자를 찾을 수 없습니다:", resolvedUid);
      return null;
    }

    const data = userSnap.data();
    if (!data) return null;

    return field === "all" ? ({ ...data, uid: userSnap.id } as User) : (data[field] ?? null);
  } catch (err) {
    if (err instanceof FirebaseError) console.error(`Firebase 에러: ${err.code}`);
    else console.error("사용자 데이터를 가져오는 중 오류 발생:", err);
    return null;
  }
};
