import { useAuth } from "@/contexts/authProvider";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

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
