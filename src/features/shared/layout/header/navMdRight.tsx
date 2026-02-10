"use client";

import { useAuth } from "@/features/auth/contexts/authProvider";
import useHandleLogout from "@/features/auth/hooks/useHandleLogout";
import SVGIcon from "@/features/shared/icons/icons";
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
      <button
        type="button"
        onClick={() => setShowUserMenu((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={showUserMenu}
        aria-label="사용자 메뉴 열기"
      >
        <SVGIcon name="UserIcon" />
      </button>

      {showUserMenu && (
        <nav
          aria-label="사용자 드롭다운 메뉴"
          className="caption absolute top-8 right-0 rounded-lg bg-muted shadow-md drop-shadow"
        >
          <ul className="flex flex-col overflow-hidden text-center">
            {user ? (
              <>
                <li>
                  <Link href="/form" className="block px-4 py-2">
                    설문 만들기
                  </Link>
                </li>
                <li>
                  <Link href="/user" className="block px-4 py-2">
                    내 정보
                  </Link>
                </li>
                <li>
                  <button type="button" className="w-full px-4 py-2" onClick={handleLogout}>
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/sign-in" className="block px-4 py-2">
                    로그인
                  </Link>
                </li>
                <li>
                  <Link href="/auth/sign-up" className="block px-4 py-2">
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default UserMenu;
