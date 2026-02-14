import { useAuth } from "@/features/auth/contexts/authProvider";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * 로그아웃 핸들러 훅
 * 클라이언트 및 서버 세션 정리 후 홈으로 리다이렉트
 * @returns 로그아웃 핸들러 함수
 */
const useHandleLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await logout();
    await fetch("api/logout", { method: "POST" });
    router.push("/");
  }, [logout, router]);

  return handleLogout;
};

export default useHandleLogout;
