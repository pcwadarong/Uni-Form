import { useRef, useState } from "react";

/**
 * 호버 상태 관리 훅
 * 서브메뉴 호버 및 자동 닫기 기능 제공
 * @returns 호버된 카테고리, 서브메뉴 열림 상태, 핸들러 함수들
 */
export function useHover() {
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

  return { hoveredCategory, isSubMenuOpen, handleMouseOver, handleMouseLeave };
}
