'use client';

import Link from 'next/link';
import NavSearch from './navSearch';
import NavRight from './navRight';
import NavLeft from './navLeft';
import { useHover, getCategoryLinks } from '../../../hooks/useHover';

export default function Header() {
  const { hoveredCategory, isSubMenuOpen, handleMouseOver, handleMouseLeave } = useHover();

  return (
    <nav className="w-screen flex flex-col items-center z-10 fixed backdrop-blur-sm bg-white drop-shadow text-nowrap">
      <div className="flex h-20 w-full px-8 2xl:w-[1400px] 2xl:px-0 items-center justify-between">
        <NavLeft handleMouseOver={handleMouseOver} handleMouseLeave={handleMouseLeave} />
        <NavSearch />
        <NavRight />
      </div>
      {isSubMenuOpen && (
        <ul
          className="flex flex-grow w-full px-8 pb-6 gap-8 2xl:w-[1400px] 2xl:px-0 text-nowrap overflow-y-auto"
          onMouseOver={() => handleMouseOver(hoveredCategory)}
          onMouseLeave={handleMouseLeave}
        >
          {getCategoryLinks(hoveredCategory).map(([key, value]) => (
            <li key={key} className="hover:text-font subtitle">
              <Link href={`/${hoveredCategory}${value}`}>{key}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
