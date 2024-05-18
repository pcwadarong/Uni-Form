import Link from 'next/link';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import MobileMenu from './mobileMenu';

export default function NavRight() {
  const [isOpened, setOpen] = useState(false);
  const toggleCategory = () => {
    setOpen(!isOpened);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="flex gap-4 md:gap-8 items-center justify-end">
      <Link href="/account/notification">
        <NotificationsNoneIcon />
      </Link>
      <Link className="hidden md:inline" href="/sign-in">
        로그인
      </Link>
      <Link className="hidden md:inline" href="/sign-up">
        회원가입
      </Link>
      <Link className="hidden sm:inline md:hidden" href="/sign-in">
        <PermIdentityIcon />
      </Link>
      <div className="sm:hidden">
        <button onClick={toggleCategory}>
          <MenuIcon />
        </button>
        <MobileMenu isOpened={isOpened} toggleCategory={toggleCategory} closeMenu={closeMenu} />
      </div>
    </div>
  );
}
