'use client';

import Link from 'next/link';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useHover, getCategoryLinks } from '../../utils/HeaderUtils';

export default function Header() {
  const { hoveredCategory, isSubMenuOpen, handleMouseOver, handleMouseLeave } = useHover();

  return (
    <nav className="w-screen flex flex-col items-center z-10 fixed backdrop-blur-sm bg-white drop-shadow">
      <div className="flex h-20 w-full px-8 2xl:w-[1400px] 2xl:px-0 items-center justify-between">
        <ul className="flex gap-8 items-center">
          <h1>
            <Link href="/">
              <Image src={'./logo.svg'} alt="logo" width="52" height="34" priority={true} />
            </Link>
          </h1>
          <li
            className="hover:underline underline-offset-8 decoration-primary"
            onMouseOver={() => handleMouseOver('survey')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/survey">설문조사</Link>
          </li>
          <li
            className="hover:underline underline-offset-8 decoration-primary"
            onMouseOver={() => handleMouseOver('recruit')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/recruit">모집공고</Link>
          </li>
        </ul>
        <div className="relative flex-auto max-w-96">
          <input
            className="w-full h-10 pl-2 pr-10 bg-dark/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            placeholder="관심있는 설문조사를 찾아보세요!"
          />
          <button className="absolute top-1/2 right-3 transform -translate-y-1/2">
            <SearchIcon className="text-primary" />
          </button>
        </div>
        <ul className="flex gap-8 items-center">
          <li>
            <Link href="/account/notification">
              <NotificationsNoneIcon />
            </Link>
          </li>
          <li>
            <Link href="/sign-in">로그인</Link>
          </li>
          <li>
            <Link href="/sign-up">회원가입</Link>
          </li>
        </ul>
      </div>
      {isSubMenuOpen && (
        <ul
          className="flex flex-grow w-full px-8 pb-6 gap-8 2xl:w-[1400px] 2xl:px-0"
          onMouseOver={() => handleMouseOver(hoveredCategory)}
          onMouseLeave={handleMouseLeave}
        >
          {getCategoryLinks(hoveredCategory).map(([key, value]) => (
            <li key={key} className="hover:text-font">
              <Link href={`${hoveredCategory}/${value}`}>{key}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
