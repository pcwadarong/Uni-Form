"use client";

import { encrypt } from "@/lib/utils/crypoto";
import { useRouter } from "next/navigation";

/**
 * 암호화된 엔트리 네비게이션 훅
 * ID를 암호화하여 엔트리 페이지로 이동
 * @returns 네비게이션 함수 및 키보드 핸들러
 */
export function useEncryptedEntryNavigation() {
  const router = useRouter();

  const navigate = async (itemId: string) => {
    const encryptedId = await encrypt(itemId, process.env.NEXT_PUBLIC_CRYPT_SECRET || "");
    router.push(`/entry/${encryptedId}`);
  };

  const handleKeyDown = (itemId: string) => (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(itemId);
    }
  };

  return { navigate, handleKeyDown };
}
