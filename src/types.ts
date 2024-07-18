export interface User {
  email: string;
  nickname: string;
  uid: string;
}

type Comment = {
  text: string;
  creator: string;
  createdDate: string;
};

type Response = {
  id: number;
};

export interface Recruit {
  id: string;
  title: string;
  info?: string;
  img?: string;
  startDate: string;
  endDate: string;
  category: string;
  response: Response[];
}

export interface Survey extends Recruit {
  point: number;
  comments: Comment[];
}

// 공통으로 사용되는 Option 타입
export interface Option {
  id: number;
  value: string;
}

// 기본 Question 인터페이스 정의
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

// QuestionProps 인터페이스
export interface QuestionProps {
  question: Question;
  mode: ModeType;
}

// Info 인터페이스
export interface InfoType {
  questions: Question[];
  imageUrl: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  mode: 'editing' | 'viewing';
  isPublic: boolean;
}

// 질문 모드 타입 정의
export type ModeType = 'editing' | 'previewing' | 'testing' | 'responding';

// 질문 타입 정의
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

export type SortType = 'public' | 'latest' | 'special' | 'popular' | 'latestComments' | 'closing';
