import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    return new Response(JSON.stringify({ uid: decoded.uid }), { status: 200 });
  } catch (err) {
    return new Response("Invalid token", { status: 401 });
  }
}
