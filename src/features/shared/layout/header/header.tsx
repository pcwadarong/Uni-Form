"use client";

import { RECRUIT_CATEGORY, SURVEY_CATEGORY } from "@/constants/category";
import { useHover } from "@/features/shared/hooks/useHover";
import SVGIcon from "@/features/shared/icons/icons";
import { Button } from "@/features/shared/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLeft from "./navLeft";
import NavRight from "./navRight";
import NavSearch from "./navSearch";

function getCategoryLinks(hoveredCategory: string | null) {
  return hoveredCategory === "survey"
    ? Object.entries(SURVEY_CATEGORY)
    : hoveredCategory === "recruit"
      ? Object.entries(RECRUIT_CATEGORY)
      : [];
}

export default function Header() {
  const { hoveredCategory, isSubMenuOpen, handleMouseOver, handleMouseLeave } = useHover();
  const pathName = usePathname();

  const quitPreview = () => {
    window.close();
    localStorage.removeItem("survey 1");
  };

  if (pathName.includes("preview")) {
    return (
      <nav className="fixed z-10 flex w-screen flex-col items-center text-nowrap bg-surface drop-shadow backdrop-blur-sm">
        <div className="flex h-20 w-full items-center justify-between px-8 2xl:w-350 2xl:px-0">
          <h1>
            <Link href="/">
              <SVGIcon name="BrandLogo" width={48} className="text-green-300" />
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
    <nav className="fixed z-10 flex w-screen flex-col items-center text-nowrap bg-surface drop-shadow backdrop-blur-sm dark:bg-muted">
      <div className="flex h-20 w-full items-center justify-between gap-2 px-8 md:grid md:grid-cols-3 md:gap-8 2xl:w-350 2xl:px-0">
        <NavLeft handleMouseOver={handleMouseOver} handleMouseLeave={handleMouseLeave} />
        <NavSearch />
        <NavRight />
      </div>
      {isSubMenuOpen && (
        <ul
          className="flex w-full flex-1 gap-8 overflow-y-auto text-nowrap px-8 pb-6 2xl:w-350 2xl:px-0"
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
