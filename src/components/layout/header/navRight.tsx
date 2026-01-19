import FormIcon from "@/components/svg/form";
import HamburgerIcon from "@/components/svg/hamburger";
import { useAuth } from "@/contexts/authProvider";
import useHandleLogout from "@/hooks/useHandleLogout";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./navMdRight";
import NavSmRight from "./navSmRight";

export default function NavRight() {
  const [isOpened, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const handleLogout = useHandleLogout();

  const toggleCategory = () => {
    setOpen(!isOpened);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-8 justify-self-end">
        {loading ? (
          <span className="text-gray-500 text-sm">로딩 중...</span>
        ) : user ? (
          <>
            <Link className="hidden md:inline" href="/form">
              <FormIcon />
            </Link>
            <Link className="hidden md:inline" href="/user">
              내 정보
            </Link>
            <button type="button" className="hidden md:inline" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link className="hidden md:inline" href="/auth/sign-in">
              로그인
            </Link>
            <Link className="hidden md:inline" href="/auth/sign-up">
              회원가입
            </Link>
          </>
        )}
      </div>

      <UserMenu />

      <div className="flex sm:hidden">
        <button type="button" onClick={toggleCategory}>
          <HamburgerIcon />
        </button>
        <NavSmRight isOpened={isOpened} toggleCategory={toggleCategory} closeMenu={closeMenu} />
      </div>
    </>
  );
}
