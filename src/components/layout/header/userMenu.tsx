import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import useHandleLogout from '@/hooks/useHandleLogout';
import { useAuthStore } from '@/store';
import Image from 'next/image';

const UserMenu = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const handleLogout = useHandleLogout();

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
    <div className="relative hidden sm:flex md:hidden " ref={menuRef}>
      <button onClick={() => setShowUserMenu((prev) => !prev)}>
        <Image src={'/user.svg'} alt="user" width="20" height="20" priority={true} />
      </button>
      {showUserMenu && (
        <div className="absolute right-0 flex flex-col text-center rounded-lg overflow-hidden shadow-md bg-white">
          {user ? (
            <>
              <Link href="/user" className="px-4 py-3 w-full hover:bg-gray-2">
                내 정보
              </Link>
              <button className="px-4 py-3 hover:bg-gray-2" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in" className="px-4 py-3 w-full hover:bg-gray-2">
                로그인
              </Link>
              <Link href="/auth/sign-up" className="px-4 py-3 hover:bg-gray-2">
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
