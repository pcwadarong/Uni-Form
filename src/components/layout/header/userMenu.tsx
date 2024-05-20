import Link from 'next/link';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useState, useEffect, useRef } from 'react';

interface Props {
  isAuthenticated: boolean;
}

const UserMenu = ({ isAuthenticated }: Props) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button>
        <PermIdentityIcon
          className="hidden sm:inline md:hidden"
          onClick={() => setShowUserMenu((prev) => !prev)}
        />
      </button>
      {showUserMenu && (
        <div className="absolute right-0 flex flex-col text-center rounded-lg overflow-hidden shadow-md bg-white">
          {isAuthenticated ? (
            <>
              <Link href="/user" className="px-4 py-3 w-full hover:bg-gray-2">
                내 정보
              </Link>
              <button className="px-4 py-3 hover:bg-gray-2">로그아웃</button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="px-4 py-3 w-full hover:bg-gray-2">
                로그인
              </Link>
              <Link href="/sign-up" className="px-4 py-3 hover:bg-gray-2">
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
