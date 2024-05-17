'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { SURVEY_CATEGORY, RECRUIT_CATEGORY } from '@/constants/category';

export default function Header() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
  const subMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = (category: string | null) => {
    setHoveredCategory(category);
    setIsSubMenuOpen(true);
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    subMenuTimeoutRef.current = setTimeout(() => {
      setIsSubMenuOpen(false);
    }, 500);
  };

  const getCategoryLinks = () => {
    if (hoveredCategory === 'survey') {
      return Object.entries(SURVEY_CATEGORY);
    } else if (hoveredCategory === 'recruit') {
      return Object.entries(RECRUIT_CATEGORY);
    }
    return [];
  };

  return (
    <nav className="w-screen flex flex-col items-center z-10 fixed backdrop-blur-sm">
      <div className="flex h-20 w-full px-8 2xl:w-[1400px] 2xl-px-0 items-center justify-between">
        <h1>
          <Image src={'./logo.svg'} alt="logo" width="52" height="34" priority={true} />
        </h1>
        <ul className="flex gap-8">
          <li
            className="hover:border-b-[0.1rem] border-primary"
            onMouseOver={() => handleMouseOver('survey')}
            onMouseLeave={handleMouseLeave}
          >
            설문조사
          </li>
          <li
            className="hover:border-b-[0.1rem] border-primary"
            onMouseOver={() => handleMouseOver('recruit')}
            onMouseLeave={handleMouseLeave}
          >
            모집공고
          </li>
        </ul>
        <div className="relative flex-auto max-w-96">
          <input
            className="w-full h-10 pl-2 pr-10 bg-dark/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            placeholder="관심있는 설문조사를 찾아보세요!"
          />
          <button className="absolute top-1/2 right-3 transform -translate-y-1/2 ">
            <SearchIcon />
          </button>
        </div>
        <ul className="flex gap-8 items-center">
          <li>
            <NotificationsNoneIcon />
          </li>
          <li>로그인</li>
          <li>회원가입</li>
        </ul>
      </div>
      {isSubMenuOpen && (
        <div
          className="pb-6"
          onMouseOver={() => handleMouseOver(hoveredCategory)}
          onMouseLeave={() => setIsSubMenuOpen(false)}
        >
          <ul className="flex w-full px-8 2xl:w-[1400px] gap-8 hover:text-font">
            {getCategoryLinks().map(([key, value]) => (
              <li key={key} className="hover:text-font">
                <Link href={hoveredCategory + value}>{key}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
