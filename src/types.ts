export interface User {
  uid: string;
  nickname: string;
  email: string;
  role: string;
  createdSurveys: string[];
  responses: string[];
  comments: string[];
}

export interface Recruit {
  id: string;
  uid: string;
  title: string;
  description?: string;
  img?: string;
  startDate: string;
  endDate: string;
  category: string;
}

export interface Survey extends Recruit {
  point: number;
  responses?: string[];
  comments?: string[];
  lastCommentId?: string;
}

export interface InfoType extends Recruit {
  questions: Question[];
  mode: 'editing' | 'viewing';
  isPublic: boolean;
}

export interface Option {
  id: number;
  value: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  title: string;
  description?: string;
  isEssential: boolean;
  options?: Option[];
  selectedOption?: string;
  ratingStep?: 0.5 | 1;
}

export interface QuestionProps {
  question: Question;
  mode: ModeType;
}

export type ModeType = 'editing' | 'previewing' | 'testing' | 'responding';

export type QuestionType =
  | 'radio'
  | 'checkbox'
  | 'dropdown'
  | 'short answer'
  | 'long answer'
  | 'dropdown'
  | 'participant'
  | 'star'
  | 'file';
// 추가될 타입들: | 'category' | 'table' | 'schedule' | 'score'

export interface Comment {
  id: string;
  surveyId: string;
  uid: string;
  content: string;
}

interface Answer {
  questionId: string;
  response: string | number | string[] | number[]; // 단답형, 선택형 등 다양한 답변 형식 지원
}

export interface Response {
  id: string;
  surveyId: number;
  uid: string;
  content: Answer[];
}

export type SortType = 'public' | 'latest' | 'special' | 'popular' | 'latestComments' | 'closing';
