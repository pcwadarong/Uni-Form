import type { Response } from "@/types";
import { create } from "zustand";

interface ResponseState {
  response: Response;
  setResponse: (questionId: string, newResponse: string | number | string[] | number[]) => void;
  initializeResponses: (formId: string, questions: { id: number; timestamp: string }[]) => void;
}

export const useResponseStore = create<ResponseState>((set) => ({
  response: {
    id: "",
    formId: "",
    uid: "",
    content: [],
  },
  setResponse: (timestamp, newResponse) =>
    set((state) => ({
      response: {
        ...state.response,
        content: state.response.content.map((answer) =>
          answer.timestamp === timestamp ? { ...answer, response: newResponse } : answer,
        ),
      },
    })),
  initializeResponses: (formId, questions) =>
    set({
      response: {
        id: "",
        formId: formId,
        uid: "",
        content: questions.map((question) => ({
          questionId: question.id,
          timestamp: question.timestamp,
          response: "",
        })),
      },
    }),
}));
