import type { InfoType } from "@/types";

export const initSurveyInfo: InfoType = {
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
  startDate: "바로시작",
  endDate: "제한없음",
  category: "",
  mode: "editing",
  isEditable: false,
};
