"use client";

import BrandLogo from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategoryLinks, useHover } from "../../../hooks/useHover";
import NavLeft from "./navLeft";
import NavRight from "./navRight";
import NavSearch from "./navSearch";

export default function Header() {
  const { hoveredCategory, isSubMenuOpen, handleMouseOver, handleMouseLeave } = useHover();
  const pathName = usePathname();

  const quitPreview = () => {
    window.close();
    localStorage.removeItem("survey 1");
  };

  if (pathName.includes("preview")) {
    return (
      <nav className="w-screen flex flex-col items-center z-10 fixed backdrop-blur-sm bg-surface drop-shadow text-nowrap">
        <div className="flex h-20 w-full px-8 2xl:w-[1400px] 2xl:px-0 items-center justify-between">
          <h1>
            <Link href="/">
              <BrandLogo width={48} />
            </Link>
          </h1>
          <Button onClick={quitPreview} className="bg-green-400 text-white">
            미리보기 종료
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-screen flex flex-col items-center z-10 fixed backdrop-blur-sm bg-surface dark:bg-muted drop-shadow text-nowrap">
      <div className="flex md:grid md:grid-cols-3 h-20 w-full px-8 2xl:w-[1400px] 2xl:px-0 items-center justify-between gap-2 md:gap-8">
        <NavLeft handleMouseOver={handleMouseOver} handleMouseLeave={handleMouseLeave} />
        <NavSearch />
        <NavRight />
      </div>
      {isSubMenuOpen && (
        <ul
          className="flex flex-grow w-full px-8 pb-6 gap-8 2xl:w-[1400px] 2xl:px-0 text-nowrap overflow-y-auto"
          onMouseOver={() => handleMouseOver(hoveredCategory)}
          onFocus={() => handleMouseOver(hoveredCategory)}
          onMouseLeave={handleMouseLeave}
          onBlur={handleMouseLeave}
        >
          {getCategoryLinks(hoveredCategory).map(([key, value]) => (
            <li key={key} className="hover:text-green-400 subtitle">
              <Link href={`/${hoveredCategory}${value}`}>{key}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
