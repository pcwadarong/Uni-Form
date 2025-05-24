import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5일
    const sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn });

    const cookieStore = await cookies();
    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: expiresIn / 1000,
    });

    const decoded = await adminAuth.verifySessionCookie(sessionCookie);
    return new Response(JSON.stringify({ uid: decoded.uid }), { status: 200 });
  } catch (err) {
    return new Response("Invalid token", { status: 401 });
  }
}
