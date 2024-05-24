import { useRef, useState } from 'react';
import { SURVEY_CATEGORY, RECRUIT_CATEGORY } from '@/constants/category';

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
  if (hoveredCategory === 'survey') {
    return Object.entries(SURVEY_CATEGORY);
  } else if (hoveredCategory === 'recruit') {
    return Object.entries(RECRUIT_CATEGORY);
  }
  return [];
}
