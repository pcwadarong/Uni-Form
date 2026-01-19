import { redirect } from "next/navigation";

/**
 * 사용자 페이지 리다이렉트 컴포넌트
 * /user/profile로 리다이렉트
 */
export default function RedirectToProfile() {
  redirect("/user/profile");
}
