import { getAuth } from "firebase-admin/auth";

export const fetchUserDisplayNameServer = async (uid: string): Promise<string | null> => {
  try {
    const user = await getAuth().getUser(uid);
    return user.displayName ?? null;
  } catch (err) {
    console.error("댓글 작성자 닉네임 조회 실패:", err);
    return null;
  }
};
