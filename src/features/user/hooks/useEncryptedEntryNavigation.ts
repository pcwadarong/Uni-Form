"use client";

import { encrypt } from "@/lib/utils/crypoto";
import { useRouter } from "next/navigation";

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
