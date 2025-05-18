import HamburgerIcon from "@/components/svg/hamburger";
import useAuth from "@/hooks/useAuth";
import useHandleLogout from "@/hooks/useHandleLogout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./navMdRight";
import NavSmRight from "./navSmRight";

export default function NavRight() {
  const [isOpened, setOpen] = useState(false);
  const { user } = useAuth();
  const handleLogout = useHandleLogout();

  const toggleCategory = () => {
    setOpen(!isOpened);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="flex gap-4">
      <div className="flex gap-4 md:gap-8 items-center justify-end">
        {user ? (
          <>
            <Link href="/user/notification">
              <Image src={"/notification.svg"} alt="알림" width="20" height="20" />
            </Link>
            <Link className="hidden sm:inline" href="/form">
              <Image src={"/file.svg"} alt="폼 페이지" width="20" height="20" />
            </Link>
            <Link className="hidden lg:inline" href="/user">
              내 정보
            </Link>
            <button type="button" className="hidden lg:inline" onClick={handleLogout}>
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
        <UserMenu />
      </div>

      <div className="sm:hidden flex">
        <button type="button" onClick={toggleCategory}>
          <HamburgerIcon />
        </button>
        <NavSmRight isOpened={isOpened} toggleCategory={toggleCategory} closeMenu={closeMenu} />
      </div>
    </div>
  );
}
