import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";

export async function getServerUid(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}
