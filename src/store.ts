import { create } from 'zustand';
import type { User, Survey, Question, SurveyInfo, QuestionType } from '@/types';

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  loadUserFromSession: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loadUserFromSession: () => {
    const user = sessionStorage.getItem('user');
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

export interface SurveyStore {
  questions: Question[];
  surveyInfo: SurveyInfo;
  setQuestions: (items: Question[]) => void;
  updateQuestion: (id: number, updatedQuestion: Question) => void;
  updateQuestionType: (id: number, newType: QuestionType) => void;
  setSurveyInfo: (info: Partial<SurveyInfo>) => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
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
  setQuestions: (items) =>
    set((state) => ({
      questions: items,
      surveyInfo: { ...state.surveyInfo, questions: items },
    })),
  updateQuestion: (id, updatedQuestion) =>
    set((state) => ({
      questions: state.questions.map((q) => (q.id === id ? updatedQuestion : q)),
      surveyInfo: {
        ...state.surveyInfo,
        questions: state.questions.map((q) => (q.id === id ? updatedQuestion : q)),
      },
    })),
  updateQuestionType: (id, newType) =>
    set((state) => {
      const newQuestions = state.questions.map((q) => {
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
              selectedOption: 'name이름',
            };
          case 'file':
            return {
              ...baseFields,
              selectedOption: '이미지',
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

      return {
        questions: newQuestions,
        surveyInfo: { ...state.surveyInfo, questions: newQuestions },
      };
    }),
  setSurveyInfo: (info) =>
    set((state) => ({
      surveyInfo: { ...state.surveyInfo, ...info },
    })),
}));
