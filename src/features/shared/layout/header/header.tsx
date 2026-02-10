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

/**
 * 호버된 카테고리에 해당하는 카테고리 링크 목록 반환
 * @param hoveredCategory - 현재 호버 중인 카테고리 ("survey" | "recruit" | null)
 * @returns 카테고리 링크 배열 [키, 값] 형태
 */
function getCategoryLinks(hoveredCategory: string | null) {
  return hoveredCategory === "survey"
    ? Object.entries(SURVEY_CATEGORY)
    : hoveredCategory === "recruit"
      ? Object.entries(RECRUIT_CATEGORY)
      : [];
}

/**
 * 전역 헤더 컴포넌트
 * 네비게이션 메뉴, 검색, 사용자 메뉴를 제공
 * 미리보기 모드에서는 종료 버튼을 표시
 */
export default function Header() {
  const { hoveredCategory, isSubMenuOpen, handleMouseOver, handleMouseLeave } = useHover();
  const pathName = usePathname();

  const quitPreview = () => {
    window.close();
    localStorage.removeItem("survey 1");
  };

  if (pathName.includes("preview")) {
    return (
      <header className="fixed z-10 flex w-screen flex-col items-center text-nowrap bg-surface drop-shadow backdrop-blur-sm">
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
      </header>
    );
  }

  return (
    <header className="fixed z-10 flex w-screen flex-col items-center text-nowrap bg-surface drop-shadow backdrop-blur-sm dark:bg-muted">
      <nav
        className="flex h-20 w-full items-center justify-between gap-2 px-8 md:grid md:grid-cols-3 md:gap-8 2xl:w-350 2xl:px-0"
        aria-label="주요 메뉴"
      >
        <NavLeft handleMouseOver={handleMouseOver} handleMouseLeave={handleMouseLeave} />
        <NavSearch />
        <NavRight />
      </nav>
      {isSubMenuOpen && (
        <menu
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
        </menu>
      )}
    </header>
  );
}
