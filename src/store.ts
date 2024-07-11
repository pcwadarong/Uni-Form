import { create } from 'zustand';
import type { User, Survey, Question, SurveyInfoType, QuestionType } from '@/types';
import { BroadcastChannel } from 'broadcast-channel';

//auth
interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  loadUserFromSession: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loadUserFromSession: () => {
    const user = localStorage.getItem('user');
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },
}));

interface SelectedSurveyStore {
  selectedItem: Survey | null;
  setSelectedItem: (item: Survey | null) => void;
}

export const useSelectedSurveyStore = create<SelectedSurveyStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

//survey
const broadcast = new BroadcastChannel('zustand_channel');

export interface SurveyStore {
  surveyInfo: SurveyInfoType;
  updateQuestion: (id: number, updatedQuestion: Question) => void;
  updateQuestionType: (id: number, newType: QuestionType) => void;
  setSurveyInfo: (info: Partial<SurveyInfoType>) => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
  surveyInfo: {
    questions: [
      {
        id: 1,
        type: 'checkbox',
        title: '첫 번째 질문',
        description: '추가적인 설명',
        isEssential: true,
        options: [
          { id: 1, value: '항목 1' },
          { id: 2, value: '항목 2' },
        ],
      },
    ],
    imageUrl: '',
    title: '',
    description: '',
    duration: '바로시작~제한없음',
    mode: 'editing',
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
        };

        switch (newType) {
          case 'checkbox':
          case 'radio':
          case 'dropdown':
            return {
              ...baseFields,
              options: [
                { id: 1, value: '항목 1' },
                { id: 2, value: '항목 2' },
              ],
            };
          case 'participant':
            return {
              ...baseFields,
              selectedOption: 'name',
            };
          case 'file':
            return {
              ...baseFields,
              selectedOption: '사진',
            };
          case 'star':
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
  const newState = event as SurveyInfoType;
  useSurveyStore.setState({
    surveyInfo: newState,
  });
};
