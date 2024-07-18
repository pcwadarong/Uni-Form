export interface User {
  uid: string;
  nickname: string;
  email: string;
  role: string;
  createdSurveys: string[];
  responses: string[];
  comments: string[],
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

export interface Response {
  responseId: string;
  surveyId: number;
  uid: string;
  timestamp: string;
}

export type SortType = 'public' | 'latest' | 'special' | 'popular' | 'latestComments' | 'closing';
