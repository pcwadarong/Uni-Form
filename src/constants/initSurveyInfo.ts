import type { Detail } from "@/types";

export const LIMITLESS_DATE = new Date("2224-01-01T00:00:00Z").getTime(); // 제한 없음
const NOW = Date.now(); // 바로 시작

export const initSurveyInfo: Detail = {
  questions: [
    {
      id: 1,
      type: "checkbox",
      timestamp: "",
      title: "",
      isEssential: true,
      options: [
        { id: 1, value: "" },
        { id: 2, value: "" },
      ],
    },
  ],
  id: "",
  uid: "",
  title: "",
  description: "",
  img: "",
  startDate: NOW,
  endDate: LIMITLESS_DATE,
  category: "",
  isPublic: false,
  isEditable: false,
  // mode: "editing",
  responsesCount: 0,
  commentsCount: 0,
};
