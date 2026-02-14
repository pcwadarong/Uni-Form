import type { Form } from "@/types";

/**
 * 폼 목록을 정렬 타입에 따라 정렬
 * @param items - 정렬할 폼 배열
 * @param sortType - 정렬 타입 ("random" | "point-asc" | "popular-asc" | "date-desc")
 * @returns 정렬된 폼 배열
 */
export const getSelectedItems = (items: Form[], sortType: string): Form[] => {
  return [...items].sort((a, b) => {
    switch (sortType) {
      case "random":
        return Math.random() - 0.5;

      case "point-asc": {
        const pointA = a.point ?? 0;
        const pointB = b.point ?? 0;
        return pointA - pointB;
      }

      case "popular-asc": {
        const responsesDiff = (b.responsesCount ?? 0) - (a.responsesCount ?? 0);
        if (responsesDiff !== 0) return responsesDiff;

        const commentsDiff = (b.commentsCount ?? 0) - (a.commentsCount ?? 0);
        if (commentsDiff !== 0) return commentsDiff;

        return (b.createdAt ?? 0) - (a.createdAt ?? 0);
      }

      case "date-desc":
        return (b.createdAt ?? 0) - (a.createdAt ?? 0);

      default:
        return 0;
    }
  });
};
