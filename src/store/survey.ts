import { create } from 'zustand';
import { BroadcastChannel } from 'broadcast-channel';
import type { Survey, SurveyInfoType, Question, QuestionType, SortType } from '@/types';
import { getSurveys } from '../firebase/getSurveyList';
import { useQuery, QueryClient } from '@tanstack/react-query';

// surveylist
export const fetchSurveys = async (type: SortType) => {
  const surveys = await getSurveys(type);
  return surveys;
};

export const useSurveys = (type: SortType) => {
  return useQuery(['surveys', type], () => fetchSurveys(type));
};

// interface PublicSurveysStore {
//   publicSurveys: Survey[] | null;
//   fetchSurveys: () => Promise<void>;
// }

// export const usePublicSurveyStore = create<PublicSurveysStore>((set) => ({
//   publicSurveys: null,
//   fetchSurveys: async () => {
//     try {
//       const surveys = await getPublicSurveys();
//       set({ publicSurveys: surveys });
//     } catch (error) {
//       console.error('Error getting public surveys:', error);
//     }
//   },
// }));

// selected survey (open modal)
interface SelectedSurveyStore {
  selectedItem: Survey | null;
  setSelectedItem: (item: Survey | null) => void;
}

export const useSelectedSurveyStore = create<SelectedSurveyStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

// surveyitem
const broadcast = new BroadcastChannel('zustand_channel');

interface SurveyStore {
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
    isPublic: false,
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
