import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Next.js 미들웨어
 * 보호된 경로에 대한 인증 검사 수행
 * @param request - Next.js 요청 객체
 * @returns 인증된 사용자는 통과, 비인증 사용자는 로그인 페이지로 리다이렉트
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  const protectedPaths = [
    "/user",
    "/user/profile",
    "/user/created",
    "/user/participation",
    "/user/activity",
  ];
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
