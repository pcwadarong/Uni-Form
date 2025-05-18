"use client";

import UserIcon from "@/components/svg/user";
import useAuth from "@/hooks/useAuth";
import useHandleLogout from "@/hooks/useHandleLogout";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const UserMenu = () => {
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleLogout = useHandleLogout();

  const handleClickOutside = useCallback((event: MouseEvent) => {
  if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
    setShowUserMenu(false);
  }
}, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative hidden sm:flex md:hidden" ref={menuRef}>
      <button type="button" onClick={() => setShowUserMenu((prev) => !prev)}>
        <UserIcon />
      </button>

      {showUserMenu && (
        <div className="absolute right-0 top-8 flex flex-col text-center rounded-lg overflow-hidden shadow-md bg-muted caption drop-shadow">
          {user ? (
            <>
              <Link href="/user" className="px-4 py-2">
                내 정보
              </Link>
              <button type="button" className="px-4 py-2" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in" className="px-4 py-2">
                로그인
              </Link>
              <Link href="/auth/sign-up" className="px-4 py-2">
                회원가입
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
