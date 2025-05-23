import type { Form } from "@/types/types";

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
