import type { Form } from "@/types";
import parseDateString from "./parseDateString";

function parseId(id: string) {
  const [type, year, month, rest] = id.split("-");
  const day = rest.substring(0, 2);
  const date = new Date(`${year}-${month}-${day}`);
  return { type, date };
}

export const getSelectedItems = (items: Form[], sortType: string): Form[] => {
  return [...items].sort((a, b) => {
    const parsedA = parseId(a.id);
    const parsedB = parseId(b.id);

    switch (sortType) {
      case "random":
        return Math.random() - 0.5;

      case "point-asc": {
        if (parsedA.type === "survey" && parsedB.type === "survey") {
          const pointA = a.point ?? 0;
          const pointB = b.point ?? 0;
          return pointA - pointB;
        }
        return 0;
      }

      case "popular-asc": {
        if (parsedA.type === "survey" && parsedB.type === "survey") {
          const responsesDiff = (b.responsesCount ?? 0) - (a.responsesCount ?? 0);
          if (responsesDiff !== 0) return responsesDiff;

          const commentsDiff = (b.commentsCount ?? 0) - (a.commentsCount ?? 0);
          if (commentsDiff !== 0) return commentsDiff;

          return parsedB.date.getTime() - parsedA.date.getTime();
        }
        return 0;
      }

      case "date-desc":
        return parsedB.date.getTime() - parsedA.date.getTime();

      default:
        return 0;
    }
  });
};

export const onChangeSortType = (newType: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set("sort", newType);
  window.history.pushState({}, "", url.toString());
};

export const filterInProgressData = (data: Form[]) => {
  const currentTime = Date.now();
  return data.filter((item) => {
    const endTime = parseDateString(item.id, item.endDate).getTime();
    return endTime > currentTime;
  });
};
