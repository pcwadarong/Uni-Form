/**
 * 폼 기본 정보 타입
 */
export interface Form {
  id: string;
  uid: string;
  title: string;
  description: string | null;
  img: string | null;
  createdAt: number;
  startDate: number;
  endDate: number;
  category: string;
  isEditable: boolean;
  isPublic: boolean;
  responsesCount: number;
  commentsCount: number;
  point?: number;
}

/**
 * 폼 상세 정보 타입 (질문 포함)
 */
export interface Detail extends Form {
  questions: Question[];
}

/**
 * 선택 옵션 타입
 */
export interface Option {
  id: number;
  value: string;
}

/**
 * 질문 타입
 */
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

/**
 * 질문 컴포넌트 Props 타입
 */
export interface QuestionProps {
  question: Question;
  mode: ModeType;
  onResponseChange?: (newResponse: string) => void;
  onEditToggle?: () => void;
  isEssential?: boolean;
  provided?: any;
}

/**
 * 질문 목록 타입
 */
export interface Questions {
  questions: Question[];
  surveyId: string;
}

/**
 * 모드 타입
 */
export type ModeType = "editing" | "previewing" | "testing" | "responding";

/**
 * 질문 타입 종류
 */
export type QuestionType =
  | "radio"
  | "checkbox"
  | "dropdown"
  | "short answer"
  | "long answer"
  | "participant"
  | "star"
  | "file";

/**
 * 정렬 타입
 */
export type SortType = "public" | "recent" | "highPoint" | "popular" | "endingSoon";
