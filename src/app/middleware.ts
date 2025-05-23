import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  const protectedPaths = ["/user", "/user/profile", "/user/created", "/user/participation", "/user/activity"];
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  
  if (!isProtected) return NextResponse.next(); // protectedPaths x -> passed
  if (!token) return NextResponse.redirect(new URL("/auth/sign-in", request.url));

  try {
    await adminAuth.verifyIdToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
}
