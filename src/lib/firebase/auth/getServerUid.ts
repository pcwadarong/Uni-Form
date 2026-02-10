import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";
import { cookies } from "next/headers";

/**
 * 서버에서 세션 쿠키로부터 사용자 UID 조회
 * @returns 사용자 UID 또는 null (인증되지 않은 경우)
 */
export async function getServerUid(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(token, true);
    return decoded.uid;
  } catch {
    return null;
  }
}
