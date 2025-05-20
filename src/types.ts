export interface User {
  uid: string;
  nickname: string;
  email: string;
  role: string;
  createdSurveys: string[];
  responses: string[];
  comments: string[];
  drafts: string[];
}

export type UserField = "all" | "nickname" | "email" | "responses" | "comments" | "draft";

export interface Form {
  id: string;
  uid: string;
  title: string;
  description: string | null;
  img: string | null;
  startDate: number;
  endDate: number;
  category: string;
  isEditable: boolean;
  isPublic: boolean;
  responsesCount: number;
  commentsCount: number;
  point?: number;
}

// export interface Survey extends Form {
//   comments: string[];
// }

export interface Detail extends Form {
  questions: Question[];
  // mode: "editing" | "viewing";
}

export interface Option {
  id: number;
  value: string;
}

export interface Questions {
  questions: Question[];
  surveyId: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  timestamp: string;
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
  onResponseChange?: (newResponse: string) => void;
}

export type ModeType = "editing" | "previewing" | "testing" | "responding";

export type QuestionType =
  | "radio"
  | "checkbox"
  | "dropdown"
  | "short answer"
  | "long answer"
  | "dropdown"
  | "participant"
  | "star"
  | "file";
// 추가될 타입들: | 'category' | 'table' | 'schedule' | 'score'

export interface Comment {
  id: string;
  nickname?: string;
  surveyId: string;
  uid: string;
  content: string;
  createdAt: number;
}

interface Answer {
  questionId: number;
  timestamp: string;
  response: string | number | string[] | number[]; // 단답형, 선택형 등 다양한 답변 형식 지원
}

export interface Response {
  id: string;
  surveyId: string;
  uid: string;
  content: Answer[];
}

export type SortType = "public" | "latest" | "special" | "popular" | "closing";

export type ActionState = {
  status: boolean;
  error?: string;
};
