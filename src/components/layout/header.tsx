'use client';

//import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Header() {
  const pathname = usePathname();
  //const { status } = useSession();

  return (
    <nav className="flex">
      <h1>
        <Image src={'./logo.svg'} alt="logo" width="52" height="34" priority={true} />
      </h1>
      <ul>
        <li>설문조사</li>
        <li>모집공고</li>
      </ul>
      <div className="bg-black">
        <input type="text" placeholder="search..." />
        <SearchIcon />
      </div>
      <ul>
        <li>
          <NotificationsNoneIcon />
        </li>
        <li>로그인</li>
        <li>회원가입</li>
      </ul>
    </nav>
  );
}
