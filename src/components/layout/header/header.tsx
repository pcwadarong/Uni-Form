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
      <nav className="fixed z-10 flex w-screen flex-col items-center bg-surface backdrop-blur-sm drop-shadow text-nowrap">
        <div className="flex h-20 w-full items-center justify-between px-8 2xl:w-[1400px] 2xl:px-0">
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
    <nav className="fixed z-10 flex w-screen flex-col items-center bg-surface backdrop-blur-sm drop-shadow text-nowrap dark:bg-muted">
      <div className="flex h-20 w-full items-center justify-between gap-2 px-8 md:grid md:grid-cols-3 md:gap-8 2xl:w-[1400px] 2xl:px-0">
        <NavLeft handleMouseOver={handleMouseOver} handleMouseLeave={handleMouseLeave} />
        <NavSearch />
        <NavRight />
      </div>
      {isSubMenuOpen && (
        <ul
          className="flex w-full flex-1 gap-8 overflow-y-auto px-8 pb-6 text-nowrap 2xl:w-[1400px] 2xl:px-0"
          onMouseOver={() => handleMouseOver(hoveredCategory)}
          onFocus={() => handleMouseOver(hoveredCategory)}
          onMouseLeave={handleMouseLeave}
          onBlur={handleMouseLeave}
        >
          {getCategoryLinks(hoveredCategory).map(([key, value]) => (
            <li key={key} className="subtitle hover:text-green-400">
              <Link href={`/${hoveredCategory}?cat=${value}`}>{key}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
