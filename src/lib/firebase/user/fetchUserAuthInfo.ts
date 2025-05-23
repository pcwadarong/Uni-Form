// firebase authentication 에서 기본 제공하는 user 데이터를 import

import { getAuth } from "firebase-admin/auth";
import { getServerUid } from "../auth/getServerUid";

export const fetchUserAuthInfo = async (uid?: string) => {
  try {
    const resolvedUid = uid || (await getServerUid());
    if (!resolvedUid) {
      console.error("로그인이 필요합니다.");
      return null;
    }

    const user = await getAuth().getUser(resolvedUid);

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.customClaims?.role ?? "user",
    };
  } catch (err) {
    console.error("Auth 유저 정보 가져오기 실패:", err);
    return null;
  }
};