import type { Detail, Question, QuestionType, Recruit, Survey } from "@/types";
import { BroadcastChannel } from "broadcast-channel";
import { create } from "zustand";

// selected survey (open detail modal)
interface SelectedSurveyStore {
  selectedItem: Survey | Recruit | null;
  setSelectedItem: (item: Survey | Recruit | null) => void;
}

export const useSelectedSurveyStore = create<SelectedSurveyStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

// surveyitem
const broadcast = new BroadcastChannel("zustand_channel");

interface SurveyStore {
  surveyInfo: Detail;
  updateQuestion: (id: number, updatedQuestion: Question) => void;
  updateQuestionType: (id: number, newType: QuestionType) => void;
  setSurveyInfo: (info: Partial<Detail>) => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
  surveyInfo: {
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
  },
  setSurveyInfo: (info) => {
    set((state) => {
      const newState = { surveyInfo: { ...state.surveyInfo, ...info } };
      broadcast.postMessage(newState.surveyInfo);
      return newState;
    });
  },
  updateQuestion: (id, updatedQuestion) => {
    set((state) => {
      const newQuestions = state.surveyInfo.questions.map((q) =>
        q.id === id ? { ...q, ...updatedQuestion } : q,
      );
      const newState = {
        surveyInfo: { ...state.surveyInfo, questions: newQuestions },
      };
      broadcast.postMessage(newState.surveyInfo);
      return newState;
    });
  },
  updateQuestionType: (id, newType) => {
    set((state) => {
      const newQuestions = state.surveyInfo.questions.map((q) => {
        if (q.id !== id) return q;

        const baseFields = {
          id: q.id,
          type: newType,
          title: q.title,
          description: q.description,
          isEssential: q.isEssential,
          timestamp: q.timestamp,
        };

        switch (newType) {
          case "checkbox":
          case "radio":
          case "dropdown":
            return {
              ...baseFields,
              options: [
                { id: 1, value: "" },
                { id: 2, value: "" },
              ],
            };
          case "participant":
            return {
              ...baseFields,
              selectedOption: "name",
            };
          case "file":
            return {
              ...baseFields,
              selectedOption: "사진",
            };
          case "star":
            return {
              ...baseFields,
              ratingStep: 1 as 1 | 0.5,
            };
          default:
            return baseFields;
        }
      });

      const newState = {
        surveyInfo: { ...state.surveyInfo, questions: newQuestions },
      };
      broadcast.postMessage(newState.surveyInfo);
      return newState;
    });
  },
}));

// BroadcastChannel 메시지 수신 설정
broadcast.onmessage = (event) => {
  const newState = event as Detail;
  useSurveyStore.setState({
    surveyInfo: newState,
  });
};
