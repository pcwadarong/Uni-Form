import { create } from 'zustand';
import type { User, Survey, Question, SurveyInfo } from '@/types';

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

interface SurveyStore {
  questions: Question[];
  surveyInfo: SurveyInfo;
  setQuestions: (items: Question[]) => void;
  updateQuestion: (id: number, updatedQuestion: Question) => void;
  setSurveyInfo: (info: Partial<SurveyInfo>) => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
  questions: [
    {
      id: 1,
      type: 'checkbox',
      title: '첫 번째 질문',
      description: '추가적인 설명',
      options: [
        { id: 1, value: '항목 1' },
        { id: 2, value: '항목 2' },
      ],
      isEssential: false,
    },
    {
      id: 2,
      type: 'radio',
      title: '',
      options: [
        { id: 1, value: '항목 1' },
        { id: 2, value: '항목 2' },
      ],
      isEssential: false,
    },
    {
      id: 3,
      type: 'participant',
      title: '회원 정보',
      isEssential: true,
    },
  ],
  surveyInfo: {
    questions: [],
    imageUrl: '',
    title: '',
    description: '',
    duration: '바로시작~제한없음',
    mode:'editing',
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
  setSurveyInfo: (info) =>
    set((state) => ({
      surveyInfo: { ...state.surveyInfo, ...info },
    })),
}));
