import { RECRUIT_CATEGORY, SURVEY_CATEGORY } from "@/constants/category";
import { useRef, useState } from "react";

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

export function getCategoryLinks(hoveredCategory: string | null) {
  return hoveredCategory === "survey"
    ? Object.entries(SURVEY_CATEGORY)
    : hoveredCategory === "recruit"
      ? Object.entries(RECRUIT_CATEGORY)
      : [];
}
