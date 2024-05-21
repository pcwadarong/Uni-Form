import Link from 'next/link';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import UserMenu from './userMenu';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import MobileMenu from './mobileMenu';

export default function NavRight() {
  const [isOpened, setOpen] = useState(false);
  const [authenticated, setAuthentication] = useState(false);

  const toggleCategory = () => {
    setOpen(!isOpened);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="flex gap-4">
      <div className="flex gap-4 md:gap-8 items-center justify-end">
        {authenticated ? (
          <>
            <Link href="/account/notification">
              <NotificationsNoneIcon />
            </Link>
            <Link className="hidden md:inline" href="/user">
              내 정보
            </Link>
            <button className="hidden md:inline">로그아웃</button>
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
        <UserMenu
          isAuthenticated={authenticated}
        />
      </div>

      <div className="sm:hidden">
        <button onClick={toggleCategory}>
          <MenuIcon />
        </button>
        <MobileMenu isOpened={isOpened} toggleCategory={toggleCategory} closeMenu={closeMenu} />
      </div>
    </div>
  );
}
