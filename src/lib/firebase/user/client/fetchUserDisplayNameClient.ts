// 해당 댓글의 uid에 맞는 displayName을 users doc에서 매칭함: client용

import { toast } from "@/features/shared/ui/sonner";
import { firestore } from "@/lib/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";

export const fetchUserDisplayNameClient = async (uid: string): Promise<string | null> => {
  try {
    const userDoc = doc(firestore, "users", uid);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      return null;
    }

    const userData = userSnapshot.data();
    return typeof userData.displayName === "string" ? userData.displayName : null;
  } catch (err) {
    if (err instanceof FirebaseError) {
      toast.error(`작성자 정보 조회 실패: ${err.code}`);
    } else {
      toast.error("작성자 정보를 불러오지 못했습니다.");
    }
    return null;
  }
};
